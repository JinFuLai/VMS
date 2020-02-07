/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
import PropTypes from 'prop-types';
import React from 'react';
import {ViewPropTypes, DeviceEventEmitter} from 'react-native';
import {I18n} from '../Language/I18n';
import MapView from 'react-native-maps';
import {Button, Container, Thumbnail} from 'native-base';
import {Style} from './MapStyle';

class JFLMap extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      myLocation: null,
    };
  }

  static propTypes = {
    ...ViewPropTypes,
    /**地图类型 */
    mapType: PropTypes.number,
    /**语言(0-英语，1-中文) */
    language: PropTypes.number,
    /**是否打开路况图层 */
    trafficEnabled: PropTypes.bool,
    /**是否显示定位图层 */
    showsUserLocation: PropTypes.bool,
    /**是否显示刷新数据按钮 */
    showRefreshDataBtn: PropTypes.bool,
    /**是否显示定位按钮 */
    showLocationBtn: PropTypes.bool,
    /** alertV距离顶部的距离 */
    alertVTopMargin: PropTypes.number,
    /** 点击刷新数据按钮的回调 */
    onClickRefreshDataBtn: PropTypes.func,
  };

  componentDidMount() {
    this.refreshLanguage();
    this._navListener = DeviceEventEmitter.addListener('MapType', type => {
      if (type == 0) {
        //百度
        this.isGoogleMap = false;
        this.forceUpdate();
      } else if (type == 1) {
        //谷歌
        this.isGoogleMap = true;
        this.forceUpdate();
      }
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  render() {
    return (
      <Container>
        <MapView
          {...this.props}
          provider={'google'}
          ref={ref => (this.MapView = ref)}
          onUserLocationChange={event => {
            if (event.nativeEvent && event.nativeEvent.coordinate) {
              var toLocation = this.state.myLocation == null;
              this.state.myLocation = {
                latitude: event.nativeEvent.coordinate.latitude,
                longitude: event.nativeEvent.coordinate.longitude,
              };
              if (this.state.myLocation && toLocation) {
                this._onClickLocationBtn();
              }
            }
          }}
        />
        <ActionBtn
          style={[
            Style.typeBtn,
            this.props.alertVTopMargin
              ? {marginTop: this.props.alertVTopMargin}
              : {},
          ]}
          // onPress={()=>{}}
          image={require('../../Source/Img/Home/Home_cat/chakan.png')}
        />
        {this.props.showRefreshDataBtn ? (
          <ActionBtn
            style={[Style.funcBtn, {marginBottom: 78.5}]}
            onPress={this.props.onClickRefreshDataBtn}
            image={require('../../Source/Img/Home/Home_cat/refresh.png')}
          />
        ) : null}
        {this.props.showLocationBtn ? (
          <ActionBtn
            style={Style.funcBtn}
            onPress={() => {
              this._onClickLocationBtn();
            }}
            image={require('../../Source/Img/Home/Home_cat/genzongdingwei.png')}
          />
        ) : null}
      </Container>
    );
  }

  /**跳转到定位点 */
  _onClickLocationBtn() {
    if (this.state.myLocation) {
      var _this = this;
      this.MapView.getCamera()
        .then(camera => {
          camera.center = this.state.myLocation;
          _this.MapView.animateCamera(camera);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  /**刷新语言显示 */
  refreshLanguage() {
    this.setLanguage(I18n.t('map_language'));
  }

  /**设置语言('0'-英语，'1'-中文) */
  setLanguage(type) {}

  /**设置地图类型 */
  setMapType(type) {}

  /**设置MARK点 */
  setMarks(array) {}

  /**移除MARK点 */
  removeAllMarks() {}

  /**设置历史轨迹 */
  setPolylines(array) {}

  /**开始历史轨迹动画 */
  startHistoryAnimation() {}

  /**结束历史轨迹动画 */
  stopHistoryAnimation() {}

  /**设置一个车辆定位 */
  setLocationItem(item) {}
}

class ActionBtn extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    ...ViewPropTypes,
    /**图片 */
    image: PropTypes.any,
    /**点击事件 */
    onPress: PropTypes.func,
  };

  render() {
    return (
      <Button transparent {...this.props}>
        <Thumbnail
          source={this.props.image}
          style={{
            flex: 1,
            width: Style.typeBtn.width,
            height: Style.typeBtn.height,
          }}
        />
      </Button>
    );
  }
}

export default JFLMap;
