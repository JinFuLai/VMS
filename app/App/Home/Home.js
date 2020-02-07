/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StatusBar, Platform, DeviceEventEmitter} from 'react-native';
import {Container, Header, Input, Item, Icon, Button} from 'native-base';
import {createStackNavigator} from 'react-navigation-stack';
import {
  Color,
  StyleSheet,
  JFLMap,
  I18n,
  HttpUtils,
  Loading,
  BaseComponent,
} from '../Common/index';
import Search from './Search/Search';
import {
  SearchResult,
  SearchLocation,
  SearchWarning,
  SearchWarningDetails,
  SearchDetails,
  SearchHistory,
} from './HomeIndex';

class Home extends BaseComponent {
  static navigationOptions = () => ({
    headerShown: false,
  });

  constructor(props) {
    super(props);
    this.state = {...this.state};
    this._goToView = this._goToView.bind(this);
  }

  render() {
    return (
      <Container>
        <JFLMap
          ref={ref => {
            this.JFLMap = ref;
          }}
          alertVTopMargin={100}
          showsUserLocation={true}
          showLocationBtn={true}
          showRefreshDataBtn={true}
          style={{flex: 1}}
          onClickBottomBtnBlock={event => {
            let dic = event.nativeEvent;
            if (dic.index === 0) {
              //轨迹
              this._goToView('SearchHistory', dic.item);
            } else if (dic.index === 1) {
              //告警
              this._goToView('SearchWarningDetails', dic.item);
            } else if (dic.index === 2) {
              //详情
              this._goToView('SearchDetails', dic.item);
            }
          }}
          onClickRefreshDataBtn={event => {
            this.refreshInfo();
          }}>
          <Header
            noShadow
            searchBar
            style={{borderBottomWidth: 0, backgroundColor: Color.jfl_clear}}>
            <StatusBar
              barStyle="dark-content"
              translucent={false}
              backgroundColor={Color.jfl_FFFFFF}
            />
            <Item style={style.searchStyle}>
              <Icon name="ios-search" />
              <Input
                placeholder={I18n.t('list_search_title')}
                style={{fontSize: 14}}
                editable={false}
              />
              <Button
                transparent
                style={{
                  position: 'absolute',
                  backgroundColor: Color.jfl_clear,
                  width: '100%',
                  height: '100%',
                }}
                onPress={() => this._goToView('Search')}
              />
            </Item>
          </Header>
        </JFLMap>
        {this.state.refresh ? <Loading /> : null}
      </Container>
    );
  }

  _goToView = (viewName, data = {}) => {
    const {navigate} = this.props.navigation;
    navigate(viewName, {data: data});
  };

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor(Color.jfl_FFFFFF);
        // StatusBar.setTranslucent(true);
      }
    });
    this._laguageLister = DeviceEventEmitter.addListener(
      'LanguageEvent',
      () => {
        this.JFLMap.refreshLanguage();
        this.forceUpdate();
      },
    );
    this.refreshInfo();
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    this._navListener && this._navListener.remove();
    this._laguageLister && this._laguageLister.remove();
  }

  /**
   * 刷新数据
   * @param {*} showLoading 是否展示loading
   */
  refreshInfo(showLoading = true) {
    if (showLoading) {
      this.setState({refresh: true});
    }
    var _this = this;
    HttpUtils.getRequest(HttpUtils.AllUrl.Vehicle.All, true).then(response => {
      if (_this.unmount) {
        return;
      }
      _this.setState({refresh: false});
      if (response.code === 200) {
        if (response.data && response.data.length > 0) {
          _this.JFLMap && _this.JFLMap.removeAllMarks();
          _this.JFLMap && _this.JFLMap.setMarks(response.data);
        }
      } else {
        // Toast.show(response.message);
      }
      setTimeout(() => {
        _this.refreshInfo(false); //每隔10秒自动刷新
      }, 10000);
    });
  }
}

const style = StyleSheet.create({
  searchStyle: {
    backgroundColor: Color.jfl_FFFFFF,
    height: 40,
    width: '80%',
    borderRadius: 4,
    // overflow: 'hidden',
    //安卓标题居中
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowColor: Color.jfl_373737,
    shadowOpacity: 0.5,
  },
});

//“首页” - 导航栏
const HomeScreen = createStackNavigator(
  {
    Home: {screen: Home},
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
      headerTitleAlign: 'center', //居中
    },
  },
);
//只有在主页时，才显示下部tab
HomeScreen.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};
export default HomeScreen;
