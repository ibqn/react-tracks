import { Route, Redirect } from 'react-router-dom'

import { useAuth } from './use-auth'

const ProtectedRoute = ({ children, ...rest }) => {
  const { user } = useAuth()
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

export default ProtectedRoute
