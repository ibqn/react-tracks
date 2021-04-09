import { useState } from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
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
}))

const TrackDialog = (props) => {
  const { submitAction, loading, open, setOpen, content, track = {} } = props

  const [input, setInput] = useState(track)

  const classes = useStyles()

  const { title, contentText, actionText } = content

  const handleChange = (name) => ({ target: { value } }) =>
    setInput({ ...input, [name]: value })

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await submitAction(input)
      setOpen(false)
      setInput({})
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <Dialog open={open} className={classes.dialog}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{contentText}</DialogContentText>
          <FormControl fullWidth>
            <TextField
              label="Title"
              placeholder="Add Title"
              onChange={handleChange('title')}
              className={classes.textField}
              value={input?.title || ''}
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
              value={input?.description || ''}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              label="URL"
              placeholder="Add URL"
              onChange={handleChange('url')}
              className={classes.textField}
              value={input?.url || ''}
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
              actionText
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

TrackDialog.propTypes = {
  loading: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  submitAction: PropTypes.func.isRequired,
  content: PropTypes.exact({
    title: PropTypes.string.isRequired,
    contentText: PropTypes.string.isRequired,
    actionText: PropTypes.string.isRequired,
  }).isRequired,
  track: PropTypes.object,
}

export default TrackDialog
