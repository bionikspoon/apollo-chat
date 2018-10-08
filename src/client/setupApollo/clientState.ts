import { Intent } from '@blueprintjs/core'
import { ApolloCache } from 'apollo-cache'
import { ClientStateConfig } from 'apollo-link-state'

type Mutation<T extends {}> = (
  obj: any,
  next: T,
  context: { cache: ApolloCache<any> }
) => void

export interface IUser {
  user: {
    username: string
    color: Intent
    __typename?: 'ClientUser'
  }
}

type Query = IUser

interface IMutations {
  setUser: Mutation<IUser>
}

export default {
  defaults: {
    user: { username: 'User', color: Intent.PRIMARY, __typename: 'ClientUser' },
  } as Query,
  resolvers: {
    Mutation: {
      setUser: (_, { user }, { cache }) => {
        return cache.writeData({
          data: { user: { ...user, __typename: 'ClientUser' } },
        })
      },
    } as IMutations,
  },
} as ClientStateConfig
