import * as React from 'react'

import { Spinner } from '@blueprintjs/core'
import { StyleSheet } from 'aphrodite'
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
