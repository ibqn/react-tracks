import { useMemo } from 'react'
import PropTypes from 'prop-types'

import { gql, useMutation } from '@apollo/client'

import { makeStyles } from '@material-ui/core/styles'

import IconButton from '@material-ui/core/IconButton'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined'

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
    marginBottom: theme.spacing(0.5),
  },
}))

const LIKE_TRACK_MUTATION = gql`
  mutation LikeTrack($trackId: ID!) {
    createLike(trackId: $trackId) {
      like {
        user {
          id
          username
        }
        track {
          id
        }
      }
    }
  }
`

const LikeTrack = ({ trackId, likes }) => {
  const classes = useStyles()

  const [likeTrack] = useMutation(LIKE_TRACK_MUTATION)

  const { user } = useAuth()

  const handleLike = async () => {
    try {
      await likeTrack({ variables: { trackId } })
    } catch (error) {
      console.error(error)
    }
  }

  const alreadyLiked = useMemo(
    () => likes.map(({ user: { id } }) => id).includes(user.id),
    [likes]
  )

  const Icon = alreadyLiked ? ThumbUpIcon : ThumbUpOutlinedIcon

  return (
    <IconButton
      onClick={handleLike}
      className={classes.iconButton}
      // disabled={alreadyLiked}
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
