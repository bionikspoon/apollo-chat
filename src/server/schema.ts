import { gql } from 'apollo-server-koa'
import { identity } from 'ramda'

import { Message } from './models'
import pubsub, * as ACTION from './pubsub'

export const typeDefs = gql`
  type Query {
    messages: [Message]!
  }
  type Mutation {
    addMessage(user: String!, body: String!): Message!
  }
  type Subscription {
    messageAdded: Message
  }
  type Message {
    id: ID!
    user: String!
    body: String!
    date: String!
  }
`

export const resolvers = {
  Mutation: {
    addMessage: async (root: any, args: object) => await Message.create(args),
  },
  Query: {
    messages: (root: any, args: object) => Message.find().exec(),
  },
  Subscription: {
    messageAdded: {
      resolve: identity,
      subscribe: () => pubsub.asyncIterator([ACTION.MESSAGE_ADDED]),
    },
  },
}
