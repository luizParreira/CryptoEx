import React from 'react';
import App from './view';
import {Provider} from 'react-redux';
import getStore, {addListener} from './state';
import Navigator from './view/navigation';

const DEFAULT_ROUTE = '/trades';

export default () => (
  <Provider store={getStore(DEFAULT_ROUTE, Navigator.router)}>
    <App addListener={addListener} />
  </Provider>
);
