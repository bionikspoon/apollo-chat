import { model, Schema } from 'mongoose'
import { IPostCreateSchema, postCreatePlugin } from './plugins'

describe.skip('#postCreatePlugin', () => {
  let postCreateCB1: jest.Mock
  let postCreateCB2: jest.Mock

  const testSchema = new Schema({ hello: String }) as IPostCreateSchema<Schema>
  testSchema.plugin(postCreatePlugin as any)
  const Test = model('Test', testSchema)

  beforeEach(async () => {
    await Test.init()

    postCreateCB1 = jest.fn()
    postCreateCB2 = jest.fn()

    testSchema.addPostCreate(postCreateCB1)
    ;(Test.schema as IPostCreateSchema<Schema>).addPostCreate(postCreateCB2)
  })

  test('it triggers post create hooks', async () => {
    await Test.create({ hello: 'world' })

    expect(postCreateCB1).toHaveBeenCalledTimes(1)
  })

  test('it triggers post create hooks', async () => {
    await Test.create({ hello: 'world' })

    expect(postCreateCB2).toHaveBeenCalledTimes(1)
  })
})
