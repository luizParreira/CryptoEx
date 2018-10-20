// @flow

import React from 'react';
import {ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import type {OrderBookOrders} from '../../state/orders/types.flow';
import {silver} from '../theme/colors';
import container from './container';

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

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  min-height: 100px;
`;

type CellProps = {
  quantity: number,
  price: ?string
};

type Props = {
  orders: OrderBookOrders,
  isOrdersLoading: boolean
};

const BuyOrderCell = ({quantity, price}: CellProps) => (
  <BuyOrderBackground>
    <TextContainer>
      <CellText>{quantity}</CellText>
    </TextContainer>
    <CellText color="green">{price}</CellText>
  </BuyOrderBackground>
);

const SellOrderCell = ({quantity, price}: CellProps) => (
  <BuyOrderBackground>
    <TextContainer>
      <CellText color="red">{price}</CellText>
    </TextContainer>
    <CellText>{quantity}</CellText>
  </BuyOrderBackground>
);

export const OrderBook = ({orders, isOrdersLoading}: Props) => (
  <OrdersScrollView>
    <HeaderContainer>
      <TextContainer>
        <HeaderTitle>Buy</HeaderTitle>
      </TextContainer>
      <TextContainer>
        <HeaderTitle>Sell</HeaderTitle>
      </TextContainer>
    </HeaderContainer>
    {isOrdersLoading ? (
      <LoadingContainer>
        <ActivityIndicator />
      </LoadingContainer>
    ) : (
      orders.map(
        ([buy, sell]) =>
          buy &&
          sell && (
            <CellContainer key={`${buy.id}${sell.id}`}>
              <BuyOrderCell quantity={buy.quantity} price={buy.formattedPrice} />
              <SellOrderCell quantity={sell.quantity} price={sell.formattedPrice} />
            </CellContainer>
          )
      )
    )}
  </OrdersScrollView>
);

const cellPropTypes = {
  quantity: PropTypes.number.isRequired,
  price: PropTypes.string.isRequired
};

BuyOrderCell.propTypes = cellPropTypes;
SellOrderCell.propTypes = cellPropTypes;

OrderBook.propTypes = {
  orders: PropTypes.array.isRequired,
  isOrdersLoading: PropTypes.bool.isRequired
};

export default container(OrderBook);
