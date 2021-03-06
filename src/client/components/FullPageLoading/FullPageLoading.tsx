import { Spinner } from '@blueprintjs/core'
import { StyleSheet } from 'aphrodite'
import React from 'react'
import PageLayout from '../PageLayout'

export default function FullPageLoading() {
  return (
    <PageLayout css={styles.container}>
      <Spinner intent="primary" size={Spinner.SIZE_LARGE} />
    </PageLayout>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
})
