import { Intent } from '@blueprintjs/core'
import { model, Schema } from 'mongoose'
import pubsub, * as ACTION from '../pubsub'
import { IPostCreateSchema, postCreatePlugin } from './plugins'

interface IMessage {
  body: string
  user: string
  date: Date
  color: Intent
}

const messageSchema = new Schema({
  body: { type: String, required: true },
  color: {
    default: Intent.NONE,
    enum: Object.keys(Intent).map(key => Intent[key]),
    required: true,
    type: String,
  },
  date: { type: String, required: true, default: Date.now },
  user: { required: true, type: String },
}) as IPostCreateSchema<IMessage>

messageSchema.plugin(postCreatePlugin)
messageSchema.addPostCreate(doc => {
  pubsub.publish(ACTION.MESSAGE_ADDED, doc)
})

export const Message = model('Message', messageSchema)
