import * as React from 'react'
import './App.css'

import { ApolloProvider } from 'react-apollo'
import { client } from '../apollo'
import ChatBox from '../ChatBox'
import Messages from '../Messages'

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Messages />
      <ChatBox />
    </ApolloProvider>
  )
}
