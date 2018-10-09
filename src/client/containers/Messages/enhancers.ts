import { Intent } from '@blueprintjs/core'
import { UpdateQueryFn } from 'apollo-client/core/watchQueryOptions'
import gql from 'graphql-tag'
import { append, evolve, pipe, prop, uniqBy } from 'ramda'
import { ChildDataProps, compose, graphql, MutationFunc } from 'react-apollo'

const MESSAGES_QUERY = gql`
  query Messages {
    messages {
      id
      body
      color
      date
      user
      isRead @client
    }
  }
`
const MESSAGE_ADDED_SUBSCRIPTION = gql`
  subscription Messages {
    messageAdded {
      id
      body
      color
      date
      user
      isRead @client
    }
  }
`

const READ_MESSAGE = gql`
  mutation ReadMessage($id: ID!, $isRead: Boolean!) {
    readMessage(id: $id, isRead: $isRead) @client
  }
`

export default compose(
  graphql<{}, IData, {}, IQueryChildProps>(MESSAGES_QUERY, {
    props: props => ({
      ...props,

      subscribeToMessages: () => {
        if (!props.data) return

        props.data.subscribeToMore({
          document: MESSAGE_ADDED_SUBSCRIPTION,
          updateQuery,
        })
      },
    }),
  }),
  graphql(READ_MESSAGE, { name: 'readMessage' })
)

export type MessagesProps = ChildDataProps<IQueryChildProps, IData> & {
  readMessage: MutationFunc<{}, { id: string; isRead: boolean }>
}

interface IData {
  messages: [
    {
      id: string
      body: string
      user: string
      date: string
      color: Intent
      isRead: boolean
    }
  ]
}
interface IQueryChildProps {
  subscribeToMessages: () => void
}

const addItem = (item: any) =>
  pipe(
    append(item),
    uniqBy(prop('id'))
  )

const updateQuery: UpdateQueryFn<any> = (
  previousResult,
  { subscriptionData }
) =>
  evolve({
    messages: addItem(subscriptionData.data.messageAdded),
  })(previousResult)
