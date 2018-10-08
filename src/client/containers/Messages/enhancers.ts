import { Intent } from '@blueprintjs/core'
import gql from 'graphql-tag'
import { ChildProps, graphql } from 'react-apollo'

const MESSAGES_QUERY = gql`
  query Messages {
    messages {
      id
      body
      color
      date
      user
    }
  }
`
export const MESSAGE_ADDED_SUBSCRIPTION = gql`
  subscription Messages {
    messageAdded {
      id
      body
      color
      date
      user
    }
  }
`

interface IData {
  messages: [
    { id: string; body: string; user: string; date: string; color: Intent }
  ]
}
export type MessagesProps = ChildProps<{}, IData>

export default graphql<{}, IData, {}>(MESSAGES_QUERY)
