import { shallow } from 'enzyme'
import * as React from 'react'
import SetUsernameForm from '.'

test('it matches snapshot', () => {
  const wrapper = shallow(<SetUsernameForm />)
  expect(wrapper).toMatchSnapshot()
})
