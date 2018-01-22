
'use strict'

jest.autoMockOff()

const {
  SET_PLATFORM,
  SET_VERSION
} = require('../../../lib/constants').default


const deviceReducer = require('../deviceReducer').default


describe('deviceReducer', () => {
  describe('init', () => {
    let initialState = null

    beforeEach(() => {
      const action = {
        type: 'dummy'
      }
      initialState = deviceReducer(undefined, action)
    })

    it('sets platform to an empty string', () => {
      expect(initialState.platform).toEqual('')
    })

    it('sets isMobile to false', () => {
      expect(initialState.isMobile).toEqual(false)
    })

    it('sets version to null', () => {
      expect(initialState.version).toBeNull()
    })
  })

  describe('SET_PLATFORM', () => {
    it('modifies the platform and returns a new state', () => {
      let platform = 'ios'

      const action = {
        type: SET_PLATFORM,
        payload: platform
      }

      let next = deviceReducer(undefined, action)

      expect(next.platform).toEqual(platform)
    })
  })

  describe('SET_VERSION', () => {
    it('modifies the version and returns a new state', () => {
      let version = '0.0.8'

      const action = {
        type: SET_VERSION,
        payload: version
      }

      let next = deviceReducer(undefined, action)
      expect(next.version).toEqual(version)
    })
  })
})// deviceReducer

