import {getModel, getCmd, Cmd} from 'redux-loop';
import * as select from '../selectors';
import reducer, {
  requestOrders,
  responseOders,
  matchOrdersAction,
  failNetworkingRequest
} from '../reducer';
import {ordersRequest} from '../request';
import {listOrdersURL} from '../constants';

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
      },
      trades: null,
      latestOrder: null
    });
  });

  test('request', () => {
    const initialState = getModel(reducer(undefined, {type: 'INIT'}));
    const requestState = reducer(initialState, requestOrders());

    const state = getModel(requestState);
    const cmd = getCmd(requestState);

    expect(select.isOrdersLoading(state)).toBe(true);
    expect(select.orderBookOrders(state)).toBeNull();
    expect(select.hasData(state)).toBe(false);
    expect(select.error(state)).toBe(false);

    expect(cmd).toEqual(
      ordersRequest(listOrdersURL({start: 1, size: 60}), responseOders, failNetworkingRequest)
    );
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
    expect(select.hasData(state)).toBe(true);
    expect(select.error(state)).toBe(false);

    expect(cmd).toEqual(Cmd.none);
  });

  test('response with failure', () => {
    const initialState = getModel(reducer(undefined, {type: 'INIT'}));
    const requestState = getModel(reducer(initialState, requestOrders()));

    const responseData = {
      ok: false,
      status: 404
    };

    const responseState = reducer(requestState, responseOders(responseData));

    const state = getModel(responseState);
    const cmd = getCmd(responseState);

    expect(select.isOrdersLoading(state)).toBe(false);
    expect(select.orderBookOrders(state)).toBeNull();
    expect(select.hasData(state)).toBe(false);
    expect(select.error(state)).toBe(true);

    expect(cmd).toEqual(Cmd.none);
  });

  test('response failure when already has data', () => {
    const initialState = getModel(reducer(undefined, {type: 'INIT'}));
    const requestState = getModel(reducer(initialState, requestOrders()));

    const successResponseData = {
      ok: true,
      status: 200,
      data
    };

    const successResponseState = getModel(
      reducer(requestState, responseOders(successResponseData))
    );

    const responseData = {
      ok: false,
      status: 404
    };

    const responseState = reducer(successResponseState, responseOders(responseData));

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
    expect(select.hasData(state)).toBe(true);
    expect(select.error(state)).toBe(false);

    expect(cmd).toEqual(Cmd.none);
  });
});

const matchOrdersState = (data, previousState) => {
  const responseData = {
    ok: true,
    status: 200,
    data
  };
  const responseState = getModel(reducer(previousState, responseOders(responseData)));
  const matchOrdersState = reducer(responseState, matchOrdersAction());

  const state = getModel(matchOrdersState);
  const cmd = getCmd(matchOrdersState);

  return {state, cmd};
};

const order = (id, type, quantity, price) => ({id, type, quantity, price});

describe('matching orders', () => {
  const matchingOrdersData = [
    {id: 1001, type: 'sell', quantity: 6, price: 480},
    {id: 1002, type: 'buy', quantity: 8, price: 470},
    {id: 1003, type: 'buy', quantity: 5, price: 460}
  ];
  const now = 1530518207007;

  beforeAll(() => {
    const dateNowStub = jest.fn(() => now);
    global.Date.now = dateNowStub;
  });

  afterAll(() => {
    const realDateNow = Date.now.bind(global.Date);
    global.Date.now = realDateNow;
  });

  test('match orders, no orders to match', () => {
    const initialState = getModel(reducer(undefined, {type: 'INIT'}));
    const requestState = getModel(reducer(initialState, requestOrders()));

    const {state, cmd} = matchOrdersState(matchingOrdersData, requestState);

    expect(select.orders(state)).toEqual([
      order(1002, 'buy', 8, 470),
      order(1003, 'buy', 5, 460),
      order(1001, 'sell', 6, 480)
    ]);
    expect(select.trades(state)).toEqual([]);
    expect(select.error(state)).toBe(false);
    expect(select.isOrdersLoading(state)).toBe(false);
    expect(select.latestOrder(state)).toEqual(order(1003, 'buy', 5, 460));
    expect(cmd).toEqual(Cmd.none);

    const nextOrder = [{id: 1004, type: 'sell', quantity: 10, price: 460}];

    const nextOrdersState = matchOrdersState(nextOrder, state);

    const currentOrders = [
      order(1003, 'buy', 5, 460),
      order(1001, 'sell', 6, 480),
      order(1004, 'sell', 2, 460)
    ];

    expect(select.orders(nextOrdersState.state)).toEqual(currentOrders);
    expect(select.trades(nextOrdersState.state)).toEqual([
      {
        price: 465,
        quantity: 8,
        buyOrder: order(1002, 'buy', 8, 470),
        sellOrder: order(1004, 'sell', 10, 460),
        time: now
      }
    ]);
    expect(select.error(nextOrdersState.state)).toBe(false);
    expect(select.isOrdersLoading(nextOrdersState.state)).toBe(false);
    expect(select.latestOrder(nextOrdersState.state)).toEqual(order(1004, 'sell', 10, 460));
    expect(nextOrdersState.cmd).toEqual(Cmd.none);

    const {state: nextState, cmd: nextCmd} = matchOrdersState([], nextOrdersState.state);

    const nextCurrentOrders = [order(1003, 'buy', 3, 460), order(1001, 'sell', 6, 480)];

    expect(select.orders(nextState)).toEqual(nextCurrentOrders);
    expect(select.trades(nextState)).toEqual([
      {
        price: 465,
        quantity: 8,
        buyOrder: order(1002, 'buy', 8, 470),
        sellOrder: order(1004, 'sell', 10, 460),
        time: now
      },
      {
        price: 460,
        quantity: 2,
        buyOrder: order(1003, 'buy', 5, 460),
        sellOrder: order(1004, 'sell', 2, 460),
        time: now
      }
    ]);
    expect(select.formattedTrades(nextState)).toEqual([
      {
        price: 465,
        quantity: 8,
        buyOrder: {...order(1002, 'buy', 8, 470), formattedPrice: '$ 470.0'},
        sellOrder: {...order(1004, 'sell', 10, 460), formattedPrice: '$ 460.0'},
        time: now,
        formattedPrice: '$ 465.0',
        formattedTime: '4:56:47 am',
        color: '#56b53f'
      },
      {
        price: 460,
        quantity: 2,
        buyOrder: {...order(1003, 'buy', 5, 460), formattedPrice: '$ 460.0'},
        sellOrder: {...order(1004, 'sell', 2, 460), formattedPrice: '$ 460.0'},
        time: now,
        formattedPrice: '$ 460.0',
        formattedTime: '4:56:47 am',
        color: '#56b53f'
      }
    ]);
    expect(select.error(nextState)).toBe(false);
    expect(select.isOrdersLoading(nextState)).toBe(false);
    expect(select.latestOrder(nextState)).toEqual(order(1004, 'sell', 2, 460));
    expect(nextCmd).toEqual(Cmd.none);
  });
});
