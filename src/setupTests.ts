import { StyleSheetTestUtils } from 'aphrodite'
import { configure } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { connect, disconnect } from 'mongoose'

configure({ adapter: new Adapter() })

beforeAll(() => {
  StyleSheetTestUtils.suppressStyleInjection()
})

const mongoServer = new MongoMemoryServer()

beforeAll(async () => {
  const uri = await mongoServer.getConnectionString()

  connect(
    uri,
    { useNewUrlParser: true }
  )
})

afterAll(() => disconnect())
