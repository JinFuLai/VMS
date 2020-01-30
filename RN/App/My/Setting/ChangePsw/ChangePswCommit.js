/* eslint-disable react-native/no-inline-styles */
/**修改手机号-提交 */
import React, {PureComponent} from 'react';
import {
  Color,
  CommonStyle,
  Loading,
  Toast,
  HttpUtils,
  I18n,
  BaseComponent,
} from '../../../Common/index';
import {Container, Text, Item, Input} from 'native-base';
import PropTypes from 'prop-types';

export default class ChangePswCommit extends BaseComponent {
  static navigationOptions = () => ({
    headerTitle: (
      <Text style={CommonStyle.navGreenStyle}>
        {I18n.t('my_setting_change_password')}
      </Text>
    ),
  });

  constructor(props) {
    super(props);
    this.state = {
      // isRefresh: false,
    };
  }

  render() {
    return (
      <Container style={{backgroundColor: Color.jfl_F7F7F7}}>
        <Item underline style={{height: 40.5, borderBottomWidth: 0}}>
          <Text
            style={{
              paddingHorizontal: 15.5,
              fontSize: 12,
              color: Color.jfl_37BCAD,
            }}>
            {I18n.t('my_setting_get_verification') +
              ' > ' +
              I18n.t('my_setting_set_NewPsw')}
          </Text>
        </Item>
        <Item style={{backgroundColor: Color.jfl_FFFFFF, height: 51}}>
          <Input
            style={{marginHorizontal: 15.5, fontSize: 13}}
            secureTextEntry
            placeholder={I18n.t('my_setting_input_newPas')}
            onChangeText={text => {
              this.state.password = text;
            }}
          />
        </Item>
        <Item
          style={{
            backgroundColor: Color.jfl_FFFFFF,
            height: 51,
            borderBottomWidth: 0,
          }}>
          <Input
            style={{marginHorizontal: 15.5, fontSize: 13}}
            secureTextEntry
            placeholder={I18n.t('my_setting_confirm_newPas')}
            onChangeText={text => {
              this.state.confirm = text;
            }}
          />
        </Item>
        <Item
          style={{
            marginTop: 12.5,
            backgroundColor: Color.jfl_FFFFFF,
            height: 43.5,
            borderBottomWidth: 0,
          }}
          onPress={() => this._onClickFinishBtn()}>
          <Text
            style={{
              flex: 1,
              margin: 0,
              textAlign: 'center',
              color: Color.jfl_37BCAD,
              fontSize: 15,
            }}>
            {I18n.t('finish')}
          </Text>
        </Item>
        {this.state.isRefresh ? <Loading /> : null}
      </Container>
    );
  }

  _goToView = (viewName, data = null) => {
    const {navigate} = this.props.navigation;
    navigate(viewName, data);
  };

  _onClickFinishBtn() {
    if (this.props.navigation.state.params.verification) {
      if (
        this.state.password &&
        this.state.confirm &&
        this.state.password === this.state.confirm
      ) {
        this.setState({isRefresh: true});
        var _this = this;
        HttpUtils.postRequest(HttpUtils.AllUrl.User.ChangePassword, true, {
          verification: this.props.navigation.state.params.verification,
          password: this.state.password,
          confirm: this.state.confirm,
        }).then(response => {
          if (_this.unmount) {
            return;
          }
          this.setState({isRefresh: false});
          if (response && response.code === 200) {
            _this._goToView('Setting');
          } else {
            Toast.show(response.message);
          }
        });
      } else {
        Toast.show('请输入密码,并确认输入一致');
      }
    } else {
      Toast.show('尚未获取到验证码');
    }
  }
}
