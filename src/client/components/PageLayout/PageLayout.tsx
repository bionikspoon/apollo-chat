import { Classes, Colors } from '@blueprintjs/core'
import { css, StyleDeclarationValue, StyleSheet } from 'aphrodite'
import cx from 'classnames'
import React from 'react'

interface IProps {
  children: React.ReactChild | React.ReactChild[]
  css?: StyleDeclarationValue
}

export default function PageLayout(props: IProps) {
  return (
    <div
      className={cx(
        Classes.UI_TEXT,
        Classes.DARK,
        css(styles.container, props.css)
      )}
    >
      {props.children}
    </div>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.DARK_GRAY3,
    display: 'flex',
    flexFlow: 'column nowrap',
    height: '100%',
    overflow: 'scroll',
    width: '100%',
  },
})
