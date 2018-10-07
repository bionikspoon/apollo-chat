import { Card, Elevation, FormGroup, InputGroup } from '@blueprintjs/core'
import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'
import { SetUsernameFormProps } from './enhancers'

export default function SetUsernameForm(props: SetUsernameFormProps) {
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.mutate({ variables: { username: event.target.value } })
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    props.history.push('/chat')
  }

  return (
    <Card elevation={Elevation.FOUR}>
      <form onSubmit={handleSubmit}>
        <FormGroup
          label="Username"
          labelFor="username"
          labelInfo="(required)"
          inline={true}
          className={css(styles.formGroup)}
          intent="primary"
        >
          <InputGroup
            id="username"
            onChange={handleUsernameChange}
            required={true}
          />
        </FormGroup>
      </form>
    </Card>
  )
}

const styles = StyleSheet.create({
  formGroup: {
    margin: 0,
  },
})
