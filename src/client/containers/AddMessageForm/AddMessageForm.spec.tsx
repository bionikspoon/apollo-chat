import { shallow } from 'enzyme'
import React from 'react'
import AddMessageForm from '.'

test('it matches snapshot', () => {
  const wrapper = shallow(<AddMessageForm />)
  expect(wrapper).toMatchSnapshot()
})
