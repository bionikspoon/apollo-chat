import { Classes, Colors, Intent, Tag } from '@blueprintjs/core'
import { css, StyleSheet } from 'aphrodite'
import cx from 'classnames'
import * as React from 'react'

export default function Message(props: {
  id: string
  user: string
  body: string
  color: Intent
  loading: boolean
  isRead: boolean
  onReadMessage?: (id: string, isRead: boolean) => void
}) {
  const handleClick = () => {
    if (!props.onReadMessage) return

    props.onReadMessage(props.id, !props.isRead)
  }
  return (
    <p key={props.id} className={css(styles.container)}>
      <Tag
        minimal={true}
        intent={props.color}
        className={cx(
          css(styles.messageTag),
          props.loading && Classes.SKELETON
        )}
      >
        {props.user}
      </Tag>
      <span
        onClick={handleClick}
        className={cx(
          css(
            styles.messageBody,
            !props.isRead && styles.notRead,
            props.onReadMessage && styles.canRead
          ),
          props.loading && Classes.SKELETON,
          props.isRead && Classes.TEXT_MUTED
        )}
      >
        {props.body}
      </span>
    </p>
  )
}

const styles = StyleSheet.create({
  canRead: { ':hover': { cursor: 'pointer' } },
  container: { marginBottom: 12 },
  messageBody: {
    borderRadius: 3,
    lineHeight: 1.8,
    marginLeft: 6,
    padding: '1px 5px 2px',
  },
  messageTag: {},
  notRead: { backgroundColor: Colors.DARK_GRAY5 },
})
