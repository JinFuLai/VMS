/* eslint-disable no-bitwise */
/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';
import {Image, DeviceEventEmitter, View} from 'react-native';
import {Color, I18n, storage, Loading, HttpUtils} from './Common/index';
import {
  createAppContainer,
  NavigationActions,
  StackActions,
} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

import HomeScreen from './Home/Home';
import ListSceen from './List/Home/List';
import MyScreen from './My/Home/My';
import LoginScreen from './Login/Login';
import GuideScreen from './Guide/Guide';
import Register from './Login/register';

export default class RootScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
    };
  }

  _goToView(name) {
    // call navigate for AppNavigator here:
    // this.navigator &&
    //   this.navigator.dispatch(NavigationActions.navigate({routeName: name}));
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: name})],
    });
    this.navigator.dispatch(resetAction);
  }

  render() {
    return (
      <AppContainer
        ref={nav => {
          this.navigator = nav;
        }}>
        {this.state.refresh ? <Loading /> : null}
      </AppContainer>
    );
  }

  /**设置当前应当显示的状态 */
  _setAppShowState = async () => {
    try {
      const isFirst = await this.getFirstLaunchState();
      if (isFirst && isFirst === true) {
        this._goToView('Guide');
      } else {
        try {
          const isLogin = await this.getLoginState();
          if (isLogin && isLogin === true) {
            this._goToView('Tab');
          } else {
            this._goToView('Login');
          }
        } catch (error) {
          console.log(error);
          this._goToView('Login');
        }
      }
    } catch (error) {
      this._goToView('Guide');
    }
  };

  /**判断是否第一次启动app */
  getFirstLaunchState() {
    var timeout_promise = new Promise(resolve => {
      storage
        .load({
          key: 'firstLaunch',
        })
        .then(firstOpen => {
          if ((firstOpen && info === true) | (firstOpen === null)) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(() => {
          resolve(true);
        });
    });
    var abortable_promise = Promise.race([timeout_promise]);
    return abortable_promise;
  }

  /**判断是否已经登录app */
  getLoginState() {
    var timeout_promise = new Promise((resolve, reject) => {
      storage
        .load({
          key: 'User',
        })
        .then(user => {
          if (user && user.token != null) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(() => {
          resolve(false);
        });
    });
    var abortable_promise = Promise.race([timeout_promise]);
    return abortable_promise;
  }

  /**获取并设置语言 */
  _getLauguage() {
    storage
      .load({key: 'language'})
      .then(language => {
        I18n.locale = language;
      })
      .catch(_ => {
        // I18n.locale = language;
      });
  }

  componentDidMount() {
    this._navListener = DeviceEventEmitter.addListener('RootGoToView', name => {
      this._goToView(name);
    });
    this._getLauguage();
    this._setAppShowState();
    this.getMapType();
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  /**获取app使用的地图类型 0-百度，1-谷歌 */
  getMapType() {
    this.setState({refresh: true});
    var _this = this;
    HttpUtils.getRequest(HttpUtils.AllUrl.System.MapType, false).then(
      response => {
        _this.setState({refresh: false});
        if (response.code === 200) {
          if (response.data) {
            DeviceEventEmitter.emit('MapType', response.data);
          }
        }
      },
    );
  }
}

const Tab = createMaterialBottomTabNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: () => ({
        tabBarLabel: I18n.t('tab_home'),
        tabBarIcon: ({focused}) => (
          <TabBarItem
            focused={focused}
            normalImage={require('./Source/Img/List/List/home.png')}
            selectedImage={require('./Source/Img/Home/Home/home.png')}
          />
        ),
      }),
    },
    ListScreen: {
      screen: ListSceen,
      navigationOptions: () => ({
        tabBarLabel: I18n.t('tab_list'),
        tabBarIcon: ({focused}) => (
          <TabBarItem
            focused={focused}
            normalImage={require('./Source/Img/Home/Home/list.png')}
            selectedImage={require('./Source/Img/List/List/list.png')}
          />
        ),
      }),
    },
    MyScreen: {
      screen: MyScreen,
      navigationOptions: () => ({
        tabBarLabel: I18n.t('tab_mine'),
        tabBarIcon: ({focused}) => (
          <TabBarItem
            focused={focused}
            normalImage={require('./Source/Img/Home/Home/me.png')}
            selectedImage={require('./Source/Img/My/My/me.png')}
          />
        ),
      }),
    },
  },
  {
    initialRouteName: 'HomeScreen',
    barStyle: {backgroundColor: Color.jfl_FFFFFF},
    activeColor: Color.jfl_37BCAD,
    inactiveColor: Color.jfl_353535,
  },
);

type Props = {
  normalImage: any,
  selectedImage: any,
  focused: boolean,
};
export class TabBarItem extends PureComponent<Props> {
  constructor(props) {
    super(props);
  }
  render() {
    let selectedImage = this.props.selectedImage
      ? this.props.selectedImage
      : this.props.normalImage;
    return (
      <Image
        source={this.props.focused ? selectedImage : this.props.normalImage}
        style={{resizeMode: 'contain', width: 25, height: 25}}
      />
    );
  }
}

class Nonecreen extends PureComponent {
  render() {
    return <View />;
  }
}

const AppNavigator = createStackNavigator(
  {
    None: {screen: Nonecreen},
    Guide: {screen: GuideScreen},
    Login: {screen: LoginScreen},
    Tab: {screen: Tab},
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

const AppContainer = createAppContainer(AppNavigator);
