import React from 'react';
import renderer from 'react-test-renderer';
import orders from '../orders-mock';
import OrderBook from '..';

describe('OrderBook', () => {
  const props = {orders};

  test('renders successfully with orders', () => {
    const expectedComponent = renderer.create(<OrderBook {...props} />);

    expect(expectedComponent).toMatchSnapshot();
  });

  test('renders successfully with empty orders', () => {
    const expectedComponent = renderer.create(<OrderBook orders={[]} />);

    expect(expectedComponent).toMatchSnapshot();
  });
});
