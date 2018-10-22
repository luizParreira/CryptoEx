import {mapValues} from 'lodash';
import {createSelector} from 'reselect';
import * as ordersSelectors from './orders/selectors';

const createSelectors = (rootSelector, selectorMap) =>
  mapValues(selectorMap, selector => createSelector(rootSelector, selector));

export const {
  orderBookOrders: orders,
  isOrdersLoading,
  formattedTrades,
  error,
  hasData
} = createSelectors(state => state.orders, ordersSelectors);
