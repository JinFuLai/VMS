import {createAppContainer} from 'react-navigation';

import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from './Login';
import Register from './register';

const LoginNavigator = createStackNavigator(
  {
    Login: {screen: LoginScreen},
    Register: {
      screen: Register,
      navigationOptions: ({navigation}) => ({
        gestureEnabled: true,
      }),
    },
  },
  {
    defaultNavigationOptions: {
      headerBackTitle: null,
      headerTintColor: '#333333',
      showIcon: true,
      headerTransparent: true,
      headerShown: false,
      gestureEnabled: false,
    },
  },
);

const LoginModal = createAppContainer(LoginNavigator);

export default LoginModal;