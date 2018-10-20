// @flow

import React from 'react';
import PropTypes from 'prop-types';
import {StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {addNavigationHelpers} from 'react-navigation';
import styled from 'styled-components/native';
import Navigator from './navigation';

const ContainerView = styled.View`
  height: 100%;
  width: 100%;
`;

type Props = {
  navigation: Object,
  dispatch: (action: any) => void,
  addListener: Function
};

console.disableYellowBox = true;

const App = ({navigation, dispatch, addListener}: Props) => (
  <ContainerView>
    <StatusBar barStyle="light-content" />
    <Navigator navigation={{dispatch, state: navigation, addListener}} />
  </ContainerView>
);

App.propTypes = {
  navigation: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  addListener: PropTypes.func.isRequired
};

export default connect(state => ({navigation: state.navigation}))(App);
