import cors from '@koa/cors'
import { ApolloServer } from 'apollo-server-koa'
import http from 'http'
import Koa from 'koa'
import helmet from 'koa-helmet'
import logger from 'koa-logger'
import serve from 'koa-static'
import config from './config'
import { resolvers, typeDefs } from './schema'

const app = new Koa()
const apolloServer = new ApolloServer({ typeDefs, resolvers })
const httpServer = http.createServer(app.callback())

if (process.env.NODE_ENV !== 'production') {
  app.use(logger())
}
app.use(helmet())
app.use(cors())
app.use(serve(config.app.static.path, config.app.static.options))

apolloServer.applyMiddleware({ app, path: '/graphql' })
apolloServer.installSubscriptionHandlers(httpServer)

export default httpServer
