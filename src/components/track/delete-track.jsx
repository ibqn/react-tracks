import { gql, useMutation } from '@apollo/client'
import PropTypes from 'prop-types'

import IconButton from '@material-ui/core/IconButton'
import TrashIcon from '@material-ui/icons/DeleteForeverOutlined'

import { useAuth } from '../auth'

const DELETE_TRACK_MUTATION = gql`
  mutation DeleteTrack($trackId: ID!) {
    deleteTrack(trackId: $trackId) {
      trackId
    }
  }
`

const DeleteTrack = ({ track }) => {
  const [deleteTrack] = useMutation(DELETE_TRACK_MUTATION)

  const { user } = useAuth()

  const handleDelete = async () => {
    console.log('delete track', track.id)

    if (user.id === track.postedBy.id) {
      console.log('match', user.id)

      try {
        await deleteTrack({
          variables: { trackId: track.id },
          update: (cache, { data: { deleteTrack } }) => {
            cache.modify({
              fields: {
                tracks: (existingTracks = [], { readField }) => {
                  const { trackId } = deleteTrack

                  return existingTracks.filter(
                    (trackRef) => trackId !== readField('id', trackRef)
                  )
                },
              },
            })
          },
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <IconButton onClick={handleDelete} disabled={user.id !== track.postedBy.id}>
      <TrashIcon />
    </IconButton>
  )
}

DeleteTrack.propTypes = {
  track: PropTypes.string.isRequired,
}

export default DeleteTrack
