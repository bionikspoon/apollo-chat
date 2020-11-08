import { StyleSheetTestUtils } from 'aphrodite'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

configure({ adapter: new Adapter() })

beforeAll(() => {
  StyleSheetTestUtils.suppressStyleInjection()
})

const mongod = new MongoMemoryServer({ autoStart: false })

beforeAll(async () => {
  await mongod.start()
  const uri = await mongod.getConnectionString()
  await mongoose.connect(uri, { useNewUrlParser: true })
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongod.stop()
})
