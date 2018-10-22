// @flow

import React from 'react';
import {ScrollView} from 'react-native';
import {zip} from 'lodash/fp';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import type {Trade} from '../../state/orders/types.flow';
import {MarketTradesContainer, TextContainer, Text} from '../styled';
import {tradePropType} from '../market-trades';
import {red, green} from '../theme/colors';
import {generateKey} from '../helpers';

const Section = styled.View`
  justify-content: flex-start;
  flex: 1;
  margin: 16px;
`;

const TitleText = styled.Text`
  font-weight: bold;
  text-align: ${({textAlign}) => textAlign || 'left'};
  font-size: 20px;
  margin-bottom: 8px;
`;

type TradesSectionProps = {
  title: string,
  headers: Array<string>,
  textAlignments: Array<string>,
  textColors?: Array<string>,
  values: Array<Array<?string | ?number>>
};

type Props = {
  navigation: {state: {params: Trade}}
};

const TradeSection = ({title, headers, values, textAlignments, textColors}: TradesSectionProps) => (
  <Section>
    <TitleText textAlign="center">{title}</TitleText>
    <MarketTradesContainer>
      {zip(headers, textAlignments).map(([title, textAlign]) => (
        <TextContainer key={generateKey()}>
          <TitleText textAlign={textAlign}>{title}</TitleText>
        </TextContainer>
      ))}
    </MarketTradesContainer>
    {zip(values, textColors).map(([innerValues, color]) => (
      <MarketTradesContainer key={generateKey()} height="44">
        {zip(innerValues, textAlignments).map(([value, textAlign]) => (
          <TextContainer key={generateKey()}>
            <Text textAlign={textAlign} color={color}>
              {' '}
              {value}
            </Text>
          </TextContainer>
        ))}
      </MarketTradesContainer>
    ))}
  </Section>
);

export const TradeDetails = ({
  navigation: {
    state: {params: trade}
  }
}: Props) => (
  <ScrollView>
    <TradeSection
      title="Trade info"
      headers={['Time', 'Price', 'Amount']}
      values={[[trade.formattedTime, trade.formattedPrice, trade.quantity]]}
      textAlignments={['left', 'center', 'right']}
    />

    <TradeSection
      title="Orders info"
      headers={['Type', 'Price', 'Amount']}
      values={[
        [trade.buyOrder.type, trade.buyOrder.formattedPrice, trade.buyOrder.quantity],
        [trade.sellOrder.type, trade.sellOrder.formattedPrice, trade.sellOrder.quantity]
      ]}
      textAlignments={['left', 'center', 'right']}
      textColors={[green, red]}
    />
  </ScrollView>
);

TradeDetails.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({params: tradePropType})
  }).isRequired
};

TradeSection.propTypes = {
  title: PropTypes.string.isRequired,
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  textAlignments: PropTypes.arrayOf(PropTypes.string).isRequired,
  textColors: PropTypes.arrayOf(PropTypes.string),
  values: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
  ).isRequired
};

TradeSection.defaultProps = {
  textColors: []
};

export default TradeDetails;
