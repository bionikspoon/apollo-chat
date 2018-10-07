import { shallow } from 'enzyme'
import * as React from 'react'
import Messages from '.'

test('it matches snapshot', () => {
  const wrapper = shallow(<Messages />)
  expect(wrapper).toMatchSnapshot()
})
