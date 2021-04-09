import { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { gql, useMutation } from '@apollo/client'
import { UPDATE_TRACKS } from '../../fragments/'

import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import ClearIcon from '@material-ui/icons/Clear'

import { TrackDialog } from '../track'

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: '200',
  },
}))

const DIALOG_CONTENT = {
  title: 'Create Track',
  contentText: 'Add a Title, Description & URL',
  actionText: 'Add Track',
}

const CREATE_TRACK_MUTATION = gql`
  ${UPDATE_TRACKS}

  mutation CreateTrack($title: String!, $url: String!, $description: String) {
    createTrack(title: $title, description: $description, url: $url) {
      track {
        ...NewTrack
      }
    }
  }
`
const CreateTrack = () => {
  const classes = useStyles()

  const [open, setOpen] = useState(false)

  const [createTrack, { loading }] = useMutation(CREATE_TRACK_MUTATION)

  const submitAction = async (input) =>
    createTrack({
      variables: { description: '', ...input },
      update: (cache, { data: { createTrack } }) => {
        cache.modify({
          fields: {
            tracks: (existingTracks = []) => {
              const { track } = createTrack
              const newTrackRef = cache.writeFragment({
                data: track,
                fragment: UPDATE_TRACKS,
              })
              return [...existingTracks, newTrackRef]
            },
          },
        })
      },
    })

  return (
    <>
      <Fab
        onClick={() => setOpen(true)}
        className={classes.fab}
        color="secondary"
      >
        {open ? <ClearIcon /> : <AddIcon />}
      </Fab>

      <TrackDialog
        open={open}
        setOpen={setOpen}
        loading={loading}
        submitAction={submitAction}
        content={DIALOG_CONTENT}
      />
    </>
  )
}

export default CreateTrack
