// @flow

import {zip, orderBy, slice, flow, filter} from 'lodash/fp';
import type {State, OrderBookOrders, Orders, Order, OrderType} from './types.flow';
import numeral from 'numeral';

const ORDER_BOOK_LIMIT = 20;

const formatPrice = (price: number) => numeral(price).format('$ 0.0');
const formatPrices = (orders: Orders): Orders =>
  orders.map(
    ({quantity, price, type, id}: Order<OrderType>): Order<OrderType> => {
      return {
        id,
        type,
        price,
        quantity,
        formattedPrice: formatPrice(price)
      };
    }
  );

export const orderBookOrders = (state: State): ?OrderBookOrders => {
  const {orders} = state;
  const {data} = orders;

  if (data === undefined || data === null) {
    return null;
  }
  const formattedOrders = formatPrices(data);

  const buy = flow(
    filter(['type', 'buy']),
    orderBy(['price'], ['desc']),
    slice(0, ORDER_BOOK_LIMIT)
  )(formattedOrders);

  const sell = flow(
    filter(['type', 'sell']),
    orderBy(['price'], ['asc']),
    slice(0, ORDER_BOOK_LIMIT)
  )(formattedOrders);

  return zip(buy, sell);
};

export const isOrdersLoading = (state: State): boolean => state.orders.loading;

export const error = (state: State): ?string => state.orders.error;
