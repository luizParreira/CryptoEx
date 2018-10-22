import {set, flow, maxBy} from 'lodash/fp';
import {createAction, handleActions} from 'redux-actions';
import type {State, RemoteData, Orders, OrderType} from './types.flow';
import {loop, Cmd} from 'redux-loop';
import {ordersRequest} from './request';
import {apiHost} from './constants';
import matchOrders from './match-orders';
import * as select from './selectors';

// Types
const ORDERS = {
  REQUEST: 'orders/REQUEST',
  RESPONSE: 'orders/RESPONSE'
};

const SUBSCRIBE = 'orders/SUBSCRIBE';
const MATCH_ORDERS = 'orders/MATCH_ORDERS';

const FAIL_NETWORKING_REQUEST = 'networking/FAIL_NETWORKING_REQUEST';

// Actions
export const requestOrders = createAction(ORDERS.REQUEST, () => null);
export const responseOders = createAction(ORDERS.RESPONSE, ({ok, data, error}) => {
  if (ok) {
    return data;
  }
  return new Error(error || 'ListOrdersRequestError');
});

export const subscribe = createAction(SUBSCRIBE, () => null);
export const matchOrdersAction = createAction(MATCH_ORDERS, () => null);

export const failNetworkingRequest = createAction(FAIL_NETWORKING_REQUEST);

// Commands
const ORDER_FETCH_INTERVAL = 30000;
const ORDER_MATCH_INTERVAL = 1000;

const continueFetching = dispatch =>
  setInterval(() => dispatch(requestOrders()), ORDER_FETCH_INTERVAL);
const continueMatching = dispatch =>
  setInterval(() => dispatch(matchOrdersAction()), ORDER_MATCH_INTERVAL);

export const executeSubscription = Cmd.list(
  [
    Cmd.run(continueFetching, {args: [Cmd.dispatch]}),
    Cmd.run(continueMatching, {args: [Cmd.dispatch]})
  ],
  {sequence: true}
);

// Reducer
const ordersData: RemoteData<Orders, string> = {
  data: null,
  error: null,
  loading: false
};

const initialState: State = {
  orders: ordersData,
  trades: null,
  latestOrder: null
};

const FETCH_SIZE = 60;

const errorState = (state: State, error: string): State =>
  flow(
    set('orders.loading', false),
    set('orders.data', error !== 'networkError' && state.orders.data),
    set('trades', error !== 'networkError' && state.data),
    set('orders.error', error)
  )(state);

export default handleActions(
  {
    [FAIL_NETWORKING_REQUEST]: (state: State) => loop(errorState(state, 'APIFailure'), Cmd.none),
    [MATCH_ORDERS]: matchOrders,
    [SUBSCRIBE]: (state: State) => loop(state, executeSubscription),
    [ORDERS.REQUEST]: (state: State) => {
      const params = {start: select.maxOrderId(state), size: FETCH_SIZE};
      return loop(
        flow(
          set('orders.error', null),
          set('orders.loading', !state.orders.data && true)
        )(state),
        ordersRequest(apiHost(params), responseOders, failNetworkingRequest)
      );
    },
    [ORDERS.RESPONSE]: {
      next: (state: State, action: {payload: Orders<OrderType>}) => {
        const data = state.orders.data || [];
        const orders = [...data, ...action.payload];

        const newState = flow(
          set('orders.data', orders),
          set('orders.loading', false),
          set('orders.error', null),
          set('latestOrder', maxBy('id', orders))
        )(state);

        return loop(newState, Cmd.none);
      },
      throw: (state: State, {payload}: {payload: {message: string}}) =>
        loop(errorState(state, payload.message), Cmd.none)
    }
  },
  initialState
);
