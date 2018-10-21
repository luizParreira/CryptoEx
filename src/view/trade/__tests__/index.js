import React from 'react';
import renderer from 'react-test-renderer';
import {TradeDetails} from '..';

describe('Trades', () => {
  const buyOrder = {id: 546, type: 'buy', quantity: 9, price: 228, formattedPrice: '$ 228.0'};
  const sellOrder = {id: 547, type: 'sell', quantity: 5, price: 129, formattedPrice: '$ 129.0'};
  const trade = {
    price: 10,
    quantity: 2,
    buyOrder,
    sellOrder,
    time: 12233444567,
    formattedPrice: '$ 10.0',
    formattedTime: '2:22:10 pm'
  };

  const props = {navigation: {state: {params: trade}}};

  test('renders successfully with trade', () => {
    const expectedComponent = renderer.create(<TradeDetails {...props} />);

    expect(expectedComponent).toMatchSnapshot();
  });
});
