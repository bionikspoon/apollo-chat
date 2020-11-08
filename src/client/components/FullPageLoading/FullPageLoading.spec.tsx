import { render } from 'enzyme'
import React from 'react'
import FullPageLoading from '.'

test('it matches snapshot', () => {
  const wrapper = render(<FullPageLoading />)
  expect(wrapper).toMatchSnapshot()
})
