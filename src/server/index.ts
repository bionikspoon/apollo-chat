import { connect } from 'mongoose'

import config from './config'
import server from './server'

connect(
  config.mongo.url,
  { useNewUrlParser: true }
)

server.listen(config.app.port)
