import { Intent } from '@blueprintjs/core'
import { ApolloCache } from 'apollo-cache'
import { ClientStateConfig } from 'apollo-link-state'

type Mutation<T extends {}, U> = (
  obj: any,
  next: T,
  context: { cache: ApolloCache<any> }
) => U

export interface IUser {
  user: {
    username: string
    color: Intent
    __typename?: 'ClientUser'
  }
}

type Query = IUser

interface IMutations {
  setUser: Mutation<IUser, void>
  readMessage: Mutation<{ id: string; isRead: boolean }, void>
}

export default {
  defaults: {
    user: { username: 'User', color: Intent.PRIMARY, __typename: 'ClientUser' },
  } as Query,
  resolvers: {
    Message: {
      isRead: () => false,
    },
    Mutation: {
      readMessage: (obj, { id, isRead }, { cache }) => {
        cache.writeData({ id: `Message:${id}`, data: { isRead } })
      },
      setUser: (_, { user }, { cache }) => {
        cache.writeData({
          data: { user: { ...user, __typename: 'ClientUser' } },
        })
        return null
      },
    } as IMutations,
  },
} as ClientStateConfig
