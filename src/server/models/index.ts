import { model, Schema } from 'mongoose'
import pubsub, * as ACTION from '../pubsub'
import { IPostCreateSchema, postCreatePlugin } from './plugins'

interface IMessage {
  body: string
  user: string
  date: Date
}

const messageSchema = new Schema({
  body: { type: String, required: true },
  date: { type: String, required: true, default: Date.now },
  user: { type: String, required: true },
}) as IPostCreateSchema<IMessage>

messageSchema.plugin(postCreatePlugin)
messageSchema.addPostCreate(doc => {
  pubsub.publish(ACTION.MESSAGE_ADDED, doc)
})

export const Message = model('Message', messageSchema)
