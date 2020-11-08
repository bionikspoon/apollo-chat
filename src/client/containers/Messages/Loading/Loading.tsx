import { Intent } from '@blueprintjs/core'
import { css, StyleDeclarationValue } from 'aphrodite'
import React from 'react'
import Message from '../Message/Message'
import MOCK_MESSAGES from '../MOCK_MESSAGES'

export default function Loading(props: { css: StyleDeclarationValue }) {
  return (
    <div className={css(props.css)}>
      {MOCK_MESSAGES.map((message) => (
        <Message
          key={message.id}
          id={message.id.toString()}
          user={message.user}
          body={message.body}
          color={Intent.NONE}
          loading={true}
          isRead={false}
        />
      ))}
    </div>
  )
}
