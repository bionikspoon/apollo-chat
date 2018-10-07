import { mount } from 'enzyme'
import * as React from 'react'
import FullPageLoading from '.'

test('it matches snapshot', () => {
  const wrapper = mount(<FullPageLoading />)
  expect(wrapper).toMatchSnapshot()
})
