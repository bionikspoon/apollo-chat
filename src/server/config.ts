import { Options } from 'koa-static'
import * as path from 'path'

export default {
  app: {
    port: 4000,
    static: {
      options: {} as Options,
      path: path.resolve(__dirname, '../../build'),
    },
  },
  mongo: {
    url: process.env.MONGODB_URI || 'mongodb://localhost/app',
  },
}
