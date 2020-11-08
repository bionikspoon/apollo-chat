import { shallow } from 'enzyme'
import React from 'react'
import App from '.'

test('it matches snapshot', () => {
  const wrapper = shallow(<App />)
  expect(wrapper).toMatchSnapshot()
})
