// @flow

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import {silver} from '../theme/colors';
import orders from './orders-mock';

const HeaderContainer = styled.View`
  height: 60px;
  border-bottom-width: 0.5px;
  border-bottom-color: ${silver};
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const HeaderTitle = styled.Text`
  font-size: 18px;
  color: ${silver};
  text-align: left;
  font-weight: bold;
`;

const TextContainer = styled.View`
  flex: 1;
  margin-left: 5px;
`;

const OrdersScrollView = styled.ScrollView`
  margin: 0 16px;
`;

const BuyOrderBackground = styled.View`
  height: 44px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;

const CellText = styled.Text`
  color: ${({color}) => color || 'black'};
  font-size: 18px;
`;

const CellContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

type CellProps = {
  quantity: number,
  price: number
};

type Sell = 'sell';
type Buy = 'buy';
type OrderType = Sell | Buy;

type Order = {|
  id: number,
  quantity: number,
  price: number,
  type: OrderType
|};

type Props = {
  orders?: Array<Order>
};

const BuyOrderCell = ({quantity, price}: CellProps) => (
  <BuyOrderBackground>
    <TextContainer>
      <CellText>{quantity}</CellText>
    </TextContainer>
    <CellText color="green">${price}</CellText>
  </BuyOrderBackground>
);

const SellOrderCell = ({quantity, price}: CellProps) => (
  <BuyOrderBackground>
    <TextContainer>
      <CellText color="red">${price}</CellText>
    </TextContainer>
    <CellText>{quantity}</CellText>
  </BuyOrderBackground>
);

const OrderBook = ({orders}: Props) => (
  <OrdersScrollView>
    <HeaderContainer>
      <TextContainer>
        <HeaderTitle>Buy</HeaderTitle>
      </TextContainer>
      <TextContainer>
        <HeaderTitle>Sell</HeaderTitle>
      </TextContainer>
    </HeaderContainer>
    {orders.map(([buy, sell]) => (
      <CellContainer key={`${buy.id}${sell.id}`}>
        <BuyOrderCell quantity={buy.quantity} price={buy.price} />
        <SellOrderCell quantity={sell.quantity} price={sell.price} />
      </CellContainer>
    ))}
  </OrdersScrollView>
);

const cellPropTypes = {
  quantity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired
};

BuyOrderCell.propTypes = cellPropTypes;
SellOrderCell.propTypes = cellPropTypes;

OrderBook.propTypes = {
  orders: PropTypes.array
};

OrderBook.defaultProps = {
  orders
};

export default OrderBook;
