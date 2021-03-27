import { gql, useMutation } from '@apollo/client'

import IconButton from '@material-ui/core/IconButton'
import TrashIcon from '@material-ui/icons/DeleteForeverOutlined'

import { useAuth } from '../auth'

const DELETE_TRACK_MUTATION = gql`
  mutation($trackId: Int!) {
    deleteTrack(trackId: $trackId) {
      trackId
    }
  }
`

const DeleteTrack = ({ track }) => {
  const [deleteTrack, { loading, error }] = useMutation(DELETE_TRACK_MUTATION)

  const { user } = useAuth()

  const handleDelete = () => {
    console.log('delete track', track.id)

    if (user.id === track.postedBy.id) {
      console.log('match', user.id)
    }
  }

  return (
    <IconButton onClick={handleDelete}>
      <TrashIcon />
    </IconButton>
  )
}

export default DeleteTrack
