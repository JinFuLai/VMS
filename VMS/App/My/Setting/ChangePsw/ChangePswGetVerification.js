/* eslint-disable react-native/no-inline-styles */
/**修改密码-获取验证码 */
import React, {PureComponent} from 'react';
import {Color, CommonStyle, Toast, I18n} from '../../../Common/index';
import {Container, Text, Item, Input, Button} from 'native-base';

export default class ChangePswGetVerification extends PureComponent {
  static navigationOptions = () => ({
    headerTitle: () => (
      <Text style={CommonStyle.navGreenStyle}>
        {I18n.t('my_setting_change_password')}
      </Text>
    ),
  });

  constructor(props) {
    super(props);
    this.state = {
      isRefresh: true,
    };
  }

  static propTypes = {};

  render() {
    return (
      <Container style={{backgroundColor: Color.jfl_F7F7F7}}>
        <Item underline style={{height: 40.5, borderBottomWidth: 0}}>
          <Text
            style={{
              paddingLeft: 15.5,
              fontSize: 12,
              color: Color.jfl_37BCAD,
            }}>
            {I18n.t('my_setting_get_verification')}
          </Text>
          <Text
            style={{
              paddingRight: 15.5,
              fontSize: 12,
              color: Color.jfl_545454,
            }}>
            {' > ' + I18n.t('my_setting_set_NewPsw')}
          </Text>
        </Item>
        <Item
          style={{
            backgroundColor: Color.jfl_FFFFFF,
            height: 51,
            borderBottomWidth: 0,
          }}>
          <Input
            style={{marginHorizontal: 15.5, fontSize: 13}}
            placeholder={I18n.t('my_setting_input_verification')}
            maxLength={6}
            onChangeText={text => {
              this.state.verification = text;
            }}
            keyboardType="numeric"
          />
          <Button
            rounded
            style={{
              backgroundColor: Color.jfl_37BCAD,
              marginRight: 15.5,
              height: 25,
            }}>
            <Text style={{fontSize: 13, color: Color.jfl_FFFFFF}}>
              {I18n.t('my_setting_get_verification')}
            </Text>
          </Button>
        </Item>
        <Item
          style={{
            marginTop: 12.5,
            backgroundColor: Color.jfl_FFFFFF,
            height: 43.5,
            borderBottomWidth: 0,
          }}
          onPress={() => this._onClickNextBtn()}>
          <Text
            style={{
              flex: 1,
              margin: 0,
              textAlign: 'center',
              color: Color.jfl_37BCAD,
              fontSize: 15,
            }}>
            {I18n.t('next')}
          </Text>
        </Item>
      </Container>
    );
  }

  _goToView = (viewName, data = null) => {
    const {navigate} = this.props.navigation;
    navigate(viewName, data);
  };

  _onClickNextBtn() {
    if (this.state.verification && this.state.verification.length === 6) {
      this._goToView('ChangePswCommit', {
        verification: this.state.verification,
      });
    } else {
      Toast.show('请输入正确的验证码');
    }
  }
}
