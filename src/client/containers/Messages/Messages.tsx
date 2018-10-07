import { Classes, Tag } from '@blueprintjs/core'
import { css, StyleSheet } from 'aphrodite/no-important'
import cx from 'classnames'
import { append, evolve, pipe, prop, reverse, uniqBy } from 'ramda'
import * as React from 'react'
import { MESSAGE_ADDED_SUBSCRIPTION, MessagesProps } from './enhancers'
import MOCK_MESSAGES from './mockMessages'

const addItem = (item: any) =>
  pipe(
    append(item),
    uniqBy(prop('id'))
  )

export default class Messages extends React.Component<MessagesProps> {
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
    if (props.data.loading) return <MessagesLoading />
    if (props.data.error) return <p>Error :(</p>
    if (!props.data.messages) return null

    const messages = reverse(props.data.messages)

    return (
      <div className={css(styles.container)}>
        {messages.map(message => (
          <Message
            key={message.id}
            id={message.id}
            user={message.user}
            body={message.body}
            loading={false}
          />
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
  message: { marginBottom: 20 },
  messageBody: { marginLeft: 6 },
  messageTag: { marginBottom: 4 },
})

function MessagesLoading() {
  return (
    <div className={css(styles.container)}>
      {MOCK_MESSAGES.map(message => (
        <Message
          key={message.id}
          id={message.id.toString()}
          user={message.user}
          body={message.body}
          loading={true}
        />
      ))}
    </div>
  )
}

function Message(props: {
  id: string
  user: string
  body: string
  loading: boolean
}) {
  return (
    <p key={props.id} className={css(styles.message)}>
      <Tag
        minimal={true}
        intent="primary"
        className={cx(
          css(styles.messageTag),
          props.loading && Classes.SKELETON
        )}
      >
        {props.user}
      </Tag>
      <span
        className={cx(
          css(styles.messageBody),
          props.loading && Classes.SKELETON
        )}
      >
        {props.body}
      </span>
    </p>
  )
}
