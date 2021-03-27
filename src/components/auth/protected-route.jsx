import { Route, Redirect } from 'react-router-dom'

import { useQuery, gql } from '@apollo/client'

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`

const ProtectedRoute = ({ children, ...rest }) => {
  const { data } = useQuery(IS_LOGGED_IN)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        data.isLoggedIn ? (
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
