import { Link, useLocation } from 'react-router-dom'
import { useAuth, Logout } from '../auth'

import { useTheme, makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import RadioIcon from '@material-ui/icons/RadioTwoTone'
import Person from '@material-ui/icons/Person'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 0,
    padding: 0,
  },
  grow: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },

  logo: {
    marginRight: theme.spacing(),
    fontSize: 45,
  },
  faceIcon: {
    marginRight: theme.spacing(),
    fontSize: 30,
    color: 'white',
  },
  username: {
    color: 'white',
    fontSize: 20,
    // marginRight: theme.spacing(2),
  },
}))

const Header = () => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const location = useLocation()

  const { user, signOut } = useAuth()

  if (location.pathname.match('/login')) {
    return null
  }

  return (
    <>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Link to="/" className={classes.grow}>
            <RadioIcon className={classes.logo} color="secondary" />
            <Typography variant="h5" color="secondary" noWrap>
              ReactTracks
            </Typography>
          </Link>

          {user && (
            <Link to={`/profile/${user.username}`} className={classes.link}>
              <Person className={classes.faceIcon} />
              <Typography variant="h5" className={classes.username} noWrap>
                Hi, {user.username}
              </Typography>
            </Link>
          )}

          <Logout />
        </Toolbar>
      </AppBar>
      <div>header</div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Header
