// @flow

import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import {Container, Text} from '../styled';
import {red} from '../theme/colors';
import Button from 'apsl-react-native-button'; // eslint-disable-line import/default
import {errorContainer} from './container';

type ErrorProps = {
  retryRequest: void => void
};

const FlexContainer = styled(Container)`
  flex: 1;
  height: 300px;
  margin-top: 30px;
`;

const RetryButton = styled(Button)`
  border-color: ${red};
  margin-left: auto;
  margin-right: auto;
  border-radius: 5px;
  margin-top: 18px;
  height: 40px;
  width: 65%;
`;

const ErrorContainer = styled.View`
  border-width: 0.5px;
  border-radius: 6px;
  border-color: ${red};
  padding-top: 10px;
`;

const Title = styled.Text`
  color: ${red};
  font-size: 20px;
  text-align: center;
`;

const ErrorComponent = ({retryRequest}: ErrorProps) => (
  <FlexContainer>
    <ErrorContainer>
      <View>
        <Title>Sorry, we coud not fetch the orders :(</Title>
      </View>
      <RetryButton onPress={retryRequest}>
        <Text color={red}>Click to retry</Text>
      </RetryButton>
    </ErrorContainer>
  </FlexContainer>
);

ErrorComponent.propTypes = {
  retryRequest: PropTypes.func.isRequired
};

export default errorContainer(ErrorComponent);
