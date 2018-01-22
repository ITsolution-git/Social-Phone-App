
'use strict'


const {
  SESSION_TOKEN_REQUEST,
  SESSION_TOKEN_SUCCESS,
  SESSION_TOKEN_FAILURE,

  LOGOUT,
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD,

  ON_AUTH_FORM_FIELD_CHANGE,

  SIGNUP_FAILURE
} = require('../../../lib/constants').default


const authReducer = require('../authReducer').default

describe('authReducer', () => {
  
  describe('SESSION-TOKEN-REQUEST', () => {
    it('starts fetching', () => {
      const action = {
        type: SESSION_TOKEN_REQUEST
      }
      let next = authReducer(undefined, action)

      expect(next.form.isFetching).toBe(true)
      expect(next.form.error).toBe(null)
    })

    it('finishes fetching on success', () => {
      const action = {
        type: SESSION_TOKEN_SUCCESS
      }
      let next = authReducer(undefined, action)

      expect(next.form.isFetching).toBe(false)
      expect(next.form.error).toBe(null)
    })

    it('finishes fetching on failure', () => {
      const action = {
        type: SESSION_TOKEN_FAILURE
      }
      let next = authReducer(undefined, action)

      expect(next.form.isFetching).toBe(false)
      expect(next.form.error).toBe(null)
    })
  })// Session-token-request

  
  describe('SIGNUP_FAILURE', () => {
    it('Finish fetching with error', () => {
      const action = {
        type: SIGNUP_FAILURE,
        payload: {error: 'error'}
      }
      let next = authReducer(undefined, action)

      expect(next.form.isFetching).toBe(false)
      expect(next.form.error).toBeDefined()
      expect(next.form.error.error).toBe('error')
    })
  })// SIGNUP_FAILURE

  
  describe('LOGOUT', () => {
    let initialState = null
    
    beforeEach(() => {
      const action = {
        type: 'dummy'
      }
      initialState = authReducer(undefined, action)
    })
    
    it('form is valid to logout', () => {
      const action = {
        type: LOGOUT
      }
      let next = authReducer(initialState, action)

      expect(next.form.state).toBe(LOGOUT)
      expect(next.form.isValid).toBe(true)
    })
    
    it('form is valid to logout even with form fields', () => {
      const action = {
        type: LOGOUT
      }
      let init = authReducer(initialState, action)
      let withFields =
            init.setIn(['form', 'fields', 'username'], 'dummy')
            .setIn(['form', 'fields', 'email'], 'notvalid')
            .setIn(['form', 'fields', 'password'], 'foo')
            .setIn(['form', 'fields', 'passwordAgain'], 'foo')
      let next = authReducer(withFields, action)
      expect(next.form.state).toBe(LOGOUT)
      expect(next.form.isValid).toBe(true)
      expect(next.form.fields.username).toBe('')
      expect(next.form.fields.email).toBe('')
      expect(next.form.fields.password).toBe('')
      expect(next.form.fields.passwordAgain).toBe('')
    })
  })
  
  describe('FORGOT_PASSWORD', () => {
    let initialState = null
    
    beforeEach(() => {
      const action = {
        type: 'dummy'
      }
      initialState = authReducer(undefined, action)
    })
    
    it('form is not valid with empty field', () => {
      const action = {
        type: FORGOT_PASSWORD
      }
      let next = authReducer(initialState, action)

      expect(next.form.state).toBe(FORGOT_PASSWORD)
      expect(next.form.isValid).toBe(false)
    })
    
    it('form is valid with valid email', () => {
      const emailFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: {field: 'email', value: 'bar@ton.com'}
      }
      let emailState = authReducer(initialState,
                                   emailFieldChangeAction)

      const action = {
        type: FORGOT_PASSWORD
      }
      let next = authReducer(emailState,
                             action)
      expect(next.form.state).toBe(FORGOT_PASSWORD)
      expect(next.form.isValid).toBe(true)
    })
    
    it('form is invalid with invalid email', () => {
      const emailFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: {field: 'email', value: 'bar@ton'}
      }
      let emailState = authReducer(initialState,
                                   emailFieldChangeAction)

      const action = {
        type: FORGOT_PASSWORD
      }
      let next = authReducer(emailState,
                             action)
      expect(next.form.state).toBe(FORGOT_PASSWORD)
      expect(next.form.isValid).toBe(false)
    })
  })
  
  describe('LOGIN', () => {
    let initialState = null
    
    beforeEach(() => {
      const action = {
        type: 'dummy'
      }
      initialState = authReducer(undefined, action)
    })
    
    it('form is not valid with empty fields', () => {
      const action = {
        type: LOGIN
      }
      let next = authReducer(initialState, action)

      expect(next.form.state).toBe(LOGIN)
      expect(next.form.isValid).toBe(false)
    })
    
    it('form is  valid with valid fields', () => {
      const userNameFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: {field: 'username', value: 'barton'}
      }
      const passwordFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: {field: 'password', value: 'Bart0n!'}
      }

      let userNameState = authReducer(initialState,
                                      userNameFieldChangeAction)
      let passwordState = authReducer(userNameState,
                                      passwordFieldChangeAction)

      const action = {
        type: LOGIN
      }

      let next = authReducer(passwordState, action)
      expect(next.form.state).toBe(LOGIN)
      expect(next.form.fields.usernameHasError).toBe(false)
      expect(next.form.fields.passwordHasError).toBe(false)
      expect(next.form.isValid).toBe(true)
    })
    
    it('form is invalid with invalid fields', () => {
      const userNameFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: {field: 'username', value: 'bart'}
      }
      const passwordFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: {field: 'password', value: 'Bart!'}
      }

      let userNameState = authReducer(initialState,
                                      userNameFieldChangeAction)
      let passwordState = authReducer(userNameState,
                                      passwordFieldChangeAction)

      const action = {
        type: LOGIN
      }

      let next = authReducer(passwordState, action)
      expect(next.form.state).toBe(LOGIN)
      expect(next.form.fields.usernameHasError).toBe(true)
      expect(next.form.fields.passwordHasError).toBe(true)
      expect(next.form.isValid).toBe(false)
    })
  })// LOGIN
  
  describe('REGISTER', () => {
    let initialState = null
    
    beforeEach(() => {
      const action = {
        type: 'dummy'
      }
      initialState = authReducer(undefined, action)
    })
    
    it('form is not valid with empty fields', () => {
      const action = {
        type: REGISTER
      }
      let next = authReducer(initialState, action)

      expect(next.form.state).toBe(REGISTER)
      expect(next.form.isValid).toBe(false)
    })
    
    it('form is  valid with valid fields', () => {
      const userNameFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: {field: 'username', value: 'barton'}
      }
      const emailFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: {field: 'email', value: 'bar@ton.com'}
      }
      const passwordFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: {field: 'password', value: 'Bart0n!'}
      }
      const passwordAgainFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: {field: 'passwordAgain', value: 'Bart0n!'}
      }

      let userNameState = authReducer(initialState,
                                      userNameFieldChangeAction)
      let emailState = authReducer(userNameState,
                                   emailFieldChangeAction)
      let passwordState = authReducer(emailState,
                                      passwordFieldChangeAction)
      let passwordAgainState = authReducer(passwordState,
                                           passwordAgainFieldChangeAction)

      const action = {
        type: REGISTER
      }

      let next = authReducer(passwordAgainState, action)
      expect(next.form.state).toBe(REGISTER)
      expect(next.form.fields.usernameHasError).toBe(false)
      expect(next.form.fields.emailHasError).toBe(false)
      expect(next.form.fields.passwordHasError).toBe(false)
      expect(next.form.fields.passwordAgainHasError).toBe(false)
      expect(next.form.isValid).toBe(true)
    })
    
    it('form is  invalid with invalid fields', () => {
      const userNameFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: {field: 'username', value: 'bart'}
      }
      const emailFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: {field: 'email', value: 'barton'}
      }
      const passwordFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: {field: 'password', value: 'Bart!'}
      }
      const passwordAgainFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: {field: 'passwordAgain', value: 'Ba!'}
      }

      let userNameState = authReducer(initialState,
                                      userNameFieldChangeAction)
      let emailState = authReducer(userNameState,
                                   emailFieldChangeAction)
      let passwordState = authReducer(emailState,
                                      passwordFieldChangeAction)
      let passwordAgainState = authReducer(passwordState,
                                           passwordAgainFieldChangeAction)

      const action = {
        type: REGISTER
      }

      let next = authReducer(passwordAgainState, action)
      expect(next.form.state).toBe(REGISTER)
      expect(next.form.fields.usernameHasError).toBe(true)
      expect(next.form.fields.emailHasError).toBe(true)
      expect(next.form.fields.passwordHasError).toBe(true)
      expect(next.form.fields.passwordAgainHasError).toBe(true)
      expect(next.form.isValid).toBe(false)
    })
  })// REGISTER
})// authReducer
