/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View} from 'native-base';
import Spinner, {SpinnerType} from 'react-native-spinkit';

export default class Loading extends Component {
  render() {
    let s: [SpinnerType] = [
      'CircleFlip',
      'Bounce',
      'Wave',
      'WanderingCubes',
      'Pulse',
      'ChasingDots',
      'ThreeBounce',
      'Circle',
      '9CubeGrid',
      'WordPress',
      'FadingCircle',
      'FadingCircleAlt',
      'Arc',
      'ArcAlt',
      'Plane',
    ];
    var type = s[Math.floor(Math.random() * s.length)];
    return (
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'black',
            opacity: 0.2,
          }}
        />
        {/* <Spinner color={'#3BBC72'} style={{opacity:1}}/> */}
        <Spinner isVisible={true} size={100} type={type} color={'#37BCAD'} />
      </View>
    );
  }
}
