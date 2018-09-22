// tslint:disable:no-console
import * as cors from '@koa/cors'
import * as Koa from 'koa'
import * as helmet from 'koa-helmet'
import * as logger from 'koa-logger'
import * as Router from 'koa-router'
import buildRoutes from './routes'

const app = new Koa()
const router = buildRoutes(new Router({}))

app.use(helmet())
app.use(cors())

if (process.env.NODE_ENV !== 'production') {
  app.use(logger())
}

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(4000)
console.log('Server running on port 4000')
