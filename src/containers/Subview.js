
'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import {Actions} from 'react-native-router-flux'


import NavigationBar from 'react-native-navbar'


import React from 'react'
import
{
  StyleSheet,
  View,
  Text
}
from 'react-native'


import * as deviceActions from '../reducers/device/deviceActions'




function mapStateToProps (state) {
  return {
    deviceVersion: state.device.version
  }
}


function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(deviceActions, dispatch)
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



 
var createReactClass = require('create-react-class');
let Subview = createReactClass({

  render () {
    var titleConfig = {
      title: 'Subview.subview'
    }

    var leftButtonConfig = {
      title: 'Subview.back',
      handler: Actions.pop
    }

    return (
      <View>
        <NavigationBar
          title={titleConfig}
          leftButton={leftButtonConfig} />
        <View style={styles.container}>
          <Text style={styles.summary}>{'Subview.subview'} {'App.version'}: {this.props.deviceVersion}
          </Text>
        </View>
      </View>
    )
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(Subview)
