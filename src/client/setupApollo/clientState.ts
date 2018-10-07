import { ApolloCache } from 'apollo-cache'
import { ClientStateConfig } from 'apollo-link-state'

interface IMutations {
  setUsername: (
    obj: any,
    next: { username: string },
    context: { cache: ApolloCache<any> }
  ) => void
}

export default {
  defaults: { username: '' },
  resolvers: {
    Mutation: {
      setUsername: (_, { username }, { cache }) => {
        return cache.writeData({ data: { username } })
      },
    } as IMutations,
  },
} as ClientStateConfig
