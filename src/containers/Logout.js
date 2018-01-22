
'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import * as authActions from '../reducers/auth/authActions'
import * as globalActions from '../reducers/global/globalActions'


import Header from '../components/Header'

import FormButton from '../components/FormButton'


import React, {Component} from 'react'
import
{
  StyleSheet,
  View
}
from 'react-native'


var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  }
})


function mapStateToProps (state) {
  return {
    auth: {
      form: {
        isFetching: state.auth.form.isFetching,
        isValid: state.auth.form.isValid
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


class Logout extends Component {

  
  render () {
    let self = this

    let onButtonPress = () => {
      this.props.actions.logout()
    }

    return (
      <View style={styles.container}>
        <View>
          <Header isFetching={this.props.auth.form.isFetching}
            showState={this.props.global.showState}
            currentState={this.props.global.currentState}
            onGetState={this.props.actions.getState}
            onSetState={this.props.actions.setState} />

          <FormButton
            isDisabled={!this.props.auth.form.isValid || this.props.auth.form.isFetching}
            onPress={onButtonPress.bind(self)}
            buttonText={'logout'} />
        </View>
      </View>
      )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Logout)
