import { Link, useLocation } from 'react-router-dom'
import { useAuth, Logout } from '../auth'

import { useTheme, makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
// import Person from '@material-ui/icons/Person'
import Typography from '@material-ui/core/Typography'

import { ReactComponent as Logo } from './logo.svg'

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
  logo: {
    marginRight: theme.spacing(2),
    width: 30,
    height: 30,
    fill: '#fff',
  },
  logoLink: {
    color: 'white',
    fontSize: 18,
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  faceIcon: {
    marginRight: theme.spacing(),
    color: 'white',
  },
  username: {
    color: 'white',
    fontSize: 18,
    marginRight: theme.spacing(2),
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
          <Grid className={classes.grow}>
            <Link to="/" className={classes.grow}>
              <Logo className={classes.logo} alt="" />
              <Typography variant="caption" className={classes.logoLink} noWrap>
                Tracks
              </Typography>
            </Link>
          </Grid>

          {user && (
            <Link to={`/profile/${user.username}`} className={classes.link}>
              {/* <Person className={classes.faceIcon} /> */}
              <Typography variant="caption" className={classes.username} noWrap>
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
