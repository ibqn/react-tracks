import { useState } from 'react'

import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({}))

const UpdateTrack = () => {
  const [open, setOpen] = useState(false)

  const classes = useStyles()

  return (
    <IconButton onClick={() => setOpen(true)}>
      <EditIcon />
    </IconButton>
  )
}

export default UpdateTrack
