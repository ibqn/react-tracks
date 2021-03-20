import { useState } from 'react'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import ExitToApp from '@material-ui/icons/ExitToApp'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

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
  const handleSignIn = () => {
    if (user) {
      signOut()
    } else {
      history.replace({ pathname: '/login' })
    }
  }

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = ({ currentTarget }) => {
    setAnchorEl(currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  if (user) {
    return (
      <>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </>
    )
  } else {
    return (
      <Button onClick={handleSignIn}>
        <Typography
          variant="body2"
          className={classes.buttonText}
          color="secondary"
        >
          Sign in
        </Typography>
        <ExitToApp className={classes.buttonIcon} color="secondary" />
      </Button>
    )
  }
}

export default Logout
