import { Message } from '.'

test('it should be invalid if empty', async () => {
  const message = new Message()

  await expect(message.validate()).rejects.toHaveProperty(
    'errors.user.name',
    'ValidatorError'
  )
})

test('it should be valid', async () => {
  const message = {
    body: 'test message',
    user: 'Joe Sixpack',
  }

  await expect(Message.create(message)).resolves.toMatchObject(message)
})
