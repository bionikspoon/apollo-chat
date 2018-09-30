import { Button, InputGroup } from '@blueprintjs/core'
import * as React from 'react'
import { AddMessageFormProps } from './enhancers'

export default class AddMessageForm extends React.Component<
  AddMessageFormProps,
  {}
> {
  public state = { body: '' }

  public render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <InputGroup
          type="text"
          value={this.state.body}
          onChange={this.handleInputChange}
          rightElement={
            <Button type="submit" icon="arrow-right" intent="primary" />
          }
        />
      </form>
    )
  }

  private handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    this.props.mutate({
      variables: {
        body: this.state.body,
        user: 'Manu',
      },
    })

    this.setState({ body: '' })
  }

  private handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ body: event.target.value })
  }
}
