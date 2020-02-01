/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';
import {Screen, StyleSheet, Color} from '../../Common/index';
import {View, Image, Text, TouchableWithoutFeedback} from 'react-native';

export default class MyListCell extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      img: require('../../Source/Img/My/My/touxiang.png'),
      title: '姓名',
      onPress: null,
    };
  }
  render() {
    return (
      <TouchableWithoutFeedback
        style={{width: '100%'}}
        onPress={this.props.onPress}>
        <View style={style.topViewStyle}>
          <Image style={style.imgStyle} source={this.props.img} />
          <Text style={style.titleStyle}>{this.props.title}</Text>
          <Image
            style={style.iconStyle}
            source={require('../../Source/Img/My/My/jiantou.png')}
          />
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
  imgStyle: {
    width: 20,
    height: 20,
    position: 'absolute',
    left: 20,
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  titleStyle: {
    color: Color.jfl_353535,
    fontSize: 13,
    height: '100%',
    position: 'absolute',
    left: 70,
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
});
