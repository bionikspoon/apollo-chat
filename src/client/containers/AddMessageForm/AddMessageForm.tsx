import { Button, ControlGroup, InputGroup, Tag } from '@blueprintjs/core'
import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'
import { ChangeEvent, Component, FormEvent } from 'react'
import { AddMessageFormProps } from './enhancers'

export default class AddMessageForm extends Component<AddMessageFormProps, {}> {
  public state = { body: '' }

  public componentDidMount() {
    if (!this.props.data.user) return
    const { username } = this.props.data.user
    if (username.length) return

    this.props.history.replace('/')
  }

  public render() {
    if (!this.props.data.user) return
    const { color, username } = this.props.data.user

    return (
      <form onSubmit={this.handleSubmit}>
        <ControlGroup fill={true}>
          <Tag intent={color} className={css(styles.tag)}>
            {username}
          </Tag>
          <InputGroup
            type="text"
            value={this.state.body}
            onChange={this.handleInputChange}
            intent={color}
            rightElement={
              <Button type="submit" icon="arrow-right" intent={color} />
            }
          />
        </ControlGroup>
      </form>
    )
  }

  private handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    if (!this.props.data.user) return
    const { color, username } = this.props.data.user
    const { body } = this.state

    if (!this.state.body.length) return

    this.props.addMessage({
      variables: {
        body,
        color,
        username,
      },
    })

    this.setState({ body: '' })
  }

  private handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ body: event.target.value })
  }
}

const styles = StyleSheet.create({
  tag: { flexGrow: 0 },
})
