import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {orders, isOrdersLoading, hasData, error} from '../../state/selectors';
import RemoteData from '../components/remote-data';
import {requestOrders} from '../../state/orders/reducer';

export const OrderBookRemoteData = connect(
  createStructuredSelector({
    hasData,
    hasError: error,
    isLoading: isOrdersLoading
  })
)(RemoteData);

export const errorContainer = connect(
  null,
  {retryRequest: requestOrders}
);

export default connect(
  createStructuredSelector({
    orders,
    isOrdersLoading
  })
);
