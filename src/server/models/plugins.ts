import { Document, Schema } from 'mongoose'

export interface IPluginDocument extends Document {
  _wasNew?: boolean
}

export function postCreate(schema: Schema) {
  schema.pre('save', async function(this: IPluginDocument) {
    this._wasNew = this.isNew
  })
}

// https://gist.github.com/iamdanthedev/6d411a4f6441b5548eeadadfd1f7b60a
// import { Document, Model, Schema } from 'mongoose'
// import { ObjectID } from 'bson'

// /**
//  * Find or create mongoose static function creator
//  */

// export type WithFindOrCreate<T extends Document> = {
//   findOrCreate: (id?: string | ObjectID | null) => T
// }

// export function findOrCreateFactory<T extends Model<any>>() {
//   return async function(this: T, id?: string | ObjectID | null) {
//     if (!id || !ObjectID.isValid(id)) {
//       return new this()
//     }

//     const $id = new ObjectID(id)
//     const item = await this.findById($id)
//     return item ? item : new this()
//   }
// }

// export function withFindOrCreate<T extends Model<any>>(schema: Schema) {
//   schema.statics.findOrCreate = findOrCreateFactory<T>()
//   return schema
// }

// https://medium.com/@aherve/simple-post-create-hook-plugin-for-mongoose-32d546ddd6fa
// import async from 'async'

// export default function postCreatePlugin(schema) {
//     schema.addPostCreate = function (f) {
//         schema.postCreateListeners = schema.postCreateListeners || []
//         schema.postCreateListeners.push(f)
//     }

//     schema.pre('save', function (next) {
//         this._wasNew = this.isNew
//         next()
//     })

//     schema.post('save', function (doc) {
//         if (doc._wasNew) {
//             async.parallel(
//                 schema.postCreateListeners.map(f => f.bind(null, doc)),
//                 (err) => {
//                     if (err) { console.error(err) }
//                     doc._wasNew = false
//                 }
//             )
//         }
//     })
// }
