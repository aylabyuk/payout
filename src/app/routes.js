import React from 'react'

import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { Route } from 'react-router-dom'
import { routerReducer, ConnectedRouter, routerMiddleware } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'

import { rootReducers as reducers } from './reducers' 
import Layout from '../layout/Layout'

// using redux-devtools for easy redux debugging
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const routerMid = routerMiddleware(history)

const enhancer = composeEnhancers(
  // applyMiddleware(logger),
  applyMiddleware(thunk),
  applyMiddleware(routerMid)
)

// for redux persist
const config = {
  key: 'root',
  storage,
}

const store = createStore(
  persistCombineReducers(config, {
    router: routerReducer,
    ...reducers,
    form: formReducer
  }),
  enhancer
)

export const Routes = () => {
  return(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Route exact path="/" component={Layout}/>
        </div>
      </ConnectedRouter>
    </Provider>
  )
}