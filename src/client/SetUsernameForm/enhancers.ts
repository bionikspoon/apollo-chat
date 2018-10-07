import gql from 'graphql-tag'
import { ChildMutateProps, ChildProps, compose, graphql } from 'react-apollo'
import { RouteComponentProps, withRouter } from 'react-router'

interface IData {
  username: string
}

const GET_USERNAME = gql`
  query GetUsername {
    username @client
  }
`

const SET_USERNAME = gql`
  mutation SetUsername($username: String!) {
    setUsername(username: $username) @client
  }
`

export type SetUsernameFormProps = ChildMutateProps<
  ChildProps<RouteComponentProps, IData>,
  {},
  { username: string }
>

export default compose(
  withRouter,
  graphql(GET_USERNAME),
  graphql(SET_USERNAME)
)
