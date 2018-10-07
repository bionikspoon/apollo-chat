import { model, Schema, Model, Document } from 'mongoose'
import { IPostCreateSchema, postCreatePlugin } from './plugins'

describe('#postCreatePlugin', () => {
  let Test: Model<Document>
  let postCreateCB1: any
  let postCreateCB2: any

  beforeAll(async () => {
    const testSchema = new Schema({
      hello: String,
    }) as IPostCreateSchema<Schema>

    testSchema.plugin(postCreatePlugin)
    Test = model('Test', testSchema)
    await Test.init()

    postCreateCB1 = jest.fn()
    postCreateCB2 = jest.fn()

    testSchema.addPostCreate(postCreateCB1)
    testSchema.addPostCreate(postCreateCB2)
  })

  test('it triggers post create hooks', async () => {
    jest.setTimeout(60000)

    const test = await Test.create({ hello: 'world' })

    expect(postCreateCB1).toHaveBeenCalledTimes(1)
    expect(postCreateCB2).toHaveBeenCalledTimes(1)
    console.log('test', test)
    return
  })
})
