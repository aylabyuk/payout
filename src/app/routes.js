import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { persistCombineReducers, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { Route } from 'react-router-dom'
import { routerReducer, ConnectedRouter, routerMiddleware } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import { responsiveStoreEnhancer, createResponsiveStateReducer } from 'redux-responsive'

import { rootReducers as reducers } from './reducers' 
import { requireAuthentication as isAuth } from '../auth/requireAuth'

import Preloader from '../preload/Preloader'
import Layout from '../layout/Layout'
import Auth from '../auth/Auth'

// using redux-devtools for easy redux debugging
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory()

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
    form: formReducer,
    browser: createResponsiveStateReducer({
      extraSmall: 0,
      small: 600,
      medium: 960,
      large: 1280,
      extraLarge: 1920,
    })
  }),
  compose(
    responsiveStoreEnhancer,
    enhancer
  )
)

persistStore(store)

export const Routes = () => {
  return(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Route exact path="/" component={isAuth(Preloader)}/>
          <Route path="/dash" component={isAuth(Layout)}/>
          <Route path="/auth" component={Auth}/>
        </div>
      </ConnectedRouter>
    </Provider>
  )
}