import {createStore, compose as reduxCompose, applyMiddleware} from 'redux';
import {combineReducers, install} from 'redux-loop';
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';

const navigationMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.navigation
);

export const addListener = createReduxBoundAddListener('root');

const navigation = (initialScreen, router) => {
  const action = router.getActionForPathAndParams(initialScreen);
  const initialState = router.getStateForAction(action);

  return (state = initialState, action) => router.getStateForAction(action, state) || state;
};

export default (initialScreen, router) => {
  const compose = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || reduxCompose;
  const reducer = combineReducers({
    navigation: navigation(initialScreen, router)
  });
  const enhancer = compose(
    install(),
    applyMiddleware(navigationMiddleware)
  );
  return createStore(reducer, enhancer);
};
