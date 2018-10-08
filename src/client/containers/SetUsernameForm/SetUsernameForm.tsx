import {
  Card,
  Elevation,
  FormGroup,
  InputGroup,
  Intent,
  Tag,
} from '@blueprintjs/core'
import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'
import { SetUsernameFormProps } from './enhancers'

export default function SetUsernameForm(props: SetUsernameFormProps) {
  if (!props.data.user) return

  const { color, username } = props.data.user

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.mutate({
      variables: { username: event.target.value, color },
    })
  }

  const handleColorChange = (intent: Intent) => () => {
    props.mutate({
      variables: { username, color: intent },
    })
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
            value={username}
            id="username"
            onChange={handleUsernameChange}
            required={true}
          />
        </FormGroup>
        <div className={css(styles.tags)}>
          {Object.keys(Intent)
            .map(key => Intent[key])
            .map(intent => (
              <Tag
                key={intent}
                intent={intent}
                interactive={true}
                onClick={handleColorChange(intent)}
                minimal={color !== intent}
              >
                {username}
              </Tag>
            ))}
        </div>
      </form>
    </Card>
  )
}

const styles = StyleSheet.create({
  formGroup: {
    margin: 0,
  },
  tags: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
})
