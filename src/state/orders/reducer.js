import {set, flow} from 'lodash/fp';
import {createAction, handleActions} from 'redux-actions';
import type {State, RemoteData, Orders} from './types.flow';
import {loop, Cmd} from 'redux-loop';
import {ordersRequest} from './request';
import {apiHost} from './constants';

// Types
const ORDERS = {
  REQUEST: 'orders/REQUEST',
  RESPONSE: 'orders/RESPONSE'
};

// Actions
export const requestOrders = createAction(ORDERS.REQUEST, () => null);
export const responseOders = createAction(ORDERS.RESPONSE, ({ok, data}) => {
  if (ok) {
    return data;
  }
  return new Error('ListOrdersRequestError');
});

// Reducer

const ordersData: RemoteData<Orders, string> = {
  data: null,
  error: null,
  loading: false
};

const initialState: State = {
  orders: ordersData
};

export default handleActions(
  {
    [ORDERS.REQUEST]: (state: State) =>
      loop(
        set('orders.loading', true, state),
        ordersRequest(apiHost({start: 1, size: 60}), responseOders)
      ),
    [ORDERS.RESPONSE]: {
      next: (state: State, action: {payload: Orders}) =>
        loop({...state, orders: {data: action.payload, loading: false, error: null}}, Cmd.none),
      throw: (state: State, {payload}: {payload: {message: string}}) =>
        loop(
          flow(
            set('orders.loading', false),
            set('orders.data', null),
            set('orders.error', payload.message)
          )(state),
          Cmd.none
        )
    }
  },
  initialState
);
