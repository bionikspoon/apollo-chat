import { shallow } from 'enzyme'
import * as React from 'react'

import AddMessageForm from '.'

it('matches snapshot', () => {
  const wrapper = shallow(<AddMessageForm />)
  expect(wrapper).toMatchSnapshot()
})
