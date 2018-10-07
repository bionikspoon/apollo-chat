import { StyleSheetTestUtils } from 'aphrodite'
import { configure } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { connect } from 'mongoose'

configure({ adapter: new Adapter() })

beforeAll(() => StyleSheetTestUtils.suppressStyleInjection())

beforeAll(async () => {
  const mongoServer = new MongoMemoryServer()
  const uri = await mongoServer.getConnectionString()

  connect(
    uri,
    { useNewUrlParser: true }
  )
})
