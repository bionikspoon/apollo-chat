import { Message } from '.'
import { Error } from 'mongoose'

test('it should be invalid if empty', async () => {
  const message = new Message()

  await expect(message.validate()).rejects.toHaveProperty(
    'errors.user',
    expect.any(Error.ValidatorError)
  )
})

test('it should be valid', async () => {
  const message = {
    body: 'test message',
    user: 'Joe Sixpack',
  }

  await expect(Message.create(message)).resolves.toMatchObject(
    expect.objectContaining(message)
  )
})
