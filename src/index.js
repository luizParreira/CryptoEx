import React from 'react';
import App from './view';
import {Provider} from 'react-redux';
import getStore, {addListener} from './state';
import Navigator from './view/navigation';

const DEFAULT_ROUTE = '/trades';
const store = getStore(DEFAULT_ROUTE, Navigator.router);

export default () => (
  <Provider store={store}>
    <App addListener={addListener} />
  </Provider>
);
