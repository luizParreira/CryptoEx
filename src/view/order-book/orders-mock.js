import {zip} from 'lodash/fp';

const orders = [
  {id: 568, type: 'buy', quantity: 6, price: 135},
  {id: 546, type: 'buy', quantity: 9, price: 228},
  {id: 547, type: 'sell', quantity: 5, price: 129},
  {id: 548, type: 'buy', quantity: 10, price: 200},
  {id: 549, type: 'sell', quantity: 16, price: 133},
  {id: 551, type: 'sell', quantity: 15, price: 222}
];

const buyOrders = orders.filter(({type}) => type === 'buy');
const sellOrders = orders.filter(({type}) => type === 'sell');

export default zip(buyOrders, sellOrders);
