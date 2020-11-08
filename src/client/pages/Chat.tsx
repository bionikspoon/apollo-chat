import React from 'react'
import PageLayout from '../components/PageLayout'
import AddMessageForm from '../containers/AddMessageForm'
import Messages from '../containers/Messages'

export default function Chat() {
  return (
    <PageLayout>
      <Messages />
      <AddMessageForm />
    </PageLayout>
  )
}
