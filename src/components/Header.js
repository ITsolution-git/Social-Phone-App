
'use strict'


import React from 'react'
import
{
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native'


const FormButton = require('./FormButton')

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    marginTop: 10
  },
  header: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  mark: {
    height: 100,
    width: 100
  }

})



var createReactClass = require('create-react-class');
import PropTypes from 'prop-types';
var Header = createReactClass({
  
  getInitialState () {
    return {
      text: '',
      isDisabled: true
    }
  },
  
  propTypes: {
    isFetching: PropTypes.bool,
    showState: PropTypes.bool,
    currentState: PropTypes.object,
    onGetState: PropTypes.func,
    onSetState: PropTypes.func
  },
  
  _onPressMark () {
    this.props.onGetState(!this.props.showState)
  },
  
  _onChangeText (text) {
    this.setState({
      text,
      isDisabled: false
    })
  },
  
  _updateStateButtonPress () {
    this.props.onSetState(this.state.text)
  },

  
  render () {
    let displayText
    if (this.props.showState) {
      displayText = JSON.stringify(this.props.currentState)
    }

    return (
      <View>
        <View style={styles.header}>

          <TouchableHighlight onPress={this._onPressMark}>

            <Image style={styles.mark}
              source={require('../images/Snowflake.png')}
            />
          </TouchableHighlight>
          {this.props.isFetching
           ? <ActivityIndicator animating size='large' />
           : null
          }

        </View>
        {this.props.showState
         ? <View style={styles.container}>
           <Text>{'Current State'} ({'SEE CON'})</Text>
           <TextInput style={{height: 100, borderColor: 'gray', borderWidth: 1}}
             value={displayText}
             editable
             multiline
             onChangeText={(text) => this._onChangeText(text)}
             numberOfLines={20} />
           <View style={{
             marginTop: 10
           }}>
             <FormButton isDisabled={this.state.isDisabled}
               onPress={this._updateStateButtonPress}
               buttonText={'Update State'} />
           </View>
         </View>
         : null}
      </View>
    )
  }
})

module.exports = Header
