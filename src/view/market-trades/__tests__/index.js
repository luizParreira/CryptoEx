import React from 'react';
import renderer from 'react-test-renderer';
import {MarketTrades} from '..';

describe('MarketTrades', () => {
  const navigation = {
    navigate: jest.fn()
  };

  const buyOrder = {id: 546, type: 'buy', quantity: 9, price: 228, formattedPrice: '$ 228.0'};
  const sellOrder = {id: 547, type: 'sell', quantity: 5, price: 129, formattedPrice: '$ 129.0'};
  const trades = [
    {
      price: 10,
      quantity: 2,
      buyOrder,
      sellOrder,
      time: 12233444567,
      formattedPrice: '$ 10.0',
      formattedTime: '2:22:10 pm'
    },
    {
      price: 10,
      quantity: 2,
      buyOrder,
      sellOrder,
      time: 12233444567,
      formattedPrice: '$ 10.0',
      formattedTime: '2:22:10 pm'
    }
  ];

  const props = {trades, navigation};

  test('renders successfully with trades', () => {
    const expectedComponent = renderer.create(<MarketTrades {...props} />);

    expect(expectedComponent).toMatchSnapshot();
  });

  test('renders successfully with empty trades', () => {
    const expectedComponent = renderer.create(<MarketTrades {...{...props, trades: []}} />);

    expect(expectedComponent).toMatchSnapshot();
  });
});
