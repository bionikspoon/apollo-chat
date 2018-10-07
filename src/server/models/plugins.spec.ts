import { model, Schema, Model, Document } from 'mongoose'
import { IPostCreateSchema, postCreatePlugin } from './plugins'

describe('#postCreatePlugin', () => {
  let postCreateCB1: any
  let postCreateCB2: any

  const testSchema = new Schema({ hello: String }) as IPostCreateSchema<Schema>
  testSchema.plugin(postCreatePlugin)
  const Test = model('Test', testSchema)

  beforeEach(() => {
    // await Test.init()

    postCreateCB1 = jest.fn()
    postCreateCB2 = jest.fn()

    testSchema.addPostCreate(postCreateCB1)
    testSchema.addPostCreate(postCreateCB2)
  })

  test('it triggers post create hooks', async () => {
    await Test.create({ hello: 'world' })

    expect(postCreateCB1).toHaveBeenCalledTimes(1)
    expect(postCreateCB2).toHaveBeenCalledTimes(1)
  })
})
