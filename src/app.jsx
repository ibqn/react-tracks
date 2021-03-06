import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Home, Profile } from './pages'
import { Login, Register, ProtectedRoute } from './components/auth'
import { Header } from './components/shared'

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <ProtectedRoute path="/profile/:username">
          <Profile />
        </ProtectedRoute>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
