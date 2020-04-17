/* eslint-disable no-bitwise */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
/* jshint esversion: 6 */
import {
  Color,
  Loading,
  storage,
  Toast,
  HttpUtils,
  I18n,
  BaseComponent,
  UserInfo,
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
  Body,
  Item,
} from 'native-base';
import React from 'react';
import {Style} from './LoginStyle';

export class LoginScreen extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      username: null,
      password: null,
      isRefresh: false,
    };
  }

  render() {
    return (
      <Container style={{backgroundColor: Color.jfl_37BCAD}}>
        <Header translucent transparent style={{position: 'relative'}}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={Color.jfl_37BCAD}
            translucent={true}
          />
          <Body style={{borderBottomWidth: 0, alignItems: 'center'}}>
            <Text style={{color: 'white'}}>{I18n.t('login')}</Text>
          </Body>
        </Header>
        <View
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
                  this._clickLoginBtn();
                }}>
                <Text>{I18n.t('login')}</Text>
              </Button>
              <View style={Style.forgetBtn}>
                <Button
                  transparent
                  onPress={() => {
                    this._goToView('Register');
                  }}>
                  <Text style={Style.forgetText}>
                    {I18n.t('login_forgot_registor')}
                  </Text>
                </Button>
                <Button transparent onPress={() => {}}>
                  <Text style={Style.forgetText}>
                    {I18n.t('login_forgot_psw')}
                  </Text>
                </Button>
              </View>
            </View>
            <Footer style={Style.appBg}>
              <Text style={Style.appName}>{I18n.t('app_name')}</Text>
              <Text style={Style.appName}>V1.1.1</Text>
            </Footer>
          </Item>
        </View>
        {this.state.isRefresh ? <Loading /> : null}
      </Container>
    );
  }

  _goToView = (view, data = null) => {
    const {navigate} = this.props.navigation;
    navigate(view, data);
  };

  _clickLoginBtn() {
    Keyboard.dismiss();
    var _this = this;
    if (this.state.username != null && this.state.password != null) {
      this.setState({isRefresh: true});
      HttpUtils.postRequest(HttpUtils.AllUrl.User.Login, false, {
        username: this.state.username,
        password: this.state.password,
      }).then(response => {
        if (_this.unmount) {
          return;
        }
        _this.setState({isRefresh: false});
        if (response) {
          if ((response.code == 200) & (response.data != null)) {
            UserInfo.saveUserInfo(response.data);
            _this._goToView('Tab');
          } else if (response.code === 211) {
            _this._goToView('Register', {username: _this.state.username});
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

export default LoginScreen;
