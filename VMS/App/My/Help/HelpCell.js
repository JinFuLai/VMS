/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';
import {StyleSheet, Color} from '../../Common/index';
import {View, Image, Text, TouchableWithoutFeedback} from 'react-native';

type Props = {
  title: null,
  describe: null,
  onPress: null,
};
export default class HelpCell extends PureComponent<Props> {
  constructor() {
    super();
    this.state = {
      focused: false,
    };
    this._touchCell = this._touchCell.bind(this);
  }
  render() {
    var rotate = this.state.focused ? '90deg' : '0deg';
    return (
      <TouchableWithoutFeedback
        style={{width: '100%', backgroundColor: Color.jfl_FFFFFF}}
        onPress={this._touchCell}>
        <View>
          <View style={style.topViewStyle}>
            <Text style={style.titleStyle}>{this.props.title}</Text>
            <Image
              style={
                (style.iconStyle,
                {
                  transform: [{rotate: rotate}],
                  position: 'absolute',
                  right: 20,
                })
              }
              source={require('../../Source/Img/My/My/jiantou.png')}
            />
          </View>
          {this.state.focused ? (
            <View style={style.bottomViewStyle}>
              <Text style={style.desStyle}>{this.props.describe}</Text>
            </View>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _touchCell = () => {
    this.setState({focused: !this.state.focused});
  };
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
    backgroundColor: Color.jfl_FFFFFF,
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
  desStyle: {
    justifyContent: 'center',
    margin: 14,
    marginTop: 0,
    backgroundColor: Color.jfl_F7F7F7,
    color: '#535353',
    fontSize: 12,
    padding: 5,
    paddingTop: 10,
    paddingBottom: 10,
  },
  iconStyle: {
    width: 9,
    height: 16,
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
  },
});
