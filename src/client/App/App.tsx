import './App.css'

import { Classes, Colors } from '@blueprintjs/core'
import * as React from 'react'
import { ApolloProvider } from 'react-apollo'

import AddMessageForm from '../AddMessageForm'
import { client } from '../apollo'
import Messages from '../Messages'

export default function App() {
  return (
    <ApolloProvider client={client}>
      <div
        className={Classes.UI_TEXT + ' ' + Classes.DARK}
        style={{
          backgroundColor: Colors.DARK_GRAY4,
          display: 'flext',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Messages />
        <AddMessageForm />
      </div>
    </ApolloProvider>
  )
}
