/* eslint-disable react-native/no-inline-styles */
/* jshint esversion: 6 */
import React, {PureComponent} from 'react';
import {Container, Content, Text, View} from 'native-base';
import {I18n, Color, StyleSheet} from '../../Common/index';

export default class SystemMessage extends PureComponent {
  static navigationOptions = () => ({
    title: I18n.t('my_message_system_details'),
  });
  render() {
    return (
      <Container style={{backgroundColor: Color.jfl_F7F7F7}}>
        <Content>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 16,
              paddingBottom: 12.5,
              backgroundColor: Color.jfl_FFFFFF,
            }}>
            <Text
              style={[
                instructionsStyle.textStyle,
                {fontWeight: 'bold', fontSize: 15},
              ]}>
              设备到期提醒
            </Text>
            <Text style={[instructionsStyle.textStyle, {fontSize: 11}]}>
              2018-01-01 10：00
            </Text>
          </View>

          <Text style={[instructionsStyle.textStyle, {paddingBottom: 20}]}>
            您的设备号为12345的设备将在2019-01-01 10：00到 期，请您按时续费。
          </Text>
        </Content>
      </Container>
    );
  }
}

const instructionsStyle = StyleSheet.create({
  textStyle: {
    color: Color.jfl_5B5B5B,
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 2,
    backgroundColor: Color.jfl_FFFFFF,
  },
});
