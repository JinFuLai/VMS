/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';
import {StyleSheet, Color} from './Tools';
import {
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  Switch,
} from 'react-native';

type Props = {
  title: '姓名',
  onPress: null,
  isArrow: true, //右侧是否是箭头,否则是选择器
  hasLab: false, //右侧是否有文本
};

export default class NormalCell extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      focused: false, //是否选中
      swicthValue: false, //选择器的值
      describe: null, //右侧文本
    };
  }
  render() {
    return (
      <TouchableWithoutFeedback
        style={{width: '100%'}}
        onPress={this.props.onPress}>
        <View style={style.topViewStyle}>
          <Text style={style.titleStyle}>{this.props.title}</Text>
          {this.props.isArrow ? (
            <Image
              style={style.iconStyle}
              source={require('../Source/Img/My/My/jiantou.png')}
            />
          ) : (
            <Switch
              style={style.switchStyle}
              trackColor={{true: Color.jfl_37BCAD}}
              onValueChange={value => this.setState({swicthValue: value})}
              value={this.state.swicthValue}
            />
          )}
          {this.props.hasLab ? (
            <Text style={style.describeStyle}>{this.props.describe}</Text>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const style = StyleSheet.create({
  topViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.jfl_FFFFFF,
    height: 50,
    width: '100%',
  },
  bottomViewStyle: {
    backgroundColor: Color.jfl_DCDCDC,
    height: 1,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  titleStyle: {
    color: Color.jfl_353535,
    fontSize: 13,
    height: '100%',
    position: 'absolute',
    left: 14,
    justifyContent: 'center',
    lineHeight: 50,
  },
  iconStyle: {
    width: 9,
    height: 16,
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
  },
  switchStyle: {
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
  },
  describeStyle: {
    justifyContent: 'center',
    position: 'absolute',
    right: 40,
    fontSize: 12,
    color: Color.jfl_37BCAD,
  },
});
