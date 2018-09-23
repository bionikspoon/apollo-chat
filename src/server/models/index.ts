import { Document, model, Schema } from 'mongoose'
import pubsub, * as ACTION from '../pubsub'
import { IPluginDocument, postCreate } from './plugins'

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

messageSchema.plugin(postCreate)
messageSchema.post('save', async function(
  this: IMessageModel & IPluginDocument
) {
  if (this._wasNew) {
    pubsub.publish(ACTION.MESSAGE_ADDED, this)
  }
  return this
})

export const Message = model<IMessageModel>('Message', messageSchema)
