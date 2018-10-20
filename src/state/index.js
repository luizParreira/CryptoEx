// @flow

import type {NavigationRouter} from 'react-navigation';
import {createStore, compose as reduxCompose, applyMiddleware} from 'redux';
import {combineReducers, install} from 'redux-loop';
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';
import orders, {requestOrders} from './orders/reducer';

const navigationMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.navigation
);

export const addListener = createReduxBoundAddListener('root');

const navigation = (initialScreen: string, router: NavigationRouter<any, any>) => {
  const action = router.getActionForPathAndParams(initialScreen);
  const initialState = router.getStateForAction(action);

  return (state = initialState, action) => router.getStateForAction(action, state) || state;
};

export default (initialScreen: string, router: NavigationRouter<any, any>) => {
  const compose = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || reduxCompose;
  const reducer = combineReducers({
    navigation: navigation(initialScreen, router),
    orders
  });

  const enhancer = compose(
    install(),
    applyMiddleware(navigationMiddleware)
  );

  const store = createStore(reducer, enhancer);
  store.dispatch(requestOrders());
  return store;
};
