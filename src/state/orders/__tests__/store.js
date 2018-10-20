import {getModel, getCmd, Cmd} from 'redux-loop';
import * as select from '../selectors';
import reducer, {requestOrders, responseOders} from '../reducer';
import {ordersRequest} from '../request';
import {apiHost} from '../constants';

describe('orders', () => {
  const data = [
    {id: 546, type: 'buy', quantity: 9, price: 228, formattedPrice: '$ 228.0'},
    {id: 547, type: 'sell', quantity: 5, price: 129, formattedPrice: '$ 129.0'},
    {id: 548, type: 'buy', quantity: 10, price: 200, formattedPrice: '$ 200.0'},
    {id: 549, type: 'sell', quantity: 16, price: 133, formattedPrice: '$ 133.0'}
  ];
  test('initial state', () => {
    const state = reducer(undefined, {type: 'INIT'});

    expect(state).toEqual({
      orders: {
        data: null,
        error: null,
        loading: false
      }
    });
  });

  test('request', () => {
    const initialState = getModel(reducer(undefined, {type: 'INIT'}));
    const requestState = reducer(initialState, requestOrders());

    const state = getModel(requestState);
    const cmd = getCmd(requestState);

    expect(select.isOrdersLoading(state)).toBe(true);
    expect(select.orderBookOrders(state)).toBeNull();

    expect(cmd).toEqual(ordersRequest(apiHost({start: 1, size: 60}), responseOders));
  });

  test('response with success', () => {
    const initialState = getModel(reducer(undefined, {type: 'INIT'}));
    const requestState = getModel(reducer(initialState, requestOrders()));

    const responseData = {
      ok: true,
      status: 200,
      data
    };

    const responseState = reducer(requestState, responseOders(responseData));

    const state = getModel(responseState);
    const cmd = getCmd(responseState);

    expect(select.isOrdersLoading(state)).toBe(false);
    expect(select.orderBookOrders(state)).toEqual([
      [
        {id: 546, type: 'buy', quantity: 9, price: 228, formattedPrice: '$ 228.0'},
        {id: 547, type: 'sell', quantity: 5, price: 129, formattedPrice: '$ 129.0'}
      ],
      [
        {id: 548, type: 'buy', quantity: 10, price: 200, formattedPrice: '$ 200.0'},
        {id: 549, type: 'sell', quantity: 16, price: 133, formattedPrice: '$ 133.0'}
      ]
    ]);

    expect(cmd).toEqual(Cmd.none);
  });

  test('response with failure', () => {
    const initialState = getModel(reducer(undefined, {type: 'INIT'}));
    const requestState = getModel(reducer(initialState, requestOrders()));

    const responseData = {
      ok: false,
      status: 500
    };

    const responseState = reducer(requestState, responseOders(responseData));

    const state = getModel(responseState);
    const cmd = getCmd(responseState);

    expect(select.isOrdersLoading(state)).toBe(false);
    expect(select.orderBookOrders(state)).toBeNull();
    expect(select.error(state)).toBe('ListOrdersRequestError');

    expect(cmd).toEqual(Cmd.none);
  });
});
