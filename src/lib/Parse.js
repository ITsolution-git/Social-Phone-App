
'use strict'


import CONFIG from './config'
import _ from 'underscore'
import Backend from './Backend'

export class Parse extends Backend {
  
  initialize (token) {
    if (!_.isNull(token) && _.isUndefined(token.sessionToken)) {
      throw new Error('TokenMissing')
    }
    this._sessionToken =
      _.isNull(token) ? null : token.sessionToken.sessionToken

    this._applicationId = CONFIG.PARSE.appId
    this.API_BASE_URL = CONFIG.backend.parseLocal
    ? CONFIG.PARSE.local.url
    : CONFIG.PARSE.remote.url
  }
  
  async signup (data) {
    return await this._fetch({
      method: 'POST',
      url: '/users',
      body: data
    })
      .then((res) => {
        return res.json().then(function (json) {
          if (res.status === 200 || res.status === 201) {
            return json
          } else {
            throw (json)
          }
        })
      })
      .catch((error) => {
        throw (error)
      })
  }
  
  async login (data) {
    var formBody = []
    for (var property in data) {
      var encodedKey = encodeURIComponent(property)
      var encodedValue = encodeURIComponent(data[property])
      formBody.push(encodedKey + '=' + encodedValue)
    }
    formBody = formBody.join('&')

    return await this._fetch({
      method: 'GET',
      url: '/login?' + formBody
    })
      .then((res) => {
        return res.json().then(function (json) {
          if (res.status === 200 || res.status === 201) {
            return json
          } else {
            throw (json)
          }
        })
      })
      .catch((error) => {
        throw (error)
      })
  }
  
  async logout () {
    return await this._fetch({
      method: 'POST',
      url: '/logout',
      body: {}
    })
      .then((res) => {
        if ((res.status === 200 ||
          res.status === 201 ||
          res.status === 400) ||
        (res.code === 209)) {
          return {}
        } else {
          throw new Error({code: 404, error: 'unknown error from Parse.com'})
        }
      })
      .catch((error) => {
        throw (error)
      })
  }
  
  async resetPassword (data) {
    return await this._fetch({
      method: 'POST',
      url: '/requestPasswordReset',
      body: data
    })
      .then((res) => {
        return res.json().then(function (json) {
          if ((res.status === 200 || res.status === 201)) {
            return {}
          } else {
            throw (json)
          }
        })
      })
      .catch((error) => {
        throw (error)
      })
  }
  
  async getProfile () {
    return await this._fetch({
      method: 'GET',
      url: '/users/me'
    })
     .then((response) => {
       return response.json().then(function (res) {
         if ((response.status === 200 || response.status === 201)) {
           return res
         } else {
           throw (res)
         }
       })
     })
      .catch((error) => {
        throw (error)
      })
  }
  
  async updateProfile (userId, data) {
    return await this._fetch({
      method: 'PUT',
      url: '/users/' + userId,
      body: data
    })
      .then((res) => {
        if ((res.status === 200 || res.status === 201)) {
          return {}
        } else {
          res.json().then(function (res) {
            throw (res)
          })
        }
      })
      .catch((error) => {
        throw (error)
      })
  }
  
  async _fetch (opts) {
    opts = _.extend({
      method: 'GET',
      url: null,
      body: null,
      callback: null
    }, opts)

    var reqOpts = {
      method: opts.method,
      headers: {
        'X-Parse-Application-Id': this._applicationId,
        'X-Parse-REST-API-Key': this._restAPIKey
      }
    }
    if (this._sessionToken) {
      reqOpts.headers['X-Parse-Session-Token'] = this._sessionToken
    }

    if (opts.method === 'POST' || opts.method === 'PUT') {
      reqOpts.headers['Accept'] = 'application/json'
      reqOpts.headers['Content-Type'] = 'application/json'
    }

    if (opts.body) {
      reqOpts.body = JSON.stringify(opts.body)
    }

    return await fetch(this.API_BASE_URL + opts.url, reqOpts)
  }
}
export let parse = new Parse()
