
'use strict'


import validate from 'validate.js'
import _ from 'underscore'


const emailConstraints = {
  from: {
    email: true
  }
}


const usernamePattern = /^[a-zA-Z0-9]{6,12}$/
const usernameConstraints = {
  username: {
    format: {
      pattern: usernamePattern,
      flags: 'i'
    }
  }
}


// const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/
const passwordPattern =/^[a-zA-Z0-9]{3,12}$/
const passwordConstraints = {
  password: {
    format: {
      pattern: passwordPattern,
      flags: 'i'
    }
  }
}

const passwordAgainConstraints = {
  confirmPassword: {
    equality: 'password'
  }
}


export default function fieldValidation (state, action) {
  const {field, value} = action.payload

  switch (field) {
    
    case ('username'): {
      let validUsername = _.isUndefined(validate({username: value},
                                                usernameConstraints))
      if (validUsername) {
        return state.setIn(['form', 'fields', 'usernameHasError'],
                         false)
        .setIn(['form', 'fields', 'usernameErrorMsg'], '')
      } else {
        return state.setIn(['form', 'fields', 'usernameHasError'], true)
        .setIn(['form', 'fields', 'usernameErrorMsg'],
               'FieldValidation.valid_user_name')
      }
    }

    
    case ('email'): {
      let validEmail = _.isUndefined(validate({from: value},
                                             emailConstraints))
      if (validEmail) {
        return state.setIn(['form', 'fields', 'emailHasError'], false)
      } else {
        return state.setIn(['form', 'fields', 'emailHasError'], true)
        .setIn(['form', 'fields', 'emailErrorMsg'],
                 'FieldValidation.valid_email')
      }
    }

    
    case ('password'): {
      let validPassword = _.isUndefined(validate({password: value},
                                               passwordConstraints))
      if (validPassword) {
        return state.setIn(['form', 'fields', 'passwordHasError'],
                         false)
        .setIn(['form', 'fields', 'passwordErrorMsg'],
               '')
      } else {
        return state.setIn(['form', 'fields', 'passwordHasError'], true)
        .setIn(['form', 'fields', 'passwordErrorMsg'],
          'FieldValidation.valid_password')
      }
    }

    
    case ('passwordAgain'):
      var validPasswordAgain =
          _.isUndefined(validate({password: state.form.fields.password,
                                confirmPassword: value}, passwordAgainConstraints))
      if (validPasswordAgain) {
        return state.setIn(['form', 'fields', 'passwordAgainHasError'],
                         false)
        .setIn(['form', 'fields', 'passwordAgainErrorMsg'], '')
      } else {
        return state.setIn(['form', 'fields', 'passwordAgainHasError'],
                          true)
        .setIn(['form', 'fields', 'passwordAgainErrorMsg'],
        'FieldValidation.valid_password_again')
      }

    
    case ('showPassword'):
      return state.setIn(['form', 'fields',
                                'showPassword'], value)

  }
  return state
}
