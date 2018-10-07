import { Tag } from '@blueprintjs/core'
import { css, StyleSheet } from 'aphrodite'
import { append, evolve, pipe, prop, reverse, uniqBy } from 'ramda'
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

    const messages = reverse(props.data.messages)

    return (
      <div className={css(styles.container)}>
        {messages.map(message => (
          <p key={message.id} className={css(styles.message)}>
            <Tag minimal={true} intent="primary">
              {message.user}
            </Tag>
            <span className={css(styles.messageBody)}>{message.body}</span>
          </p>
        ))}
      </div>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column-reverse',
    overflowY: 'scroll',
  },
  message: { marginBottom: '.2rem' },
  messageBody: { marginLeft: '.5rem' },
})
