import gql from 'graphql-tag'
import { ChildProps, graphql } from 'react-apollo'

const MESSAGES_QUERY = gql`
  query Messages {
    messages {
      id
      body
      user
      date
    }
  }
`
export const MESSAGE_ADDED_SUBSCRIPTION = gql`
  subscription Messages {
    messageAdded {
      id
      body
      user
      date
    }
  }
`

interface IData {
  messages: [{ id: string; body: string; user: string; date: string }]
}
export type MessagesProps = ChildProps<{}, IData>

export default graphql<{}, IData, {}>(MESSAGES_QUERY)
