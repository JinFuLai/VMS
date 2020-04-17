/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
/* jshint esversion: 6 */
import React, {PureComponent} from 'react';
import {
  Screen,
  StyleSheet,
  Color,
  awaitWrap,
  storage,
  Loading,
  I18n,
  UserInfo,
} from '../../Common/index';
import {
  View,
  FlatList,
  Image,
  Text,
  StatusBar,
  Platform,
  DeviceEventEmitter,
} from 'react-native';
import {Container, Button} from 'native-base';
import MyHead from './MyHead';
import {createStackNavigator} from 'react-navigation-stack';
// import Button from 'react-native-button';
import MyListCell from './MyLIstCell';
import {
  Help,
  Law,
  Agreement,
  About,
  Setting,
  Language,
  ProfileScreen,
  ChangePhoneGetVerification,
  ChangePhoneCommit,
  ChangePswGetVerification,
  ChangePswCommit,
  Instructions,
  FeedBack,
  Message,
  SystemMessage,
} from '../MyIndex';

export class My extends PureComponent {
  static navigationOptions = ({navigation}) => ({
    headerLeft: () => <View />,
    headerTitle: () => (
      <Text
        style={{
          textAlign: 'center',
          color: Color.jfl_FFFFFF,
          fontSize: 17,
        }}>
        {I18n.t('my')}
      </Text>
    ),
    headerRight: () => (
      <Button
        transparent
        onPress={() => navigation.state.params.navigatePress()}>
        <Image
          source={require('../../Source/Img/My/My/weibiaoti103.png')}
          style={{width: 20, height: 20, marginRight: 15}}
        />
      </Button>
    ),
    headerStyle: {
      backgroundColor: Color.jfl_clear,
    },
    headerTransparent: true,
  });

  constructor() {
    super();
    this.state = {
      isLoading: false,
      user: null,
    };
    this._goToView = this._goToView.bind(this);
  }

  render() {
    var user = this.state.user;
    var data = this._getDefaultData();
    return (
      <Container
        style={{
          backgroundColor: Color.jfl_F7F7F7,
          width: '100%',
          height: '100%',
        }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={Color.jfl_37BCAD}
          translucent={false}
        />
        <View style={{alignItems: 'center'}}>
          <MyHead
            name={user ? user.username : ''}
            mark={user ? user.mark : ''}
            img={
              user
                ? user.photo
                  ? {uri: user.photo}
                  : require('../../Source/Img/My/My/touxiang.png')
                : null
            }
            style={style.headStyle}
            onPress={() =>
              this._goToView('Profile', {refresh: () => this.loadUserInfo()})
            }
          />
          <View style={style.listContentViewStyle}>
            <FlatList
              style={style.listStyle}
              extraData={this.state}
              data={data}
              renderItem={this._renderItem}
              keyExtractor={item => item.key}
              scrollEnabled={false}
              ItemSeparatorComponent={this._separator}
              refreshing={true} // 是否刷新 ，自带刷新控件
              onRefresh={this.refresh} // 刷新方法,写了此方法，下拉才会出现  刷新控件，使用此方法必须写 refreshing
            />
          </View>
        </View>
        {this.state.isLoading ? <Loading /> : null}
      </Container>
    );
  }

  loadUserInfo() {
    this.setState({user: UserInfo.user});
  }

  _getDefaultData = () => {
    return [
      {
        key: '0',
        icon: require('../../Source/Img/My/My/xiaoxi.png'),
        name: I18n.t('my_message'),
        viewname: 'Message',
      },
      {
        key: '1',
        icon: require('../../Source/Img/My/My/shuoming.png'),
        name: I18n.t('my_instructions'),
        viewname: 'Instructions',
      },
      {
        key: '2',
        icon: require('../../Source/Img/My/My/guanyuwomen.png'),
        name: I18n.t('my_about'),
        viewname: 'About',
      },
      {
        key: '3',
        icon: require('../../Source/Img/My/My/yijianfankui.png'),
        name: I18n.t('my_feedback'),
        viewname: 'FeedBack',
      },
      {
        key: '4',
        icon: require('../../Source/Img/My/My/bangzhu.png'),
        name: I18n.t('my_help'),
        viewname: 'Help',
      },
      {
        key: '5',
        icon: require('../../Source/Img/My/My/falv.png'),
        name: I18n.t('my_law'),
        viewname: 'Law',
      },
      {
        key: '6',
        icon: require('../../Source/Img/My/My/shuoming.png'),
        name: I18n.t('my_agreement'),
        viewname: 'Agreement',
      },
    ];
  };

  componentDidMount() {
    //在初始化render之后只执行一次，在这个方法内，可以访问任何组件，componentDidMount()方法中的子组件在父组件之前执行
    this.props.navigation.setParams({
      navigatePress: () => {
        this._goToView('Setting');
      },
    });
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
    this.loadUserInfo();
  }

  componentWillUnmount() {
    this._navListener && this._navListener.remove();
    this._laguageLister && this._laguageLister.remove();
  }

  _goToView = (view, data = null) => {
    const {navigate} = this.props.navigation;
    navigate(view, data);
  };

  _renderItem = info => {
    let item = info.item;
    return (
      <MyListCell
        img={item.icon}
        title={item.name}
        onPress={item.viewname ? () => this._goToView(item.viewname) : null}
      />
    );
  };

  _separator() {
    return <View style={{height: 0.5, backgroundColor: Color.jfl_DCDCDC}} />;
  }
}

const style = StyleSheet.create({
  headStyle: {
    width: Screen.width,
    height: 270,
    backgroundColor: Color.jfl_37BCAD,
  },
  listContentViewStyle: {
    width: Screen.width - 30,
    marginTop: -20,
    backgroundColor: Color.jfl_FFFFFF,
    borderRadius: 4,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowColor: Color.jfl_373737,
    shadowRadius: 4,
    shadowOpacity: 0.4,
  },
  listStyle: {
    borderRadius: 4,
  },
});
//“我的” - 导航栏
const MyScreen = createStackNavigator(
  {
    Home: {screen: My},
    Setting: {screen: Setting},
    Profile: {screen: ProfileScreen},
    Help: {screen: Help},
    Law: {screen: Law},
    Agreement: {screen: Agreement},
    About: {screen: About},
    Language: {screen: Language},
    ChangePhoneGetVerification: {screen: ChangePhoneGetVerification},
    ChangePhoneCommit: {screen: ChangePhoneCommit},
    ChangePswGetVerification: {screen: ChangePswGetVerification},
    ChangePswCommit: {screen: ChangePswCommit},
    Instructions: {screen: Instructions},
    FeedBack: {screen: FeedBack},
    Message: {screen: Message},
    SystemMessage: {screen: SystemMessage},
  },
  {
    headerMode: 'screen', //设置导航栏切换时的样式
    //设置一些默认属性
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Color.jfl_37BCAD,
        borderBottomWidth: 0, //ios上导航栏底部线条
        elevation: 0,
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
MyScreen.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};
export default MyScreen;
