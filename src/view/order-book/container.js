import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {orders, isOrdersLoading} from '../../state/selectors';

const container = connect(
  createStructuredSelector({
    orders,
    isOrdersLoading
  })
);

export default container;
