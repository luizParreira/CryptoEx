import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {formattedTrades} from '../../state/selectors';

export default connect(
  createStructuredSelector({
    trades: formattedTrades
  })
);
