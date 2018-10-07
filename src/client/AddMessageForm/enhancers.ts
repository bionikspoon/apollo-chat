import gql from 'graphql-tag'
import {
  ChildDataProps,
  ChildMutateProps,
  compose,
  graphql,
} from 'react-apollo'
import { RouteComponentProps, withRouter } from 'react-router'

interface IData {
  username: string
}
interface IResponse {
  id: string
  user: string
  body: string
  date: string
}

const GET_USERNAME = gql`
  query GetUsername {
    username @client
  }
`

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

export default compose(
  withRouter,
  graphql(GET_USERNAME),
  graphql(ADD_MESSAGE_MUTATION, { name: 'addMessage' })
)

export type AddMessageFormProps = ChildMutateProps<
  ChildDataProps<RouteComponentProps, IData>,
  IResponse
>
