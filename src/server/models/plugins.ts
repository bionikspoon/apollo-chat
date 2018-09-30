import { Document, Schema } from 'mongoose'

// Typescript example
// https://gist.github.com/iamdanthedev/6d411a4f6441b5548eeadadfd1f7b60a

// postCreatePlugin example
// https://medium.com/@aherve/simple-post-create-hook-plugin-for-mongoose-32d546ddd6fa

type PostCreateCallback = (model: IPostCreateModel) => void
interface IPostCreateModel extends Document {
  _wasNew?: boolean
}

export interface IPostCreateSchema extends Schema {
  addPostCreate: (fn: PostCreateCallback) => void
  postCreateListeners?: PostCreateCallback[]
}

export function postCreatePlugin(schema: IPostCreateSchema) {
  schema.addPostCreate = fn => {
    schema.postCreateListeners = schema.postCreateListeners || []
    schema.postCreateListeners.push(fn)
  }

  schema.pre('save', async function(this: IPostCreateModel) {
    this._wasNew = this.isNew
  })

  schema.post('save', async function(this: IPostCreateModel) {
    if (!this._wasNew) return
    if (!schema.postCreateListeners) return

    this._wasNew = true
    await Promise.all(schema.postCreateListeners.map(fn => fn(this)))
  })
}
