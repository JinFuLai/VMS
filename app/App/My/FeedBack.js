/* eslint-disable react-native/no-inline-styles */
/* jshint esversion: 6 */
import React, {PureComponent} from 'react';
import {
  Color,
  CommonStyle,
  LoadingTool,
  Toast,
  HttpUtils,
  I18n,
  BaseComponent,
} from '../Common/index';
import {Container, Item, Text, Input, Textarea} from 'native-base';

export default class FeedBack extends BaseComponent {
  static navigationOptions = _ => ({
    title: I18n.t('my_feedback'),
  });

  constructor(props) {
    super(props);
    this.state = {
      ...this.state, //共用父类属性
    };
  }

  render() {
    return (
      <Container style={{backgroundColor: Color.jfl_F7F7F7}}>
        <Item underline style={{height: 40.5, borderBottomWidth: 0}}>
          <Text
            style={{
              paddingHorizontal: 15.5,
              fontSize: 14,
              color: Color.jfl_4F4F4F,
            }}>
            {I18n.t('my_feedback_tip')}
          </Text>
        </Item>
        <Item
          style={{
            backgroundColor: Color.jfl_FFFFFF,
            // height: 132,
            borderBottomWidth: 0,
          }}>
          <Textarea
            style={{
              marginHorizontal: 5,
              marginVertical: 10,
              fontSize: 13,
              height: 110,
            }}
            placeholder={I18n.t('my_feedback_input')}
            defaultValue={this.state.feedback}
            onChangeText={text => {
              this.state.feedback = text;
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
          onPress={() => this._onClickCommitBtn()}>
          <Text
            style={{
              flex: 1,
              margin: 0,
              textAlign: 'center',
              color: Color.jfl_37BCAD,
              fontSize: 15,
            }}>
            {I18n.t('commit')}
          </Text>
        </Item>
      </Container>
    );
  }

  _goToView = (viewName, data = null) => {
    const {navigate} = this.props.navigation;
    navigate(viewName, data);
  };

  /**提交反馈意见 */
  _onClickCommitBtn() {
    if (this.state.feedback) {
      LoadingTool.startShowLoading();
      var _this = this;
      HttpUtils.postRequest(HttpUtils.AllUrl.User.Feedback, true, {
        content: this.state.feedback,
      }).then(response => {
        if (_this.unmount) {
          return;
        }
        LoadingTool.stopLoading();
        if (response && response.code === 200) {
          //   this.props.navigation.goBack();
          _this.setState({feedback: null});
          Toast.show('提交成功');
        } else {
          Toast.show(response.message);
        }
      });
    } else {
      Toast.show(I18n.t('my_feedback_input'));
    }
  }
}
