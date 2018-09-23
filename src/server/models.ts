import { Document, model, Schema } from 'mongoose'
import pubsub, * as ACTION from './pubsub'

interface IMessage {
  body: string
  user: string
  date: Date
}

export interface IMessageModel extends IMessage, Document {}

const messageSchema = new Schema({
  body: { type: String, required: true },
  date: { type: String, required: true, default: Date.now },
  user: { type: String, required: true },
})

messageSchema.pre('save', async function(this: IMessageModel) {
  if (this.isNew) {
    pubsub.publish(ACTION.MESSAGE_ADDED, this)
  }
})

export const Message = model<IMessageModel>('Message', messageSchema)
