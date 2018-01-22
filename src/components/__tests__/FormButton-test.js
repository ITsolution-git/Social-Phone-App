
'use strict'



import 'react-native'
import React from 'react'

import FormButton from '../FormButton'

import ReactTestUtils from 'react-addons-test-utils'
const renderer = ReactTestUtils.createRenderer()

it('FormButton', () => {
  const props = {
    isDisabled: false,
    onPress: () => {},
    buttonText: 'TestString'
  }
  renderer.render(<FormButton {...props} />)
  const tree = renderer.getRenderOutput()
  expect(tree).toMatchSnapshot()
})
