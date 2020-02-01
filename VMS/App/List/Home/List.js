/* eslint-disable react-native/no-inline-styles */
/* jshint esversion: 6 */
import React, {Component} from 'react';
import {StatusBar, Platform, DeviceEventEmitter} from 'react-native';
import {Screen, Color, StyleSheet, I18n} from '../../Common/index';
import {createStackNavigator} from 'react-navigation-stack';
import {
  Container,
  Header,
  Item,
  Input,
  Icon,
  Tab,
  Tabs,
  ScrollableTab,
  Button,
} from 'native-base';
import ListTabList from './ListTabList';
import {
  Search,
  SearchResult,
  SearchLocation,
  SearchWarning,
  SearchWarningDetails,
  SearchDetails,
  SearchHistory,
} from '../../Home/HomeIndex';

export class ListView extends Component {
  static navigationOptions = () => ({
    headerShown: false,
  });

  constructor(props) {
    super(props);
  }
  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <Header
          hasTabs
          searchBar
          rounded
          style={{borderBottomWidth: 0, backgroundColor: Color.jfl_37BCAD}}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={Color.jfl_37BCAD}
            translucent={false}
          />
          <Item style={ListStyle.searchBar}>
            <Icon name="ios-search" />
            <Input
              placeholder={I18n.t('list_search_title')}
              clearButtonMode="while-editing"
              editable={false}
              style={{fontSize: 14}}
            />
            <Button
              transparent
              style={{position: 'absolute', width: '100%', height: '100%'}}
              onPress={() => this._goToView('Search')}
            />
          </Item>
        </Header>
        <Tabs
          renderTabBar={() => <ScrollableTab />}
          tabBarBackgroundColor={Color.jfl_FFFFFF}
          tabBarUnderlineStyle={{height: 1, backgroundColor: Color.jfl_37BCAD}}>
          <Tab
            tabStyle={{backgroundColor: Color.jfl_FFFFFF}}
            activeTabStyle={{backgroundColor: Color.jfl_FFFFFF}}
            heading={I18n.t('list_all')}
            textStyle={{color: Color.jfl_3A3A3A}}
            activeTextStyle={{color: Color.jfl_37BCAD}}>
            <ListTabList status={0} navigation={navigation} />
          </Tab>
          <Tab
            tabStyle={{backgroundColor: Color.jfl_FFFFFF}}
            activeTabStyle={{backgroundColor: Color.jfl_FFFFFF}}
            heading={I18n.t('list_online')}
            textStyle={{color: Color.jfl_3A3A3A}}
            activeTextStyle={{color: Color.jfl_37BCAD}}>
            <ListTabList status={1} navigation={navigation} />
          </Tab>
          <Tab
            tabStyle={{backgroundColor: Color.jfl_FFFFFF}}
            activeTabStyle={{backgroundColor: Color.jfl_FFFFFF}}
            heading={I18n.t('list_offline')}
            textStyle={{color: Color.jfl_3A3A3A}}
            activeTextStyle={{color: Color.jfl_37BCAD}}>
            <ListTabList status={2} navigation={navigation} />
          </Tab>
        </Tabs>
      </Container>
    );
  }

  UNSAFE_componentWillMount() {
    // console.log('加载');
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
      if (Platform.OS == 'android') {
        StatusBar.setBackgroundColor(Color.jfl_37BCAD);
        StatusBar.setTranslucent(false);
      }
    });
    this._laguageLister = DeviceEventEmitter.addListener(
      'LanguageEvent',
      () => {
        this.forceUpdate();
      },
    );
  }

  componentWillUnmount() {
    this._navListener && this._navListener.remove();
    this._laguageLister && this._laguageLister.remove();
  }

  _goToView = (viewName, data = {}) => {
    const {navigate} = this.props.navigation;
    navigate(viewName, {data: data});
  };
}

const ListStyle = StyleSheet.create({
  searchBar: {
    marginLeft: 0,
    paddingLeft: 0,
    backgroundColor: Color.jfl_FFFFFF,
    color: Color.jfl_353535,
    padding: 0,
    fontSize: 14,
  },
  textStyle: {
    width: Screen.width,
    height: Screen.height * 0.25,
    justifyContent: 'center',
    textAlign: 'center',
    top: 50,
    backgroundColor: Color.jfl_D35454,
  },
  buttonStyle: {
    width: Screen.width,
    height: Screen.height * 0.25,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: Color.jfl_37BCAD,
  },
});

//“首页” - 导航栏
const ListScreen = createStackNavigator(
  {
    Home: {screen: ListView},
    Search: {screen: Search},
    SearchResult: {screen: SearchResult},
    SearchLocation: {screen: SearchLocation},
    SearchWarning: {screen: SearchWarning},
    SearchWarningDetails: {screen: SearchWarningDetails},
    SearchDetails: {screen: SearchDetails},
    SearchHistory: {screen: SearchHistory},
  },
  {
    headerMode: 'screen', //设置导航栏切换时的样式
    //设置一些默认属性
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Color.jfl_37BCAD,
        borderBottomWidth: 0, //ios上导航栏底部线条
      },
      headerTintColor: Color.jfl_FFFFFF,
      headerTitleStyle: {
        fontSize: 17, //导航栏字体
      },
      // headerBackTitle: null,
      headerBackTitleVisible: false,
      headerTransparent: false,
      headerTitleAlign: 'center', //居中
    },
  },
);
//只有在主页时，才显示下部tab
ListScreen.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};
export default ListScreen;
