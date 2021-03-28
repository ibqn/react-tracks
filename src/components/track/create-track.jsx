import { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { gql, useMutation } from '@apollo/client'

import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import ClearIcon from '@material-ui/icons/Clear'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  dialog: {
    margin: '0 auto',
    maxWidth: 550,
  },
  textField: {
    margin: theme.spacing(),
  },
  cancel: {
    color: 'red',
  },
  save: {
    color: 'green',
  },
  button: {
    margin: theme.spacing(),
  },
  icon: {
    marginLeft: theme.spacing(),
  },
  input: {
    display: 'none',
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: '200',
  },
}))

const QUERY_FIELDS = /*gql` */ `
    id
  title
  description
  url
  likes {
    id
  }
  postedBy {
    id
    username
  }
`

const CREATE_TRACK_MUTATION = gql`
  mutation($title: String!, $url: String!, $description: String) {
    createTrack(title: $title, description: $description, url: $url) {
      track {
        ${QUERY_FIELDS}
      }
    }
  }
`

const UPDATE_TRACKS = gql`
  fragment NewTrack on TrackType {
    ${QUERY_FIELDS}
  }
`

const CreateTrack = () => {
  const classes = useStyles()

  const [open, setOpen] = useState(false)

  const [createTrack, { loading, error }] = useMutation(CREATE_TRACK_MUTATION)

  const [input, setInput] = useState({})

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('add track', input)

    try {
      const { data } = await createTrack({
        variables: { description: '', ...input },
        update: (cache, { data: { createTrack } }) => {
          console.log('update called')
          cache.modify({
            fields: {
              tracks(existingTracks = []) {
                console.log('existing tracks ', existingTracks)
                const { track } = createTrack
                console.log('create track', createTrack)
                console.log('create track', track)
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
      console.log('data', data)
      setOpen(false)
      setInput({})
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleChange = (name) => ({ target: { value } }) =>
    setInput({ ...input, [name]: value })

  return (
    <>
      <Fab
        onClick={() => setOpen(true)}
        className={classes.fab}
        color="secondary"
      >
        {open ? <ClearIcon /> : <AddIcon />}
      </Fab>

      <Dialog open={open} className={classes.dialog}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Create Track</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add a Title, Description & URL
            </DialogContentText>
            <FormControl fullWidth>
              <TextField
                label="Title"
                placeholder="Add Title"
                onChange={handleChange('title')}
                className={classes.textField}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                multiline
                rows="4"
                label="Description"
                placeholder="Add Description"
                onChange={handleChange('description')}
                className={classes.textField}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label="URL"
                placeholder="Add URL"
                onChange={handleChange('url')}
                className={classes.textField}
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              disabled={loading}
              onClick={() => setOpen(false)}
              className={classes.cancel}
            >
              Cancel
            </Button>
            <Button
              disabled={loading || !input?.title?.trim() || !input?.url?.trim()}
              type="submit"
              className={classes.save}
            >
              {loading ? (
                <CircularProgress className={classes.save} size={24} />
              ) : (
                'Add Track'
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default CreateTrack
