import ApolloClient from './ApolloClient'
import clientState from './clientState'

export const client = new ApolloClient({
  clientState,
  uri: '/graphql',
})

// Mutation: {
