
'use strict'


const {
  SET_PLATFORM,
  SET_VERSION
} = require('../../lib/constants').default


export function setPlatform (platform) {
  return {
    type: SET_PLATFORM,
    payload: platform
  }
}

export function setVersion (version) {
  return {
    type: SET_VERSION,
    payload: version
  }
}
