
'use strict'


import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { composeWithDevTools } from 'remote-redux-devtools';

import reducer from '../reducers'


export default function configureStore (initialState) {
  // return createStoreWithMiddleware(reducer, initialState)
  return  createStore(reducer, initialState,  composeWithDevTools(
  applyMiddleware(thunk),
  // other store enhancers if any
));
}
