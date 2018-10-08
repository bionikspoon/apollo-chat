import { Intent } from '@blueprintjs/core'
import gql from 'graphql-tag'
import { ChildDataProps, compose, graphql, MutationFunc } from 'react-apollo'
import { RouteComponentProps, withRouter } from 'react-router'
import { IUser } from '../../setupApollo/clientState'

type IData = IUser
interface IAddMessageResponse {
  id: string
  user: string
  body: string
  date: string
}

interface IAddMessageVariables {
  body: string
  username: string
  color: Intent
}

const GET_USERNAME = gql`
  query GetUsername {
    user @client {
      username
      color
    }
  }
`

const ADD_MESSAGE_MUTATION = gql`
  mutation AddMessageForm($username: String!, $body: String!, $color: String!) {
    addMessage(user: $username, body: $body, color: $color) {
      id
      user
      body
      date
      color
    }
  }
`

export default compose(
  withRouter,
  graphql(GET_USERNAME),
  graphql(ADD_MESSAGE_MUTATION, { name: 'addMessage' })
)

export type AddMessageFormProps = ChildDataProps<RouteComponentProps, IData> & {
  addMessage: MutationFunc<IAddMessageResponse, IAddMessageVariables>
}
