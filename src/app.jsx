import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Home, Profile } from './pages'
import { Login, Register, ProtectedRoute } from './components/auth'
import { Header } from './components/shared'

function App() {
  return (
    <Router>
      <div>
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
      </div>
    </Router>
  )
}

export default App
