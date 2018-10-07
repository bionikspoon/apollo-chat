import * as React from 'react'
import AddMessageForm from '../AddMessageForm'
import Messages from '../Messages'
import PageLayout from '../PageLayout'

export default function Chat() {
  return (
    <PageLayout>
      <Messages />
      <AddMessageForm />
    </PageLayout>
  )
}
