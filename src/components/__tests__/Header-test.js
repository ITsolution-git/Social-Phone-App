
'use strict'

jest.mock('ActivityIndicator', () => 'ActivityIndicator')


import 'react-native'
import React from 'react'

import Header from '../Header'

import ReactTestUtils from 'react-addons-test-utils'
const renderer = ReactTestUtils.createRenderer()


describe('Header', () => {
  
  it('should be display empty text when not fetching', () => {
    const props = {
      isFetching: false
    }
    renderer.render(<Header {...props} />)
    const tree = renderer.getRenderOutput()
    expect(tree).toMatchSnapshot()
  })
  
  it('should be display spinner when fetching', () => {
    const props = {
      isFetching: true
    }
    renderer.render(<Header {...props} />)
    const tree = renderer.getRenderOutput()
    expect(tree).toMatchSnapshot()
  })
})// describe Header
