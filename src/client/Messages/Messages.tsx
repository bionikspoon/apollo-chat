import { append, evolve, pipe, prop, uniqBy } from 'ramda'
import * as React from 'react'
import { MESSAGE_ADDED_SUBSCRIPTION, MessageProps } from './enhancers'

const addItem = (item: any) =>
  pipe(
    append(item),
    uniqBy(prop('id'))
  )

export default class Messages extends React.Component<MessageProps> {
  public componentDidMount() {
    const { props } = this
    if (!props.data) return

    props.data.subscribeToMore({
      document: MESSAGE_ADDED_SUBSCRIPTION,
      updateQuery: (previousResult, { subscriptionData }) =>
        evolve({
          messages: addItem(subscriptionData.data.messageAdded),
        })(previousResult),
    })
  }

  public render() {
    const { props } = this
    if (!props.data) return null
    if (props.data.loading) return <p>Loading...</p>
    if (props.data.error) return <p>Error :(</p>
    if (!props.data.messages) return null

    return (
      <React.Fragment>
        {props.data.messages.map(message => {
          return (
            <div key={message.id}>
              <span>{message.user}</span>
              <span>{message.body}</span>
            </div>
          )
        })}
      </React.Fragment>
    )
  }
}
