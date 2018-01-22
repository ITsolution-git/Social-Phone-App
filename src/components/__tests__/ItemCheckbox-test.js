
'use strict'

import 'react-native'
import React from 'react'

import ItemCheckbox from '../ItemCheckbox'

import ReactTestUtils from 'react-addons-test-utils'
const renderer = ReactTestUtils.createRenderer()


describe('ItemCheckbox', () => {
  
  it('if not disabled and checked, it should display check-square and text', () => {
    const props = {
      checked: true,
      text: 'TextShouldDisplay',
      disabled: false
    }
    renderer.render(<ItemCheckbox {...props} />)
    const tree = renderer.getRenderOutput()
    expect(tree).toMatchSnapshot()
  })

  
  it('if not disabled and not checked, it should display square-o and text', () => {
    const props = {
      checked: false,
      text: 'TextShouldDisplay',
      disabled: false
    }
    renderer.render(<ItemCheckbox {...props} />)
    const tree = renderer.getRenderOutput()
    expect(tree).toMatchSnapshot()
  })

  
  it('if disabled and checked, it should display check-square and text', () => {
    const props = {
      checked: true,
      text: 'TextShouldDisplay',
      disabled: true
    }
    renderer.render(<ItemCheckbox {...props} />)
    const tree = renderer.getRenderOutput()
    expect(tree).toMatchSnapshot()
  })

  
  it('if disabled and not checked, it should display square-o and text', () => {
    const props = {
      checked: false,
      text: 'TextShouldDisplay',
      disabled: true
    }
    renderer.render(<ItemCheckbox {...props} />)
    const tree = renderer.getRenderOutput()
    expect(tree).toMatchSnapshot()
  })
})// describe ItemCheckbox

