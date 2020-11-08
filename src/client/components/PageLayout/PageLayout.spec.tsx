import { render } from 'enzyme'
import React from 'react'
import PageLayout from '.'

test('it matches snapshot', () => {
  const wrapper = render(
    <PageLayout>
      <h1>Test</h1>
    </PageLayout>
  )
  expect(wrapper).toMatchSnapshot()
})
