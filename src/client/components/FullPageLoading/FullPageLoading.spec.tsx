import { mount } from 'enzyme'
import React from 'react'
import FullPageLoading from '.'

test('it matches snapshot', () => {
  const wrapper = mount(<FullPageLoading />)
  expect(wrapper).toMatchSnapshot()
})
