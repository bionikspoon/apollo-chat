import { model, Schema } from 'mongoose'
import { IPostCreateSchema, postCreatePlugin } from './plugins'

describe('#postCreatePlugin', () => {
  let postCreateCB1: jest.Mock
  let postCreateCB2: jest.Mock

  const testSchema = new Schema({ hello: String }) as IPostCreateSchema<Schema>
  testSchema.plugin(postCreatePlugin)
  const Test = model('Test', testSchema)

  beforeEach(async () => {
    await Test.init()

    postCreateCB1 = jest.fn()
    postCreateCB2 = jest.fn()

    testSchema.addPostCreate(postCreateCB1)
    testSchema.addPostCreate(postCreateCB2)
  })

  xtest('it triggers post create hooks', async () => {
    await Test.create({ hello: 'world' })

    await expect(postCreateCB1).toHaveBeenCalledTimes(1)
    await expect(postCreateCB2).toHaveBeenCalledTimes(1)
  })
})
