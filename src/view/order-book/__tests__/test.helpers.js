import {zip} from 'lodash/fp';

const rawOrders = [
  {id: 568, type: 'buy', quantity: 6, price: 135, formattedPrice: '$ 135.0'},
  {id: 546, type: 'buy', quantity: 9, price: 228, formattedPrice: '$ 228.0'},
  {id: 547, type: 'sell', quantity: 5, price: 129, formattedPrice: '$ 129.0'},
  {id: 548, type: 'buy', quantity: 10, price: 200, formattedPrice: '$ 200.0'},
  {id: 549, type: 'sell', quantity: 16, price: 133, formattedPrice: '$ 133.0'},
  {id: 551, type: 'sell', quantity: 15, price: 222, formattedPrice: '$ 222.0'}
];

const buyOrders = rawOrders.filter(({type}) => type === 'buy');
const sellOrders = rawOrders.filter(({type}) => type === 'sell');

export const orders = zip(buyOrders, sellOrders);
