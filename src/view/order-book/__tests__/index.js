import React from 'react';
import renderer from 'react-test-renderer';
import {orders} from './test.helpers';
import {OrderBook} from '..';

describe('OrderBook', () => {
  const isOrdersLoading = false;
  const props = {orders, isOrdersLoading};

  test('renders successfully with orders', () => {
    const expectedComponent = renderer.create(<OrderBook {...props} />);

    expect(expectedComponent).toMatchSnapshot();
  });

  test('renders successfully with empty orders', () => {
    const expectedComponent = renderer.create(<OrderBook orders={[]} isOrdersLoading={false} />);

    expect(expectedComponent).toMatchSnapshot();
  });

  test('renders successfully when loading', () => {
    const expectedComponent = renderer.create(<OrderBook isOrdersLoading orders={orders} />);

    expect(expectedComponent).toMatchSnapshot();
  });
});
