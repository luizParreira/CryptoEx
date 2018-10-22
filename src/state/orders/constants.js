// @flow
import {Platform} from 'react-native';

// Set your local IP address
const LOCAL_IP_ADDRESS = '0.0.0.0';

const server = Platform.select({
  ios: 'localhost',
  android: LOCAL_IP_ADDRESS
});
const API_HOST = `http://${server}:5001`;

export const listOrdersURL = ({start, size}: {start: number, size: number}) =>
  `${API_HOST}/listOrders?start=${start}&size=${size}`;

export const FETCH_SIZE = 60;

export const ORDER_FETCH_INTERVAL = 30000;
export const ORDER_MATCH_INTERVAL = 1000;

export const ORDER_BOOK_LIMIT = 20;
export const MARKET_TRADES_LIMIT = 30;
