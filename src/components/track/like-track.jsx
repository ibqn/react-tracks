import { useMemo } from 'react'
import PropTypes from 'prop-types'

import { gql, useMutation } from '@apollo/client'
import { UPDATE_TRACKS } from 'fragments'

import { makeStyles } from '@material-ui/core/styles'

import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'

import { useAuth } from '../auth'

const useStyles = makeStyles((theme) => ({
  iconButton: {
    color: 'deeppink',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginLeft: theme.spacing(0.5),
  },
}))

const LIKE_TRACK_MUTATION = gql`
  ${UPDATE_TRACKS}

  mutation LikeTrack($trackId: ID!) {
    createLike(trackId: $trackId) {
      like {
        track {
          ...NewTrack
        }
      }
    }
  }
`

const DISLIKE_TRACK_MUTATION = gql`
  mutation DislikeTrack($trackId: ID!) {
    deleteLike(trackId: $trackId) {
      likeId
    }
  }
`

const LikeTrack = ({ trackId, likes }) => {
  const classes = useStyles()

  const [likeTrack] = useMutation(LIKE_TRACK_MUTATION)
  const [dislikeTrack] = useMutation(DISLIKE_TRACK_MUTATION)

  const { user } = useAuth()

  const handleLike = async () => {
    try {
      await likeTrack({
        variables: { trackId },
        update: (cache, { data: { createLike } }) => {
          const {
            like: { track },
          } = createLike

          cache.writeFragment({
            id: cache.identify(track),
            data: track,
            fragment: UPDATE_TRACKS,
          })
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleDislike = async () => {
    try {
      await dislikeTrack({
        variables: { trackId },
        update: (cache, { data: { deleteLike } }) => {
          const { likeId } = deleteLike

          cache.modify({
            id: `TrackType:${trackId}`,
            fields: {
              likes: (existingLikeRefs = [], { readField }) => {
                return existingLikeRefs.filter(
                  (likeRef) => likeId !== readField('id', likeRef)
                )
              },
            },
          })

          cache.evict({ id: `LikeType:${likeId}` })

          console.log('likeid', likeId)
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  const alreadyLiked = useMemo(
    () => likes.map(({ user: { id } }) => id).includes(user.id),
    [likes, user]
  )

  const Icon = alreadyLiked ? FavoriteIcon : FavoriteBorderIcon

  return (
    <IconButton
      onClick={alreadyLiked ? handleDislike : handleLike}
      className={classes.iconButton}
    >
      {likes.length}
      <Icon className={classes.icon} />
    </IconButton>
  )
}

LikeTrack.propTypes = {
  trackId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  likes: PropTypes.array.isRequired,
}

export default LikeTrack
