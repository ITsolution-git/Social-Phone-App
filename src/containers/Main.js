
'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import * as authActions from '../reducers/auth/authActions'
import * as globalActions from '../reducers/global/globalActions'


import {Actions} from 'react-native-router-flux'


import Header from '../components/Header'


import React, {Component} from 'react'
import
{
  StyleSheet,
  View
}
from 'react-native'


const Button = require('apsl-react-native-button')


function mapStateToProps (state) {
  return {
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
    actions: bindActionCreators({ ...authActions, ...globalActions }, dispatch)
  }
}

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
  summary: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#FF3366',
    borderColor: '#FF3366',
    marginLeft: 10,
    marginRight: 10
  }
})


class Main extends Component {

  handlePress () {
    Actions.Subview({
      title: 'Subview'
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <View>
          <Header isFetching={this.props.auth.form.isFetching}
            showState={this.props.global.showState}
            currentState={this.props.global.currentState}
            onGetState={this.props.actions.getState}
            onSetState={this.props.actions.setState} />

          <Button style={styles.button} onPress={this.handlePress.bind(this)}>
            {'Navigate'}
          </Button>
        </View>
      </View>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Main)
