/* jshint esversion: 6 */
import React, {PureComponent} from 'react';
import {I18n, Color, StyleSheet} from '../Common/index';
import {Container, Content, Text} from 'native-base';

export default class Instructions extends PureComponent {
  static navigationOptions = _ => ({
    title: I18n.t('my_instructions'),
  });
  render() {
    return (
      <Container style={{backgroundColor: Color.jfl_F7F7F7}}>
        <Content>
          <Text style={instructionsStyle.textStyle}>
            我是使用说明：{'\r\n'}
            使用说明使用说明使用说明使用说明使用说明使用说明使
            用说明使用说明使用说明使用说明使用说明使用说明使用
            使用说明使用说明使用说明使用说明使用说明使用说明说
            使用说明使用说明使用说明使用说明使用说明使用说明明
            使用说明使用说明。
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
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: Color.jfl_FFFFFF,
  },
});
