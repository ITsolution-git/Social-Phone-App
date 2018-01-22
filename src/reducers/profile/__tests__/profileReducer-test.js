
'use strict'


const {
  ON_PROFILE_FORM_FIELD_CHANGE,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,

  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAILURE
} = require('../../../lib/constants').default


const profileReducer = require('../profileReducer').default

describe('profileReducer', () => {
  
  describe('PROFILE_REQUEST', () => {
    
    it('starts fetching', () => {
      const action = {
        type: GET_PROFILE_REQUEST
      }
      let next = profileReducer(undefined, action)

      expect(next.form.isFetching).toBe(true)
      expect(next.form.error).toBe(null)
    })
    
    it('finishes fetching on success', () => {
      const action = {
        type: GET_PROFILE_SUCCESS,
        payload: {
          username: 'barton',
          email: 'barton@foo.com',
          emailVerified: true,
          objectId: 'someObjectId'
        }
      }
      let next = profileReducer(undefined, action)

      expect(next.form.isFetching).toBe(false)
      expect(next.form.error).toBe(null)
      expect(next.form.fields.username).toEqual(action.payload.username)
      expect(next.form.fields.email).toEqual(action.payload.email)
      expect(next.form.fields.emailVerified).toBe(action.payload.emailVerified)

      expect(next.form.originalProfile.username).toEqual(action.payload.username)
      expect(next.form.originalProfile.email).toEqual(action.payload.email)
      expect(next.form.originalProfile.emailVerified).toBe(action.payload.emailVerified)
    })
    
    it('finishes fetching on failure', () => {
      const action = {
        type: GET_PROFILE_FAILURE,
        payload: {error: 'error'}
      }
      let next = profileReducer(undefined, action)
      expect(next.form.isFetching).toBe(false)
      expect(next.form.error).toBe(action.payload)
    })
  })// Profile Request

  
  describe('PROFILE_UPDATE', () => {
    
    it('starts fetching on request', () => {
      const action = {
        type: PROFILE_UPDATE_REQUEST
      }
      let next = profileReducer(undefined, action)

      expect(next.form.isFetching).toBe(true)
      expect(next.form.error).toBe(null)
    })
    
    it('finishes fetching on success', () => {
      const action = {
        type: PROFILE_UPDATE_SUCCESS
      }
      let next = profileReducer(undefined, action)

      expect(next.form.isFetching).toBe(false)
    })
    
    it('finishes fetching on failure and saves error', () => {
      const action = {
        type: PROFILE_UPDATE_FAILURE,
        payload: {error: 'error'}
      }
      let next = profileReducer(undefined, action)
      expect(next.form.isFetching).toBe(false)
      expect(next.form.error).toBe(action.payload)
    })
  })// ProfileUpdate
  
  describe('PROFILE_FORM_FIELD_CHANGE', () => {
    
    it('form is valid with valid email & username', () => {
      const usernameAction = {
        type: ON_PROFILE_FORM_FIELD_CHANGE,
        payload: {field: 'username', value: 'barton'}
      }
      const emailAction = {
        type: ON_PROFILE_FORM_FIELD_CHANGE,
        payload: {field: 'email', value: 'barton@gmail.com'}
      }
      let firstState = profileReducer(undefined,
                                usernameAction)
      let next = profileReducer(firstState,
                                emailAction)

      expect(next.form.isValid).toBe(true)
      expect(next.form.fields.username).toEqual(usernameAction.payload.value)
      expect(next.form.fields.usernameHasError).toBe(false)
      expect(next.form.fields.email).toEqual(emailAction.payload.value)
      expect(next.form.fields.emailHasError).toBe(false)
    })
    
    it('form is invalid with invalid username', () => {
      const usernameAction = {
        type: ON_PROFILE_FORM_FIELD_CHANGE,
        payload: {field: 'username', value: 'bart'}
      }

      const emailAction = {
        type: ON_PROFILE_FORM_FIELD_CHANGE,
        payload: {field: 'email', value: 'bart'}
      }
      let firstState = profileReducer(undefined,
                                usernameAction)

      let next = profileReducer(firstState, emailAction)

      expect(next.form.isValid).toBe(false)
      expect(next.form.fields.username).toEqual(usernameAction.payload.value)
      expect(next.form.fields.usernameHasError).toBe(true)
      expect(next.form.fields.email).toEqual(emailAction.payload.value)
      expect(next.form.fields.emailHasError).toBe(true)
    })
  })
})// profileReducer
