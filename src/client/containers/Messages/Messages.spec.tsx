import { shallow } from 'enzyme'
import React from 'react'
import Messages from '.'

test('it matches snapshot', () => {
  const wrapper = shallow(<Messages />)
  expect(wrapper).toMatchSnapshot()
})
