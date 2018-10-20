import React from 'react';
import {createMaterialTopTabNavigator, createStackNavigator} from 'react-navigation';
import {Text, View} from 'react-native';
import SmartOrderBook from '../order-book';
import {silver} from '../theme/colors';

const MarketTrades = () => (
  <View>
    <Text>Market Trades</Text>
  </View>
);

const TradesTopTabNavigator = createMaterialTopTabNavigator(
  {
    OrderBookScreen: {
      screen: SmartOrderBook,
      navigationOptions: {
        title: 'Order Book'
      }
    },
    MarketTradesScreen: {
      screen: MarketTrades,
      navigationOptions: {
        title: 'Market Trades'
      }
    }
  },
  {
    swipeEnabled: true,
    animationEnabled: true,
    optimizationsEnabled: true,
    lazy: true,
    tabBarOptions: {
      labelStyle: {
        fontSize: 20,
        color: 'black'
      },
      style: {
        backgroundColor: 'white',
        borderBottomColor: silver,
        borderBottomWidth: 1
      },
      indicatorStyle: {
        borderBottomColor: 'black',
        borderBottomWidth: 3
      }
    }
  }
);

export default createStackNavigator(
  {
    TradesScreen: {
      screen: TradesTopTabNavigator,
      path: '/trades',
      navigationOptions: {
        title: 'Trades',
        headerTitleStyle: {
          color: 'white',
          fontSize: 18,
          fontWeight: '500',
          alignSelf: 'center',
          textAlign: 'center',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 0
        },
        headerStyle: {
          shadowColor: 'black',
          borderBottomWidth: 0,
          backgroundColor: 'black',
          height: 67,
          flex: 1,
          alignItems: 'stretch'
        }
      }
    }
  },
  {
    headerMode: 'screen',
    cardStyle: {
      backgroundColor: 'white'
    },
    /**
     * Applying a View component for the headerRight option.
     * This is needed because the header title isn't well centered
     * See: https://github.com/react-navigation/react-navigation/issues/544#issuecomment-298618209
     */
    navigationOptions: {
      headerRight: <View />
    }
  }
);
