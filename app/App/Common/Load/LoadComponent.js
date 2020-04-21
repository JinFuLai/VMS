/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Dimensions} from 'react-native';
import {View} from 'native-base';
import Spinner, {SpinnerType} from 'react-native-spinkit';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
export default class LoadComponent extends Component {
  constructor(props) {
    super(props);
    this.minShowingTime = 200;
    this.state = {
      isLoading: false,
      setIsLoading: isLoading => {
        if (isLoading != this.state.isLoading) {
          let curTimeLong = new Date().getTime();
          if (isLoading) {
            this.startTime = curTimeLong;
            this.setState({
              isLoading,
            });
          } else {
            let hasShowingTimeLong = curTimeLong - this.startTime;
            if (hasShowingTimeLong < this.minShowingTime) {
              setTimeout(() => {
                this.setState({
                  isLoading,
                });
              }, this.minShowingTime - hasShowingTimeLong);
            } else {
              this.setState({
                isLoading,
              });
            }
          }
        }
      },
    };
  }

  showLoading = () => {
    this.state.setIsLoading(true);
  };
  stopLoading = () => {
    this.state.setIsLoading(false);
  };

  render() {
    if (!this.state.isLoading) {
      return null;
    }
    var type = this._getType();
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
            opacity: 0.5,
          }}
        />
        {/* <Spinner color={'#3BBC72'} style={{opacity:1}}/> */}
        <Spinner
          isVisible={true}
          size={70}
          type={type}
          color={'#37BCAD'}
          style={{transform: [{translateX: -10}, {translateY: -40}]}}
        />
      </View>
    );
  }

  _getType() {
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
    return 'FadingCircleAlt'; //s[Math.floor(Math.random() * s.length)];
  }
}
