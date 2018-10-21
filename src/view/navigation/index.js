import {createMaterialTopTabNavigator, createStackNavigator} from 'react-navigation';
import SmartOrderBook from '../order-book';
import SmartMarketTrades from '../market-trades';
import Trade from '../trade';
import {silver} from '../theme/colors';

const TradesTopTabNavigator = createMaterialTopTabNavigator(
  {
    OrderBookScreen: {
      screen: SmartOrderBook,
      navigationOptions: {
        title: 'Order Book'
      }
    },
    MarketTradesScreen: {
      screen: SmartMarketTrades,
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
    MarketScreen: {
      screen: TradesTopTabNavigator,
      path: '/market',
      navigationOptions: {
        headerTintColor: 'white',
        title: 'BTC / USD'
      }
    },
    TradeScreen: {
      screen: Trade,
      navigationOptions: {
        headerTintColor: 'white',
        title: 'Trade'
      }
    }
  },
  {
    headerMode: 'screen',
    cardStyle: {
      backgroundColor: 'white'
    },
    headerLayoutPreset: 'center',
    navigationOptions: {
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
);
