/* eslint-disable react-native/no-inline-styles */
/* jshint esversion: 6 */
import React, {PureComponent} from 'react';
import {StatusBar} from 'react-native';
import {Color, I18n} from '../../Common/index';
import {
  Container,
  Header,
  Item,
  Tab,
  Tabs,
  Button,
  Thumbnail,
  Text,
} from 'native-base';
import MessageList from './MessageList';

export default class Message extends PureComponent {
  static navigationOptions = () => ({
    header: null,
  });

  constructor(props) {
    super(props);
    this.state = {
      defaultType: 0, //默认选中项
      editing: false, //是否是编辑状态
    };
  }
  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <Header
          hasSegment
          style={{borderBottomWidth: 0, backgroundColor: Color.jfl_37BCAD}}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={Color.jfl_37BCAD}
            translucent={false}
          />
          <Item style={{width: '100%', borderBottomWidth: 0}}>
            <Button
              transparent
              style={{width: 74}}
              onPress={() => this.props.navigation.goBack()}>
              <Thumbnail
                style={{width: 14, height: 20, marginRight: 20}}
                source={require('../../Source/Img/My/Home_message/fanhui.png')}
              />
            </Button>
            <Tabs
              tabBarBackgroundColor={Color.jfl_37BCAD}
              tabBarUnderlineStyle={{
                height: 0,
                backgroundColor: Color.jfl_37BCAD,
              }}
              tabContainerStyle={{
                borderBottomWidth: 0,
                height: '100%',
                borderColor: Color.jfl_FFFFFF,
                borderWidth: 1,
                borderBottomWidth: 2,
                borderTopWidth: 2,
                borderRadius: 2,
              }}
              initialPage={this.state.defaultType && this.state.defaultType}
              style={{height: 30}}
              onChangeTab={info => {
                if (info.i != null) {
                  this.MessageList.changeType(info.i);
                  this.setState({editing: false});
                }
              }}>
              {this.returnHeaderTab(I18n.t('my_message_warn'))}
              {this.returnHeaderTab(I18n.t('my_message_system'))}
              {/* {this.returnHeaderTab(I18n.t('my_message_friend'))} */}
            </Tabs>
            <Button
              transparent
              onPress={() => {
                this.MessageList.changeEditing(!this.state.editing);
                this.setState({editing: !this.state.editing});
              }}>
              <Text
                style={{
                  width: 74,
                  height: 20,
                  color: Color.jfl_FFFFFF,
                  fontSize: 14,
                  textAlign: 'center',
                }}>
                {this.state.editing ? I18n.t('cancel') : I18n.t('edit')}
              </Text>
            </Button>
          </Item>
        </Header>
        <MessageList
          ref={ref => (this.MessageList = ref)}
          navigation={navigation}
        />
      </Container>
    );
  }

  returnHeaderTab(name) {
    return (
      <Tab
        tabStyle={{
          backgroundColor: Color.jfl_37BCAD,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderColor: Color.jfl_FFFFFF,
        }}
        activeTabStyle={{backgroundColor: Color.jfl_FFFFFF}}
        heading={name}
        textStyle={{color: Color.jfl_FFFFFF, fontSize: 15}}
        activeTextStyle={{color: Color.jfl_37BCAD}}
      />
    );
  }
}
