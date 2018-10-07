import { StyleSheet } from 'aphrodite'
import * as React from 'react'
import PageLayout from '../components/PageLayout'
import SetUsernameForm from '../containers/SetUsernameForm'

export default function Home() {
  return (
    <PageLayout css={styles.layout}>
      <SetUsernameForm />
    </PageLayout>
  )
}

const styles = StyleSheet.create({
  layout: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
