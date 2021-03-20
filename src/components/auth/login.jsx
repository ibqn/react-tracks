import { useState } from 'react'
import { useAuth } from '../auth'
import { Link, useHistory, useLocation } from 'react-router-dom'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import FormControl from '@material-ui/core/FormControl'
import Paper from '@material-ui/core/Paper'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import Lock from '@material-ui/icons/Lock'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.secondary.main,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}))

const Login = () => {
  const theme = useTheme()
  const classes = useStyles(theme)

  const [input, setInput] = useState({})

  const { signIn } = useAuth()
  const { state } = useLocation()
  const history = useHistory()

  const { from } = { from: { pathname: '/' }, ...state }

  const handleSubmit = (event) => {
    event.preventDefault()

    signIn({
      callback: () => {
        console.log('redirecting', from)
        history.replace(from)
      },
    })
  }

  const handleChange = (name) => ({ target: { value } }) =>
    setInput({ ...input, [name]: value })

  const loading = false

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Link to="/">
          <Avatar className={classes.avatar}>
            <Lock />
          </Avatar>
        </Link>
        <Typography variant="h4">Login as Existing User</Typography>

        <form onSubmit={handleSubmit} className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input id="username" onChange={handleChange('username')} />
          </FormControl>

          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              type="password"
              autoComplete="on"
              onChange={handleChange('password')}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={
              loading || !input?.username?.trim() || !input?.password?.trim()
            }
            className={classes.submit}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
          <Button
            onClick={() => history.replace({ pathname: '/register' })}
            color="secondary"
            variant="outlined"
            fullWidth
          >
            New user? Register here
          </Button>

          {/* Error Handling */}
          {/* {error && <Error error={error} />} */}
        </form>
      </Paper>
    </div>
  )
}

export default Login
