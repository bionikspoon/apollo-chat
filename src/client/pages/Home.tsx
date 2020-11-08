import { StyleSheet } from 'aphrodite'
import React from 'react'
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
