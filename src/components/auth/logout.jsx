import { useTheme, makeStyles } from '@material-ui/core/styles'
import ExitToApp from '@material-ui/icons/ExitToApp'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import { useAuth } from '../auth'
import { useHistory } from 'react-router'

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: 'pointer',
    display: 'flex',
  },
  buttonIcon: {
    marginLeft: '5px',
  },
}))

const Logout = () => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const history = useHistory()

  const { user, signOut } = useAuth()
  const handleClick = () => {
    if (user) {
      signOut()
    } else {
      history.replace({ pathname: '/login' })
    }
  }

  return (
    <Button onClick={handleClick}>
      <Typography
        variant="body2"
        className={classes.buttonText}
        color="secondary"
      >
        {user ? `Sign out` : `Sign in`}
      </Typography>
      <ExitToApp className={classes.buttonIcon} color="secondary" />
    </Button>
  )
}

export default Logout
