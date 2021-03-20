import { useState } from 'react'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  snackbar: {
    margin: theme.spacing(),
  },
}))

const Error = ({ error }) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const [open, setOpen] = useState(true)

  return (
    <Snackbar
      open={open}
      className={classes.snackbar}
      message={error.message}
      action={
        <Button onClick={() => setOpen(false)} color="secondary" size="small">
          Close
        </Button>
      }
    />
  )
}

Error.protoTypes = {
  error: PropTypes.object.isRequired,
}

export default Error
