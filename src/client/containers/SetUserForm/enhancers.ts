import { Intent } from '@blueprintjs/core'
import gql from 'graphql-tag'
import { ChildDataProps, compose, graphql, MutationFunc } from 'react-apollo'
import { RouteComponentProps, withRouter } from 'react-router'
import { IUser } from '../../setupApollo/clientState'

type IData = IUser

const GET_USER = gql`
  query GetUser {
    user @client {
      username
      color
    }
  }
`

const SET_USER = gql`
  mutation SetUser($username: String!, $color: String!) {
    setUser(user: { username: $username, color: $color }) @client
  }
`

export default compose(
  withRouter,
  graphql(GET_USER),
  graphql(SET_USER, { name: 'setUser' })
)

export type SetUserFormProps = ChildDataProps<RouteComponentProps, IData> & {
  setUser: MutationFunc<{}, { username: string; color: Intent }>
}
