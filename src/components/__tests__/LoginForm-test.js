

'use strict'

jest.mock('tcomb-form-native', () => {
  const React = require('React')
  const t = require.requireActual('tcomb-form-native')
  t.form.Component.prototype.render = function render () {
    return React.createElement(this.getTemplate().name, this.props)
  }
  return t
})

import 'react-native'
import React from 'react'

import LoginForm from '../LoginForm'

import ReactTestUtils from 'react-addons-test-utils'
const renderer = ReactTestUtils.createRenderer()

const {
  REGISTER,
  LOGIN,
  FORGOT_PASSWORD
} = require('../../lib/constants').default

describe('LoginForm', () => {
  
  function snapshotForm (props) {
    renderer.render(<LoginForm {...props} />)
    const tree = renderer.getRenderOutput()
    expect(tree).toMatchSnapshot()
  }
  
  describe('REGISTER', () => {
    
    it('should display without errors and without values', () => {
      let form = {
        isFetching: false,
        fields: {
          usernameHasError: false,
          emailHasError: false,
          passwordHasError: false,
          passwordAgainHasError: false,
          showPassword: false
        }
      }

      let value = {
        username: '',
        email: '',
        password: '',
        passwordAgain: ''
      }

      let props = {
        form: form,
        formType: REGISTER,
        value: value,
        onChange: () => {}
      }

      snapshotForm(props)
    })
    
    it('should display  errors and  values', () => {
      let form = {
        isFetching: false,
        fields: {
          usernameHasError: true,
          emailHasError: true,
          passwordHasError: true,
          passwordAgainHasError: true,
          showPassword: false
        }
      }

      let value = {
        username: 'username',
        email: 'email',
        password: 'password',
        passwordAgain: 'passwordagain'
      }

      let props = {
        form: form,
        formType: REGISTER,
        value: value,
        onChange: () => {}
      }

      snapshotForm(props)
    })
    
    it('should not be editable if fetching', () => {
      let form = {
        isFetching: true,
        fields: {
          usernameHasError: true,
          emailHasError: true,
          passwordHasError: true,
          passwordAgainHasError: true,
          showPassword: false
        }
      }

      let value = {
        username: 'username',
        email: 'email',
        password: 'password',
        passwordAgain: 'passwordagain'
      }

      let props = {
        form: form,
        formType: REGISTER,
        value: value,
        onChange: () => {}
      }

      snapshotForm(props)
    })
    
    it('password fields are not secured if shown', () => {
      let form = {
        isFetching: false,
        fields: {
          usernameHasError: false,
          emailHasError: false,
          passwordHasError: false,
          passwordAgainHasError: false,
          showPassword: true
        }
      }

      let value = {
        username: 'username',
        email: 'email',
        password: 'password',
        passwordAgain: 'passwordagain'
      }

      let props = {
        form: form,
        formType: REGISTER,
        value: value,
        onChange: () => {}
      }

      snapshotForm(props)
    })
  })

  
  describe('LOGIN', () => {
    
    it('should display without errors and without values', () => {
      let form = {
        isFetching: false,
        fields: {
          usernameHasError: false,
          passwordHasError: false,
          showPassword: false
        }
      }

      let value = {
        username: '',
        password: ''
      }

      let props = {
        form: form,
        formType: LOGIN,
        value: value,
        onChange: () => {}
      }

      snapshotForm(props)
    })
    
    it('should display  errors and  values', () => {
      let form = {
        isFetching: false,
        fields: {
          usernameHasError: true,
          passwordHasError: true
        }
      }

      let value = {
        username: 'username',
        password: 'password'
      }

      let props = {
        form: form,
        formType: LOGIN,
        value: value,
        onChange: () => {}
      }

      snapshotForm(props)
    })
    
    it('should not be editable if fetching', () => {
      let form = {
        isFetching: true,
        fields: {
          usernameHasError: true,
          passwordHasError: true,
          showPassword: false
        }
      }

      let value = {
        username: 'username',
        password: 'password'
      }

      let props = {
        form: form,
        formType: LOGIN,
        value: value,
        onChange: () => {}
      }

      snapshotForm(props)
    })
    
    it('password fields are not secured if shown', () => {
      let form = {
        isFetching: false,
        fields: {
          usernameHasError: false,
          passwordHasError: false,
          showPassword: true
        }
      }

      let value = {
        username: 'username',
        password: 'password'
      }

      let props = {
        form: form,
        formType: LOGIN,
        value: value,
        onChange: () => {}
      }

      snapshotForm(props)
    })
  })
  
  describe('FORGOT_PASSWORD', () => {
    
    it('should display without errors and without values', () => {
      let form = {
        isFetching: false,
        fields: {
          emailHasError: false,
          showPassword: false
        }
      }

      let value = {
        email: ''
      }

      let props = {
        form: form,
        formType: FORGOT_PASSWORD,
        value: value,
        onChange: () => {}
      }

      snapshotForm(props)
    })
    
    it('should display  errors and  values', () => {
      let form = {
        isFetching: false,
        fields: {
          emailHasError: true
        }
      }

      let value = {
        email: 'email'
      }

      let props = {
        form: form,
        formType: FORGOT_PASSWORD,
        value: value,
        onChange: () => {}
      }

      snapshotForm(props)
    })

    
    it('should not be editable if fetching', () => {
      let form = {
        isFetching: true,
        fields: {
          emailHasError: true,
          showPassword: false
        }
      }

      let value = {
        username: 'username',
        password: 'password'
      }

      let props = {
        form: form,
        formType: LOGIN,
        value: value,
        onChange: () => {}
      }

      snapshotForm(props)
    })

    
    it('password fields are not secured if shown', () => {
      let form = {
        isFetching: false,
        fields: {
          emailHasError: false,
          showPassword: true
        }
      }

      let value = {
        email: 'email'
      }

      let props = {
        form: form,
        formType: FORGOT_PASSWORD,
        value: value,
        onChange: () => {}
      }

      snapshotForm(props)
    })
  })
})// describe LoginFormTest
