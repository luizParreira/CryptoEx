/** @format */

import 'es6-symbol/implement'; // eslint-disable-line import/no-unassigned-import
import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
