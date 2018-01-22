

'use strict'


jest.mock('../../../lib/AppAuthToken')
jest.mock('../../../lib/BackendFactory')


var actions = require('../deviceActions')


const {
  SET_PLATFORM,
  SET_VERSION
} = require('../../../lib/constants').default


describe('deviceActions', () => {
  it('should setPlatform', () => {
    let platform = 'ios'
    expect(actions.setPlatform(platform)).toEqual({
      type: SET_PLATFORM,
      payload: platform
    })
  })

  it('should setVersion', () => {
    let version = '0.0.8'
    expect(actions.setVersion(version)).toEqual({
      type: SET_VERSION,
      payload: version
    })
  })
})

