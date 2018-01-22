
'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import * as profileActions from '../reducers/profile/profileActions'
import * as globalActions from '../reducers/global/globalActions'


import ErrorAlert from '../components/ErrorAlert'

import FormButton from '../components/FormButton'

import Header from '../components/Header'


import ItemCheckbox from '../components/ItemCheckbox'

import React, {Component} from 'react'
import
{
  StyleSheet,
  View
}
from 'react-native'


import t from 'tcomb-form-native'

let Form = t.form.Form


var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'transparent'
  },
  inputs: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  }
})



function mapStateToProps (state) {
  return {
    profile: state.profile,
    global: {
      currentUser: state.global.currentUser,
      currentState: state.global.currentState,
      showState: state.global.showState
    }
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...profileActions, ...globalActions }, dispatch)
  }
}


class Profile extends Component {
  
  constructor (props) {
    super(props)
    this.errorAlert = new ErrorAlert()
    this.state = {
      formValues: {
        username: '',
        email: ''
      }
    }
  }
  
  onChange (value) {
    if (value.username !== '') {
      this.props.actions.onProfileFormFieldChange('username', value.username)
    }
    if (value.email !== '') {
      this.props.actions.onProfileFormFieldChange('email', value.email)
    }
    this.setState({value})
  }
  
  componentWillReceiveProps (props) {
    this.setState({
      formValues: {
        username: props.profile.form.fields.username,
        email: props.profile.form.fields.email
      }
    })
  }
  
  componentDidMount () {
    if (this.props.profile.form.fields.username === '' && this.props.profile.form.fields.email === '') {
      this.props.actions.getProfile(this.props.global.currentUser)
    } else {
      this.setState({
        formValues: {
          username: this.props.profile.form.fields.username,
          email: this.props.profile.form.fields.email
        }
      })
    }
  }

  
  render () {
    this.errorAlert.checkError(this.props.profile.form.error)

    let self = this

    let ProfileForm = t.struct({
      username: t.String,
      email: t.String
    })
    
    let options = {
      auto: 'placeholders',
      fields: {
        username: {
          label: 'username',
          maxLength: 12,
          editable: !this.props.profile.form.isFetching,
          hasError: this.props.profile.form.fields.usernameHasError,
          error: this.props.profile.form.fields.usernameErrorMsg
        },
        email: {
          label: 'email',
          keyboardType: 'email-address',
          editable: !this.props.profile.form.isFetching,
          hasError: this.props.profile.form.fields.emailHasError,
          error: this.props.profile.form.fields.emailErrorMsg
        }
      }
    }

    
    let profileButtonText = 'update'
    let onButtonPress = () => {
      this.props.actions.updateProfile(
        this.props.profile.form.originalProfile.objectId,
        this.props.profile.form.fields.username,
        this.props.profile.form.fields.email,
        this.props.global.currentUser)
    }
    
    let verfiedText = 'verified' +
                       ' (' +
                       'display' +
                       ')'
    return (
      <View style={styles.container}>
        <Header isFetching={this.props.profile.form.isFetching}
          showState={this.props.global.showState}
          currentState={this.props.global.currentState}
          onGetState={this.props.actions.getState}
          onSetState={this.props.actions.setState}
        />
        <View style={styles.inputs}>
          <Form
            ref='form'
            type={ProfileForm}
            options={options}
            value={this.state.formValues}
            onChange={this.onChange.bind(self)}
          />
          <ItemCheckbox text={verfiedText}
            disabled
            checked={this.props.profile.form.fields.emailVerified} />
        </View>

        <FormButton
          isDisabled={!this.props.profile.form.isValid || this.props.profile.form.isFetching}
          onPress={onButtonPress.bind(self)}
          buttonText={profileButtonText} />

      </View>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)
