import { useState } from 'react'

import { makeStyles /*useTheme*/ } from '@material-ui/core/styles'

import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import ClearIcon from '@material-ui/icons/Clear'

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

const CreateTrack = () => {
  // const theme = useTheme()
  const classes = useStyles(/*theme*/)

  const [open, setOpen] = useState(false)

  return (
    <>
      <Fab
        onClick={() => setOpen(true)}
        className={classes.fab}
        color="secondary"
      >
        {open ? <ClearIcon /> : <AddIcon />}
      </Fab>
    </>
  )
}

export default CreateTrack
