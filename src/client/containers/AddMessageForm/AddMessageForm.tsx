import { Button, ControlGroup, InputGroup, Tag } from '@blueprintjs/core'
import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'
import { ChangeEvent, Component, FormEvent } from 'react'
import { AddMessageFormProps } from './enhancers'

export default class AddMessageForm extends Component<AddMessageFormProps, {}> {
  public state = { body: '' }

  public componentDidMount() {
    if (!this.props.data) return
    if (this.props.data.username && this.props.data.username.length) return

    this.props.history.replace('/')
  }

  public render() {
    if (!this.props.data) return

    return (
      <form onSubmit={this.handleSubmit}>
        <ControlGroup fill={true}>
          <Tag intent="success" className={css(styles.tag)}>
            {this.props.data.username}
          </Tag>
          <InputGroup
            type="text"
            value={this.state.body}
            onChange={this.handleInputChange}
            rightElement={
              <Button type="submit" icon="arrow-right" intent="success" />
            }
          />
        </ControlGroup>
      </form>
    )
  }

  private handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!this.props.data) return

    this.props.mutate({
      variables: {
        body: this.state.body,
        user: this.props.data.username,
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
