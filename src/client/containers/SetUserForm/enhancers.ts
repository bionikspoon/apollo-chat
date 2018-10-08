import { Intent } from '@blueprintjs/core'
import gql from 'graphql-tag'
import {
  ChildDataProps,
  ChildMutateProps,
  compose,
  graphql,
} from 'react-apollo'
import { RouteComponentProps, withRouter } from 'react-router'
import { IUser } from '../../setupApollo/clientState'

type IData = IUser

const GET_USERNAME = gql`
  query GetUsername {
    user @client {
      username
      color
    }
  }
`

const SET_USERNAME = gql`
  mutation SetUsername($username: String!, $color: String!) {
    setUser(user: { username: $username, color: $color }) @client
  }
`

export type SetUserFormProps = ChildMutateProps<
  ChildDataProps<RouteComponentProps, IData>,
  {},
  { username: string; color: Intent }
>

export default compose(
  withRouter,
  graphql(GET_USERNAME),
  graphql(SET_USERNAME)
)
