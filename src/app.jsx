import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  gql,
} from '@apollo/client'

import { Home, Profile } from './pages'
import { Login, Register, ProtectedRoute } from './components/auth'
import { Header } from './components/shared'

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
})

// Test query
const TEST_QUERY = gql`
  query {
    tracks {
      id
      title
      description
      url
      postedBy {
        username
      }
    }
  }
`

const testApollo = async () => {
  try {
    const result = await client.query({
      query: TEST_QUERY,
    })

    const { data } = result

    console.log(data)
  } catch (error) {
    console.log(`error occurred ${error}`)
  }
}

testApollo()

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Header />
          <Switch>
            <ProtectedRoute path="/profile">
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
    </ApolloProvider>
  )
}

export default App
