/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';
import {Screen, StyleSheet, Color, I18n} from '../../Common/index';
import {View, Image, Text} from 'react-native';
import {Button} from 'native-base';

export default class MyHead extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      img: require('../../Source/Img/My/My/touxiang.png'),
      name: '姓名',
      mark: '你好',
      style: 'null',
      onPress: {},
    };
  }

  render() {
    return (
      <View style={this.props.style}>
        <Image
          style={style.backgroundImgStyle}
          source={require('../../Source/Img/My/My/bg_my.png')}
        />
        <View style={style.viewStyle}>
          <Image
            source={this.props.img}
            defaultSource={require('../../Source/Img/My/My/touxiang.png')}
            style={style.imgStyle}
          />
          <Text style={style.txtStyle}>{this.props.name}</Text>
          <Text style={[style.txtStyle, {fontSize: 12}]}>
            {I18n.t('my_signature')}:{this.props.mark}
          </Text>
          <Button
            transparent
            style={style.btnStyle}
            onPress={this.props.onPress}>
            <Text style={{color: Color.jfl_FFFFFF, fontSize: 11}}>
              {I18n.t('my_edit')}
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  viewStyle: {
    paddingTop: 88,
    flexDirection: 'column',
    alignItems: 'center',
  },
  backgroundImgStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  imgStyle: {
    width: 71,
    height: 71,
    // resizeMode: 'contain',
    borderRadius: 35.5,
    alignContent: 'center',
    overflow: 'hidden',
    backgroundColor: Color.jfl_000000,
  },
  txtStyle: {
    width: Screen.width,
    height: 20,
    textAlign: 'center',
    color: Color.jfl_FFFFFF,
    fontSize: 14,
    top: 10,
  },
  btnViewStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  btnStyle: {
    width: 100,
    height: 23,
    borderRadius: 11,
    borderColor: Color.jfl_FFFFFF,
    borderWidth: 0.5,
    marginTop: 15,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    justifyContent: 'center',
    backgroundColor: Color.jfl_37BCAD,
    shadowOffset: {
      width: 3,
      height: 0,
    },
    // shadowColor: Color.jfl_FFFFFF,
    // shadowRadius: 4,
    // shadowOpacity: 0.6,
  },
});
