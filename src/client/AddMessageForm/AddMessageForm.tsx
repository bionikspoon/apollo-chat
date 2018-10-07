import { Button, ControlGroup, InputGroup, Tag } from '@blueprintjs/core'
import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'
import { ChangeEvent, Component, FormEvent } from 'react'

import { AddMessageFormProps } from './enhancers'

export default class AddMessageForm extends Component<AddMessageFormProps, {}> {
  public state = { body: '' }

  public render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <ControlGroup fill={true}>
          <Tag intent="success" className={css(styles.tag)}>
            Manu
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

    this.props.mutate({
      variables: {
        body: this.state.body,
        user: 'Manu',
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
