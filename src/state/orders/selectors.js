// @flow

import {zip, orderBy, slice, flow, filter} from 'lodash/fp';
import type {State, OrderBookOrders, Orders, Order, OrderType, Trades, Trade} from './types.flow';
import numeral from 'numeral';
import {createSelector} from 'reselect';
import moment from 'moment';
import {green, red} from '../../view/theme/colors';
import {ORDER_BOOK_LIMIT, MARKET_TRADES_LIMIT} from './constants';

const formatPrice = (price: number) => numeral(price).format('$ 0.0');
const formatPrices = (orders: Orders<OrderType>): Orders<OrderType> =>
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
    orderBy(['price', 'id'], ['desc', 'asc']),
    slice(0, ORDER_BOOK_LIMIT)
  )(formattedOrders);

  const sell = flow(
    filter(['type', 'sell']),
    orderBy(['price', 'id'], ['asc', 'asc']),
    slice(0, ORDER_BOOK_LIMIT)
  )(formattedOrders);

  return zip(buy, sell);
};

export const hasData = (state: State): boolean => Boolean(state.orders.data);
export const isOrdersLoading = (state: State): boolean => state.orders.loading;

export const error = (state: State): boolean => !state.orders.data && Boolean(state.orders.error);

export const maxOrderId = (state: State): number => {
  if (state.latestOrder) {
    return state.latestOrder.id;
  }
  return 1;
};

export const orders = (state: State): Orders<OrderType> => state.orders.data || [];
export const trades = (state: State): Trades => state.trades || [];
export const latestOrder = (state: State): ?Order<OrderType> => state.latestOrder;

export const formattedTrades = createSelector(
  trades,
  (trades: Trades): Trades => {
    const formattedTrades = trades.map(
      (trade: Trade, index: number): Trade => {
        const previousTrade = trades[index + 1];
        const color = previousTrade && previousTrade.price > trade.price ? red : green;
        return {
          ...trade,
          sellOrder: {
            ...trade.sellOrder,
            formattedPrice: formatPrice(trade.sellOrder.price)
          },
          buyOrder: {
            ...trade.buyOrder,
            formattedPrice: formatPrice(trade.buyOrder.price)
          },
          formattedPrice: formatPrice(trade.price),
          formattedTime: moment(trade.time).format('h:mm:ss a'),
          color
        };
      }
    );

    return slice(0, MARKET_TRADES_LIMIT, formattedTrades);
  }
);
