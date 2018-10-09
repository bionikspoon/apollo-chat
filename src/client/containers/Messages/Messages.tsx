import { css, StyleSheet } from 'aphrodite/no-important'
import { reverse } from 'ramda'
import * as React from 'react'
import { MessagesProps } from './enhancers'
import Loading from './Loading'
import Message from './Message'

export default class Messages extends React.Component<MessagesProps> {
  public componentDidMount() {
    if (!this.props.data) return
    this.props.subscribeToMessages()
  }

  public render() {
    const { props } = this

    if (props.data.loading) return <Loading css={styles.container} />
    if (!props.data.messages) return <Loading css={styles.container} />

    const messages = reverse(props.data.messages)

    return (
      <div className={css(styles.container)}>
        {messages.map(message => (
          <Message
            body={message.body}
            color={message.color}
            id={message.id}
            key={message.id}
            loading={false}
            user={message.user}
            isRead={message.isRead}
            onReadMessage={this.handleReadMessage}
          />
        ))}
      </div>
    )
  }

  private handleReadMessage = (id: string, isRead: boolean) => {
    const { props } = this
    props.readMessage({ variables: { id, isRead } })
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column-reverse',
    overflowY: 'scroll',
  },
})
