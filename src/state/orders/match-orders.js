import type {State, Orders, Buy, Sell, Trades} from './types.flow';
import {orderBy, remove, forEach, slice} from 'lodash/fp';
import {loop, Cmd} from 'redux-loop';
import * as select from './selectors';

const matchOrders = (buyOrders: Orders<Buy>, sellOrders: Orders<Sell>, allTrades: Trades) => {
  let trades = allTrades;
  let buys = buyOrders;
  let sells = sellOrders;
  let matchedOrders = false;

  forEach(sell => {
    forEach(buy => {
      if (buy.price >= sell.price) {
        const price = (buy.price + sell.price) / 2.0;
        const trade = {price, time: Date.now(), buyOrder: buy, sellOrder: sell};
        const previousSells = sells;
        const previousBuys = buys;
        if (buy.quantity === sell.quantity) {
          sells = remove(value => value.id === sell.id, previousSells);
          buys = remove(value => value.id === buy.id, previousBuys);
          trades.push({...trade, quantity: sell.quantity});
        } else if (sell.quantity > buy.quantity) {
          sells = remove(value => value.id === sell.id, previousSells);
          buys = remove(value => value.id === buy.id, previousBuys);
          sells.push({...sell, quantity: sell.quantity - buy.quantity});
          trades.push({...trade, quantity: buy.quantity});
        } else {
          sells = remove(value => value.id === sell.id, previousSells);
          buys = remove(value => value.id === buy.id, previousBuys);
          buys.push({...buy, quantity: buy.quantity - sell.quantity});
          trades.push({...trade, quantity: sell.quantity});
        }
        matchedOrders = true;
      }
      // Already matched this order
      // Move on to next sell order
      if (matchedOrders) {
        return false;
      }
    }, buys);
  }, sells);

  // Make sure trades is as big as 50
  const orderedTrades = orderBy(['time'], ['desc'], trades);
  trades = slice(0, 50, orderedTrades);
  const orders = [...buys, ...sells];
  return {trades, orders};
};

export default (state: State) => {
  const orders = select.orders(state);

  if (orders.length === 0) {
    return loop(state, Cmd.none);
  }

  const trades = select.trades(state);

  const buy = orders.filter(({type}) => type === 'buy');
  const sell = orders.filter(({type}) => type === 'sell');

  const sellOrders = orderBy(['price', 'id'], ['asc', 'asc'], sell);
  const buyOrders = orderBy(['price', 'id'], ['desc', 'asc'], buy);

  const {orders: matchedOrders, trades: matchedTrades} = matchOrders(buyOrders, sellOrders, trades);

  return loop(
    {...state, orders: {...state.orders, data: matchedOrders}, trades: matchedTrades},
    Cmd.none
  );
};
