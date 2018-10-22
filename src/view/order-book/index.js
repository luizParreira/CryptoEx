// @flow

import React from 'react';
import {ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import type {OrderBookOrders} from '../../state/orders/types.flow';
import container, {OrderBookRemoteData} from './container';
import {HeaderContainer, Container, HeaderTitle, Text} from '../styled';
import {green, red} from '../theme/colors';
import {generateKey} from '../helpers';
import ErrorComponent from './error';

const TextContainer = styled.View`
  flex: 1;
  margin-left: 5px;
`;

const OrderBackground = styled.View`
  height: 44px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;

const CellContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

type CellProps = {
  quantity?: number,
  price?: string
};

type Props = {
  orders?: OrderBookOrders
};

const BuyOrderCell = ({quantity, price}: CellProps) => (
  <OrderBackground>
    <TextContainer>
      <Text>{quantity}</Text>
    </TextContainer>
    <Text color={green}>{price}</Text>
  </OrderBackground>
);

const SellOrderCell = ({quantity, price}: CellProps) => (
  <OrderBackground>
    <TextContainer>
      <Text color={red}>{price}</Text>
    </TextContainer>
    <Text>{quantity}</Text>
  </OrderBackground>
);

export const OrderBook = ({orders}: Props) => (
  <ScrollView>
    <Container>
      <HeaderContainer>
        <TextContainer>
          <HeaderTitle>Buy</HeaderTitle>
        </TextContainer>
        <TextContainer>
          <HeaderTitle>Sell</HeaderTitle>
        </TextContainer>
      </HeaderContainer>
      {(orders || []).map(([buy, sell]) => (
        <CellContainer key={generateKey()}>
          <BuyOrderCell quantity={buy && buy.quantity} price={buy && buy.formattedPrice} />
          <SellOrderCell quantity={sell && sell.quantity} price={sell && sell.formattedPrice} />
        </CellContainer>
      ))}
    </Container>
  </ScrollView>
);

export const orderPropType = PropTypes.shape({
  id: PropTypes.number,
  price: PropTypes.number,
  amount: PropTypes.number,
  type: PropTypes.oneOf(['buy', 'sell'])
});

const cellPropTypes = {
  quantity: PropTypes.number,
  price: PropTypes.string
};

const cellDefaultPropTypes = {
  quantity: null,
  price: null
};

BuyOrderCell.propTypes = cellPropTypes;
SellOrderCell.propTypes = cellPropTypes;

BuyOrderCell.defaultProps = cellDefaultPropTypes;
SellOrderCell.defaultProps = cellDefaultPropTypes;

OrderBook.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.arrayOf(orderPropType))
};

OrderBook.defaultProps = {
  orders: null
};

const SuccessOrderBook = container(OrderBook);

export default () => <OrderBookRemoteData Success={SuccessOrderBook} Failure={ErrorComponent} />;
