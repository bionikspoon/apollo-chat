// tslint:disable:no-console
import * as cors from '@koa/cors'
import { ApolloServer } from 'apollo-server-koa'
import * as http from 'http'
import * as Koa from 'koa'
import * as helmet from 'koa-helmet'
import * as logger from 'koa-logger'
import { resolvers, typeDefs } from './schema'

const app = new Koa()
const server = new ApolloServer({ typeDefs, resolvers })

if (process.env.NODE_ENV !== 'production') {
  app.use(logger())
}
app.use(helmet())
app.use(cors())

server.applyMiddleware({ app, path: '/api/graphql' })
const httpServer = http.createServer(app.callback())
server.installSubscriptionHandlers(httpServer)

httpServer.listen(4000)
