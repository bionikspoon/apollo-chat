import { Options } from 'koa-static'
import * as path from 'path'
import env from './env'

export default {
  app: {
    port: env.PORT,
    static: {
      options: {} as Options,
      path: path.resolve(__dirname, '../../build'),
    },
  },
  mongo: {
    url: env.MONGODB_URI,
  },
}
