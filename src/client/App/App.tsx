import { Classes, Colors } from '@blueprintjs/core'
import { css, StyleSheet } from 'aphrodite'
import cx from 'classnames'
import * as React from 'react'
import { ApolloProvider } from 'react-apollo'

import AddMessageForm from '../AddMessageForm'
import Messages from '../Messages'
import { client } from '../setupApollo'

export default function App() {
  return (
    <ApolloProvider client={client}>
      <div className={cx(Classes.UI_TEXT, Classes.DARK, css(styles.container))}>
        <Messages />
        <AddMessageForm />
      </div>
    </ApolloProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.DARK_GRAY4,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
  },
})
