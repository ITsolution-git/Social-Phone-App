
'use strict'

import React from 'react'


const {
  REGISTER,
  LOGIN,
  FORGOT_PASSWORD
} = require('../lib/constants').default


const t = require('tcomb-form-native')
let Form = t.form.Form


import PropTypes from 'prop-types';
var createReactClass = require('create-react-class');
var LoginForm = createReactClass({
  
  propTypes: {
    formType: PropTypes.string,
    form: PropTypes.object,
    value: PropTypes.object,
    onChange: PropTypes.func
  },

  
  render () {
    let formType = this.props.formType

    let options = {
      fields: {
      }
    }

    let username = {
      label: 'username',
      maxLength: 12,
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.usernameHasError,
      error: this.props.form.fields.usernameErrorMsg
    }

    let email = {
      label: 'email',
      keyboardType: 'email-address',
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.emailHasError,
      error: this.props.form.fields.emailErrorMsg
    }

    let secureTextEntry = !this.props.form.fields.showPassword

    let password = {
      label: 'password',
      maxLength: 12,
      secureTextEntry: secureTextEntry,
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.passwordHasError,
      error: this.props.form.fields.passwordErrorMsg
    }

    let passwordAgain = {
      label: 'password_again',
      secureTextEntry: secureTextEntry,
      maxLength: 12,
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.passwordAgainHasError,
      error: this.props.form.fields.passwordAgainErrorMsg
    }

    let loginForm
    switch (formType) {
      
      case (REGISTER):
        loginForm = t.struct({
          username: t.String,
          email: t.String,
          password: t.String,
          passwordAgain: t.String
        })
        options.fields['username'] = username
        options.fields['username'].placeholder = 'username'
        options.fields['username'].autoCapitalize = 'none'
        options.fields['email'] = email
        options.fields['email'].placeholder = 'email'
        options.fields['email'].autoCapitalize = 'none'
        options.fields['password'] = password
        options.fields['password'].placeholder = 'password'
        options.fields['passwordAgain'] = passwordAgain
        options.fields['passwordAgain'].placeholder = 'password_again'
        break

      
      case (LOGIN):
        loginForm = t.struct({
          username: t.String,
          password: t.String
        })
        options.fields['username'] = username
        options.fields['username'].placeholder = 'username'
        options.fields['username'].autoCapitalize = 'none'
        options.fields['password'] = password
        options.fields['password'].placeholder = 'password'
        break

      
      case (FORGOT_PASSWORD):
        loginForm = t.struct({
          email: t.String
        })
        options.fields['email'] = email
        options.fields['email'].autoCapitalize = 'none'
        options.fields['email'].placeholder = 'email'
        break
    }

    
    return (
      <Form ref='form'
        type={loginForm}
        options={options}
        value={this.props.value}
        onChange={this.props.onChange}
      />

    )
  }
})

module.exports = LoginForm
