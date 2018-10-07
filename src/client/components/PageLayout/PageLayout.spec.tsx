import { mount } from 'enzyme'
import * as React from 'react'
import PageLaout from '.'

test('it matches snapshot', () => {
  const wrapper = mount(
    <PageLaout>
      <h1>Test</h1>
    </PageLaout>
  )
  expect(wrapper).toMatchSnapshot()
})
