import './App.css'

import * as React from 'react'
import { ApolloProvider } from 'react-apollo'

import AddMessageForm from '../AddMessageForm'
import { client } from '../apollo'
import Messages from '../Messages'

export default function App() {
  return (
    <ApolloProvider client={client}>
      <div
        style={{
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
