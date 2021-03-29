import { useState, useEffect, useContext, createContext } from 'react'
import { gql, useQuery, useApolloClient } from '@apollo/client'
import { isLoggedInVar } from '../../apollo-client'
import useLocalStorage from '../../hooks/use-local-storage'

const USER_QUERY = gql`
  query Me {
    me {
      id
      username
    }
  }
`

const authContext = createContext(null)

const useProvideAuth = () => {
  const { loading, error, data, refetch } = useQuery(USER_QUERY, {
    fetchPolicy: 'network-only',
  })

  const client = useApolloClient()

  const [, setTokenValue, clearTokenValue] = useLocalStorage('token')

  const [user, setUser] = useState(null)

  const signIn = async ({ token, callback } = {}) => {
    console.log('sign in')

    if (token) {
      setTokenValue(token)
      const { data } = await refetch()
      const { me } = data

      setUser(me)
      isLoggedInVar(true)
    }

    callback?.() // use optional chaining
  }

  const signUp = ({ username, email, password, callback } = {}) => {
    console.log('sign up')
    // FIXME
    const user = { username, email }
    setUser(user)
    callback?.()
    return user
  }

  const signOut = async (callback) => {
    console.log('sign out')
    setUser(false)
    isLoggedInVar(false)
    clearTokenValue()

    await client.clearStore()
    callback?.()
  }

  const sendPasswordResetEmail = () => true

  const confirmPasswordReset = () => true

  useEffect(() => {
    // use effect
    if (loading || error) {
      setUser(false)
    }

    if (data) {
      const { me } = data

      setUser(me)
      console.log('user', me?.username)
    }
    console.log('auth effect')
    return () => {
      // cleanup
      console.log('auth clean up')
    }
  }, [loading, error, data])

  return {
    user,
    signIn,
    signUp,
    signOut,
    sendPasswordResetEmail,
    confirmPasswordReset,
  }
}

const AuthProvider = ({ children }) => {
  const auth = useProvideAuth()

  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

const useAuth = () => useContext(authContext)

export { AuthProvider, useAuth }
