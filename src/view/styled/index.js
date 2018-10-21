import styled from 'styled-components/native';
import {silver} from '../theme/colors';

export const HeaderContainer = styled.View`
  height: 60px;
  border-bottom-width: 0.5px;
  border-bottom-color: ${silver};
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const Container = styled.View`
  margin: 0 16px;
`;

export const HeaderTitle = styled.Text`
  font-size: 18px;
  color: ${silver};
  text-align: ${({textAlign}) => textAlign || 'left'};
  font-weight: bold;
`;

export const MarketTradesContainer = styled(HeaderContainer)`
  justify-content: space-between;
  ${({height}) => height && `height: ${height}px`};
`;

export const Text = styled.Text`
  color: ${({color}) => color || 'black'};
  font-size: 18px;
  ${({textAlign}) => textAlign && `text-align: ${textAlign}`};
`;

export const TextContainer = styled.View`
  flex: 1;
`;
