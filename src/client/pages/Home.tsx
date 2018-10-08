import { StyleSheet } from 'aphrodite'
import * as React from 'react'
import PageLayout from '../components/PageLayout'
import SetUserForm from '../containers/SetUserForm'

export default function Home() {
  return (
    <PageLayout css={styles.layout}>
      <SetUserForm />
    </PageLayout>
  )
}

const styles = StyleSheet.create({
  layout: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
