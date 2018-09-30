import gql from 'graphql-tag'
import { ChildMutateProps, graphql } from 'react-apollo'

const ADD_MESSAGE_MUTATION = gql`
  mutation AddMessageForm($user: String!, $body: String!) {
    addMessage(user: $user, body: $body) {
      id
      user
      body
      date
    }
  }
`

interface IResponse {
  id: string
  user: string
  body: string
  date: string
}

export default graphql<{}, IResponse, {}>(ADD_MESSAGE_MUTATION)

export type AddMessageFormProps = ChildMutateProps<{}, IResponse>
