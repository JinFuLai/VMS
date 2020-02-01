/* eslint-disable handle-callback-err */
/* eslint-disable react-native/no-inline-styles */
import {Color, storage} from '../Common/index';
import {StatusBar} from 'react-native';
import {Container, View, Button, Thumbnail, Text} from 'native-base';
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import Swiper from 'react-native-swiper';

export default class GuideScreen extends Component {
  static navigationOptions = () => ({
    headerStyle: {
      backgroundColor: Color.jfl_37BCAD,
    },
    headerTransparent: true, //在navigayion下面同样展示视图
  });

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <StatusBar
          barStyle="light-content"
          backgroundColor={Color.jfl_37BCAD}
          translucent={false}
        />
        <Swiper
          showsPagination={true}
          paginationStyle={{transform: [{translateY: -30}]}}
          dotColor={Color.jfl_37BCAD}
          dotStyle={{opacity: 0.3, width: 10.5, height: 10.5}}
          activeDotColor={Color.jfl_37BCAD}
          activeDotStyle={{width: 10.5, height: 10.5}}
          onIndexChanged={index => {
            this.setState({showBtn: true});
          }}
          loop={false}>
          <View>
            <Thumbnail
              source={require('../Source/Img/My/Guidepage/yingdaoye1.png')}
              style={{width: '100%', height: '100%', borderRadius: 0}}
            />
          </View>
          <View>
            <Thumbnail
              source={require('../Source/Img/My/Guidepage/yingdaoye2.png')}
              style={{width: '100%', height: '100%', borderRadius: 0}}
            />
          </View>
          <View style={{alignItems: 'center', flexDirection: 'column-reverse'}}>
            <Thumbnail
              source={require('../Source/Img/My/Guidepage/yingdaoye3.png')}
              style={{width: '100%', height: '100%', borderRadius: 0}}
            />
            {this.state.showBtn ? (
              <Button
                style={{
                  position: 'absolute',
                  width: 180,
                  height: 37,
                  transform: [{translateY: -80}],
                  backgroundColor: Color.jfl_37BCAD,
                  borderRadius: 18.5,
                }}
                onPress={() => this._clickNextBtn()}>
                <Text
                  style={{
                    color: Color.jfl_FFFFFF,
                    fontSize: 18,
                    textAlign: 'center',
                    width: '100%',
                  }}>
                  立即进入
                </Text>
              </Button>
            ) : null}
          </View>
        </Swiper>
      </Container>
    );
  }

  _goToView(name) {
    this.props.navigation.dispatch(
      NavigationActions.navigate({routeName: name}),
    );
  }

  _clickNextBtn() {
    storage.save({
      key: 'firstLaunch',
      data: false,
      expires: null,
    });
    storage
      .load({
        key: 'User',
      })
      .then(user => {
        if (user && user.token != null) {
          this._goToView('Tab');
        } else {
          this._goToView('Login');
        }
      })
      .catch(err => {
        this._goToView('Login');
      });
  }
}
