import {
  ApolloClient,
  makeVar,
  InMemoryCache,
  gql,
  createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const getToken = () => {
  try {
    const tokenJson = window.localStorage.getItem('token')
    return JSON.parse(tokenJson)
  } catch (error) {
    console.error(error)
  }
  return null
}

const isLoggedInVar = makeVar(!!getToken())

const httpLink = createHttpLink({
  uri: '/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = getToken()

  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : '',
    },
  }
})

const link = authLink.concat(httpLink)

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar()
          },
        },
      },
    },
  },
})

const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`

const client = new ApolloClient({
  link,
  cache,
  typeDefs,
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

export { client, isLoggedInVar }
