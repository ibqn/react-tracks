import { useState, useEffect, useContext, createContext } from 'react'

const authContext = createContext(null)

const useProvideAuth = () => {
  const [user, setUser] = useState(null)

  const signIn = ({ email, password, callback } = {}) => {
    console.log('sign in')
    // FIXME
    const user = { username: 'ibqn', email }
    setUser(user)
    callback?.() // use optional chaining
    return user
  }

  const signUp = ({ username, email, password, callback } = {}) => {
    console.log('sign up')
    // FIXME
    const user = { username, email }
    setUser(user)
    callback?.()
    return user
  }

  const signOut = (callback) => {
    console.log('sign out')
    setUser(false)
    callback?.()
  }

  const sendPasswordResetEmail = () => true

  const confirmPasswordReset = () => true

  useEffect(() => {
    // use effect
    console.log('auth effect')
    return () => {
      // cleanup
      console.log('auth clean up')
    }
  }, [])

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
