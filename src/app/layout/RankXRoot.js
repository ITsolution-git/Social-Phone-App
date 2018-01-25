
'use strict'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {Actions} from 'react-native-router-flux'
// import * as authActions from '../reducers/auth/authActions'
// import * as deviceActions from '../reducers/device/deviceActions'
// import * as globalActions from '../reducers/global/globalActions'


import React from 'react'
import
{
    StyleSheet,	
    View,
    Platform,
    StatusBar
}
from 'react-native'
import  RankXHeader from './RankXHeader'
import  RankXFooter from './RankXFooter'
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Text,
  Footer,
  FooterTab
} from "native-base";

function mapStateToProps (state) {
  return {
    // deviceVersion: state.device.version,
    // auth: {
    //   form: {
    //     isFetching: state.auth.form.isFetching
    //   }
    // },
    // global: {
    //   currentState: state.global.currentState,
    //   showState: state.global.showState
    // }
  }
}


function mapDispatchToProps (dispatch) {
  return {
    // actions: bindActionCreators({ ...authActions, ...deviceActions, ...globalActions }, dispatch)
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
  },
  mb10: {
    marginBottom: 10
  },
  summary: {
    fontSize: 18,
    fontWeight: 'bold'
  }
})

var reactMixin = require('react-mixin')
import TimerMixin from 'react-timer-mixin'

var createReactClass = require('create-react-class');
let RankXRoot = createReactClass({

  componentWillMount() {
  },

  componentDidMount () {

  },

  render () {
    return (
      <Container style={styles.container}>
        <RankXHeader />

        <Content padder>
          <Text>Header with Icon Buttons</Text>
        </Content>


        <RankXFooter />
      </Container>
    )
  }
})

reactMixin(RankXRoot.prototype, TimerMixin)

export default connect(mapStateToProps, mapDispatchToProps)(RankXRoot)
