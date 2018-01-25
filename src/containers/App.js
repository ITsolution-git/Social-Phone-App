
'use strict'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as authActions from '../reducers/auth/authActions'
import * as deviceActions from '../reducers/device/deviceActions'
import * as globalActions from '../reducers/global/globalActions'


import React from 'react'
import
{
    StyleSheet,
    View,
    Text
}
from 'react-native'


import Header from '../components/Header'


function mapStateToProps (state) {
  return {
    deviceVersion: state.device.version,
    auth: {
      form: {
        isFetching: state.auth.form.isFetching
      }
    },
    global: {
      currentState: state.global.currentState,
      showState: state.global.showState
    }
  }
}


function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...authActions, ...deviceActions, ...globalActions }, dispatch)
  }
}

var styles = StyleSheet.create({
  container: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    marginTop: 80,
    padding: 10
  },
  summary: {
    fontSize: 18,
    fontWeight: 'bold'
  }
})

var reactMixin = require('react-mixin')
import TimerMixin from 'react-timer-mixin'

var createReactClass = require('create-react-class');
let App = createReactClass({

  componentDidMount () {

  },

  render () {
    return (
      <View>
        <Header isFetching={this.props.auth.form.isFetching}
          showState={this.props.global.showState}
          currentState={this.props.global.currentState}
          onGetState={this.props.actions.getState}
          onSetState={this.props.actions.setState} />

        <Text style={styles.summary}>Snowflake {'App.version'}:{this.props.deviceVersion}</Text>

      </View>
    )
  }
})

reactMixin(App.prototype, TimerMixin)

export default connect(mapStateToProps, mapDispatchToProps)(App)
