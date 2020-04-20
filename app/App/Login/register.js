/* eslint-disable react-native/no-inline-styles */
/* jshint esversion: 6 */
import {
  Color,
  LoadingTool,
  Toast,
  HttpUtils,
  I18n,
  BaseComponent,
} from '../Common/index';
import {StatusBar, Keyboard} from 'react-native';
import {
  Container,
  Text,
  Button,
  Thumbnail,
  View,
  InputGroup,
  Input,
  Footer,
  Header,
  Left,
  Body,
  Right,
  Item,
} from 'native-base';
import React from 'react';
import {Style} from './LoginStyle';

export default class Register extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      username: null,
      password: null,
    };
  }

  render() {
    return (
      <Container style={{backgroundColor: Color.jfl_37BCAD}}>
        <Header
          hasSegment
          translucent
          transparent
          style={{position: 'relative'}}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={Color.jfl_37BCAD}
            translucent={true}
          />
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Thumbnail
                style={{width: 14, height: 20}}
                source={require('../Source/Img/My/Home_message/fanhui.png')}
              />
            </Button>
          </Left>
          <Body style={{borderBottomWidth: 0, alignItems: 'center'}}>
            <Text style={{color: 'white'}}>{I18n.t('register')}</Text>
          </Body>
          <Right />
        </Header>
        <View
          scrollEnabled={false}
          contentContainerStyle={{alignItems: 'center'}}
          style={{backgroundColor: Color.jfl_FFFFFF, marginBottom: 0, flex: 1}}>
          <Item style={Style.top} onPress={Keyboard.dismiss}>
            <Thumbnail
              square
              source={require('../Source/Img/My/Login/logo.png')}
              style={Style.logo}
            />
          </Item>
          <Item style={Style.bottom} onPress={Keyboard.dismiss}>
            <Thumbnail
              square
              source={require('../Source/Img/My/Login/bg_login.png')}
              style={Style.bottomBgImg}
            />
            <View style={Style.bottomInputV}>
              <InputGroup>
                <Thumbnail
                  square
                  source={require('../Source/Img/My/Login/icon_account.png')}
                  style={Style.inputImg}
                />
                <Input
                  placeholder={I18n.t('login_input_name')}
                  placeholderTextColor={Color.jfl_7E7C7C}
                  style={Style.inputText}
                  defaultValue={this.state.username}
                  onChangeText={text => {
                    this.setState({username: text});
                  }}
                />
              </InputGroup>
              <InputGroup>
                <Thumbnail
                  square
                  source={require('../Source/Img/My/Login/icon_password.png')}
                  style={Style.inputImg}
                />
                <Input
                  placeholder={I18n.t('login_input_psw')}
                  placeholderTextColor={Color.jfl_7E7C7C}
                  style={Style.inputText}
                  defaultValue={this.state.password}
                  onChangeText={text => {
                    this.setState({password: text});
                  }}
                />
              </InputGroup>
              <Button
                block
                rounded
                style={Style.loginBtn}
                onPress={() => {
                  this._clickRegisterBtn();
                }}>
                <Text>{I18n.t('register')}</Text>
              </Button>
            </View>
            <Footer style={Style.appBg}>
              <Text style={Style.appName}>{I18n.t('app_name')}</Text>
              <Text style={Style.appName}>V1.1.1</Text>
            </Footer>
          </Item>
        </View>
      </Container>
    );
  }

  UNSAFE_componentWillMount() {
    var params = this.props.navigation.state.params;
    if (params && params.username) {
      this.state.username = params.username;
    }
  }

  _goToView = view => {
    const {navigate} = this.props.navigation;
    navigate(view);
  };

  /**注册 */
  _clickRegisterBtn() {
    Keyboard.dismiss();
    var _this = this;
    if (this.state.username != null && this.state.password != null) {
      LoadingTool.startShowLoading();
      HttpUtils.postRequest(HttpUtils.AllUrl.User.Create, false, {
        username: this.state.username,
        password: this.state.password,
      }).then(response => {
        if (_this.unmount) {
          return;
        }
        LoadingTool.stopLoading();
        if (response) {
          if (response.code === 200) {
            Toast.show(I18n.t('register_success'));
            _this.props.navigation.goBack();
          } else {
            Toast.show(response.message);
          }
        }
      });
    } else {
      Toast.show('请输入用户名和密码');
    }
  }
}
