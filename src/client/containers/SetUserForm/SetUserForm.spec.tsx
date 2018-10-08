import { shallow } from 'enzyme'
import * as React from 'react'
import SetUserForm from '.'

test('it matches snapshot', () => {
  const wrapper = shallow(<SetUserForm />)
  expect(wrapper).toMatchSnapshot()
})
