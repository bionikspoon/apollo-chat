import gql from 'graphql-tag'
import { append, evolve, pipe, prop, uniqBy } from 'ramda'
import * as React from 'react'
import { graphql } from 'react-apollo'

const addItem = (item: any) =>
  pipe(
    append(item),
    uniqBy(prop('id'))
  )

const query = gql`
  query Messages {
    messages {
      id
      body
      user
      date
    }
  }
`
const subscription = gql`
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

const enhancer = graphql<{}, IData, {}>(query)

export default enhancer(function Messages({ data }) {
  if (!data) return null
  if (data.loading) return <p>Loading...</p>
  if (data.error) return <p>Error :(</p>
  if (!data.messages) return null

  data.subscribeToMore({
    document: subscription,
    updateQuery: (previousResult, { subscriptionData }) => {
      return evolve({
        messages: addItem(subscriptionData.data.messageAdded),
      })(previousResult)
    },
  })

  return (
    <React.Fragment>
      {data.messages.map(message => {
        return (
          <div key={message.id}>
            <span>{message.user}</span>
            <span>{message.body}</span>
          </div>
        )
      })}
    </React.Fragment>
  )
})
