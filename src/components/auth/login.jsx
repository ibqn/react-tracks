import { useAuth } from '../auth'
import { useHistory, useLocation } from 'react-router-dom'

const Login = () => {
  const { signIn } = useAuth()
  const { state } = useLocation()
  const history = useHistory()

  const { from } = state || { from: { pathname: '/' } }
  const login = () => {
    signIn({
      callback: () => {
        console.log('redirecting', from)
        history.replace(from)
      },
    })
  }

  return (
    <>
      login
      <button onClick={login}>login</button>
    </>
  )
}

export default Login
