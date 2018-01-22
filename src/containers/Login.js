
'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import * as authActions from '../reducers/auth/authActions'


import LoginRender from '../components/LoginRender'


import React from 'react'

const {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
} = require('../lib/constants').default



function mapStateToProps (state) {
  return {
    auth: state.auth,
    global: state.global
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  }
}

function buttonPressHandler (login, username, password) {
  login(username, password)
}


var createReactClass = require('create-react-class');
let Login = createReactClass({

  render () {
    let loginButtonText = 'Login'
    let onButtonPress = buttonPressHandler.bind(null,
                                                this.props.actions.login,
                                                this.props.auth.form.fields.username,
                                                this.props.auth.form.fields.password
                                               )

    return (
      <LoginRender
        formType={LOGIN}
        loginButtonText={loginButtonText}
        onButtonPress={onButtonPress}
        displayPasswordCheckbox
        leftMessageType={REGISTER}
        rightMessageType={FORGOT_PASSWORD}
        auth={this.props.auth}
        global={this.props.global}
      />
    )
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
