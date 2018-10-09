import {
  Card,
  Elevation,
  FormGroup,
  Hotkey,
  Hotkeys,
  HotkeysTarget,
  InputGroup,
  Intent,
  Radio,
  RadioGroup,
  Tag,
} from '@blueprintjs/core'
import { css, StyleSheet } from 'aphrodite/no-important'
import * as React from 'react'
import { SetUserFormProps } from './enhancers'

const INTENTS = Object.values(Intent)

@HotkeysTarget
class SetUserForm extends React.PureComponent<SetUserFormProps> {
  public renderHotkeys() {
    return (
      <Hotkeys>
        <Hotkey
          global={true}
          label="Go to Chat"
          combo="Enter"
          group="Form"
          onKeyDown={this.handleSubmit}
        />
      </Hotkeys>
    )
  }

  public render() {
    if (!this.props.data.user) return
    const { color, username } = this.props.data.user

    return (
      <form onSubmit={this.handleSubmit}>
        <Card elevation={Elevation.FOUR} className={css(styles.card)}>
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
              onChange={this.handleUsernameChange}
              required={true}
            />
          </FormGroup>
          <RadioGroup
            onChange={this.handleColorChange}
            selectedValue={color}
            inline={true}
            className={css(styles.radioGroup)}
          >
            {INTENTS.map(intent => (
              <Radio value={intent} key={intent} large={true}>
                <Tag
                  large={true}
                  intent={intent}
                  interactive={true}
                  minimal={color !== intent}
                >
                  {username}
                </Tag>
              </Radio>
            ))}
          </RadioGroup>
        </Card>
      </form>
    )
  }

  private handleUsernameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!this.props.data.user) return
    const { color } = this.props.data.user

    this.props.setUser({
      variables: { username: event.target.value, color },
    })
  }

  private handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!this.props.data.user) return
    const { username } = this.props.data.user
    const { value } = event.target
    if (!isIntent(value)) return

    this.props.setUser({
      variables: { username, color: value },
    })
  }

  private handleSubmit = (event: React.FormEvent | KeyboardEvent) => {
    event.preventDefault()
    this.props.history.push('/chat')
  }
}

const styles = StyleSheet.create({
  card: { width: 400 },
  formGroup: { margin: 0 },
  radioGroup: { marginTop: 20 },
})

function isIntent(color: string): color is Intent {
  return INTENTS.includes(color as Intent)
}

export default SetUserForm
