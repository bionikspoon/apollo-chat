import { shallow } from 'enzyme'
import * as React from 'react'

import Messages from '.'

it('matches snapshot', () => {
  const wrapper = shallow(<Messages />)
  expect(wrapper).toMatchSnapshot()
})
