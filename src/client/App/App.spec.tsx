import { shallow } from 'enzyme'
import * as React from 'react'

import App from '.'

it('matches snapshot', () => {
  const wrapper = shallow(<App />)
  expect(wrapper).toMatchSnapshot()
})
