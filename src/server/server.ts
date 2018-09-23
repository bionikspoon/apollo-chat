import * as cors from '@koa/cors'
import { ApolloServer } from 'apollo-server-koa'
import * as http from 'http'
import * as Koa from 'koa'
import * as helmet from 'koa-helmet'
import * as logger from 'koa-logger'
import { resolvers, typeDefs } from './schema'

const app = new Koa()
const apolloServer = new ApolloServer({ typeDefs, resolvers })
const httpServer = http.createServer(app.callback())

if (process.env.NODE_ENV !== 'production') {
  app.use(logger())
}
app.use(helmet())
app.use(cors())

apolloServer.applyMiddleware({ app, path: '/api/graphql' })
apolloServer.installSubscriptionHandlers(httpServer)

export default httpServer
