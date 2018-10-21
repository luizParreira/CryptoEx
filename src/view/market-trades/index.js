// @flow

import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, TouchableOpacity} from 'react-native';
import type {Trades} from '../../state/orders/types.flow';
import {Container, HeaderTitle, MarketTradesContainer, TextContainer, Text} from '../styled';
import container from './container';
import {orderPropType} from '../order-book';
import {generateKey} from '../helpers';

type Props = {
  trades: Trades,
  navigation: {navigate: (string, Object) => void}
};

export const MarketTrades = ({trades, navigation}: Props) => (
  <ScrollView>
    <Container>
      <MarketTradesContainer>
        <TextContainer>
          <HeaderTitle textAlign="left">Time</HeaderTitle>
        </TextContainer>
        <TextContainer>
          <HeaderTitle textAlign="center">Price</HeaderTitle>
        </TextContainer>
        <TextContainer>
          <HeaderTitle textAlign="right">Amount</HeaderTitle>
        </TextContainer>
      </MarketTradesContainer>

      {trades.map(trade => (
        <TouchableOpacity
          key={generateKey()}
          onPress={() => navigation.navigate('TradeScreen', trade)}
        >
          <MarketTradesContainer>
            <TextContainer>
              <Text textAlign="left">{trade.formattedTime}</Text>
            </TextContainer>
            <TextContainer>
              <Text textAlign="center" color={trade.color}>
                {trade.formattedPrice}
              </Text>
            </TextContainer>
            <TextContainer>
              <Text textAlign="right">{trade.quantity}</Text>
            </TextContainer>
          </MarketTradesContainer>
        </TouchableOpacity>
      ))}
    </Container>
  </ScrollView>
);

export const tradePropType = PropTypes.shape({
  price: PropTypes.number,
  amount: PropTypes.number,
  sellOrder: orderPropType,
  buyOrder: orderPropType,
  time: PropTypes.number,
  formattedTime: PropTypes.string,
  formattedPrice: PropTypes.string
});

MarketTrades.propTypes = {
  trades: PropTypes.arrayOf(tradePropType).isRequired,
  navigation: PropTypes.shape({navigate: PropTypes.func}).isRequired
};

export default container(MarketTrades);
