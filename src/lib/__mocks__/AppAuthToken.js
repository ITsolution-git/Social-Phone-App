
'use strict'

require('regenerator-runtime/runtime')
export class AppAuthToken {
  
  async getSessionToken () {
    return await {
      sessionToken: {
        sessionToken: 'token'
      }
    }
  }
  
  async storeSessionToken () {
    return await {}
  }
  
  async deleteSessionToken () {
    return await {}
  }
}
export let appAuthToken = new AppAuthToken()
