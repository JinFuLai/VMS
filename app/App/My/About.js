import React, {PureComponent} from 'react';
import {View, Text, Image} from 'react-native';
import {Color, StyleSheet, I18n} from '../Common/index';

export default class About extends PureComponent {
  static navigationOptions = () => ({
    title: I18n.t('my_about'),
  });
  render() {
    return (
      <View style={style.viewStyle}>
        <Image
          style={style.imgStyle}
          source={require('../Source/Img/My/My_about/logo.png')}
        />
        <Text style={style.titleStyle}>{I18n.t('app_name')}</Text>
        <Text style={style.versionStyle}>1.1.1</Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
  viewStyle: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  imgStyle: {
    width: 105,
    height: 105,
    marginTop: 34,
  },
  titleStyle: {
    fontSize: 16,
    color: Color.jfl_353535,
    textAlign: 'center',
    marginTop: 15,
  },
  versionStyle: {
    fontSize: 16,
    color: Color.jfl_353535,
    textAlign: 'center',
    marginTop: 15,
  },
});
