import gql from 'graphql-tag'
import * as React from 'react'
import { ChildMutateProps, graphql } from 'react-apollo'

const query = gql`
  mutation ChatBox($user: String!, $body: String!) {
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

const enhancer = graphql<{}, IResponse, {}>(query)

export default enhancer(
  class ChatBox extends React.Component<ChildMutateProps<{}, IResponse>, {}> {
    public state = { body: '' }

    public render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.body}
            onChange={this.handleInputChange}
          />
          <input type="submit" value="chat!" />
        </form>
      )
    }

    private handleSubmit = (event: React.FormEvent) => {
      event.preventDefault()

      this.props.mutate({
        variables: {
          body: this.state.body,
          user: 'Manu',
        },
      })

      this.setState({ body: '' })
    }

    private handleInputChange = (event: { target: HTMLInputElement }) => {
      this.setState({ body: event.target.value })
    }
  }
)
