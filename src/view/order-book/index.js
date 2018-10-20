// @flow

import React from 'react';
import {ActivityIndicator, ScrollView} from 'react-native';
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

const OrdersBookContainer = styled.View`
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
  quantity?: number,
  price?: string
};

type Props = {
  orders?: OrderBookOrders,
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
  <ScrollView>
    <OrdersBookContainer>
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
        (orders || []).map(([buy, sell]) => (
          <CellContainer key={`${buy && buy.id}${sell && sell.id}`}>
            <BuyOrderCell quantity={buy && buy.quantity} price={buy && buy.formattedPrice} />
            <SellOrderCell quantity={sell && sell.quantity} price={sell && sell.formattedPrice} />
          </CellContainer>
        ))
      )}
    </OrdersBookContainer>
  </ScrollView>
);

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
  orders: PropTypes.array,
  isOrdersLoading: PropTypes.bool.isRequired
};

OrderBook.defaultProps = {
  orders: null
};

export default container(OrderBook);
