/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
import PropTypes from 'prop-types';
import React from 'react';
import {ViewPropTypes, DeviceEventEmitter} from 'react-native';
import {I18n} from '../Language/I18n';
import MapView from 'react-native-maps';
import {Button, Container, Thumbnail, Text} from 'native-base';
import {Style} from './MapStyle';
import {Color} from '../Tools';

class JFLMap extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      myLocation: null,
      mapType: null,
      showMapTypeBtn: false, //是否展示地图类型选择按钮
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
    if (this.state.mapType == undefined) {
      this.state.mapType = this.props.mapType;
    }
    return (
      <Container>
        <MapView
          {...this.props}
          mapType={this.state.mapType}
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
          onPress={() => {
            this._showMapTypeBtn(!this.state.showMapTypeBtn);
          }}
          image={require('../../Source/Img/Home/Home_cat/chakan.png')}
        />
        {this.state.showMapTypeBtn
          ? ['卫星', '标准'].map((title, index) => {
              return (
                <ActionBtn
                  style={[
                    Style.typeBtn,
                    this.props.alertVTopMargin
                      ? {marginTop: this.props.alertVTopMargin}
                      : {},
                    {
                      width: Style.typeBtn.width * 1.5,
                      right:
                        Style.typeBtn.right +
                        Style.typeBtn.width +
                        index * Style.typeBtn.width * 1.5,
                      shadowOffset: {},
                      shadowOpacity: 0,
                    },
                  ]}
                  title={title}
                  key={index}
                  onPress={() => this._changeMapType(index)}
                />
              );
            })
          : null}
        {this.props.showRefreshDataBtn ? (
          <ActionBtn
            rounded
            style={[Style.funcBtn, {marginBottom: 78.5}]}
            onPress={this.props.onClickRefreshDataBtn}
            image={require('../../Source/Img/Home/Home_cat/refresh.png')}
          />
        ) : null}
        {this.props.showLocationBtn ? (
          <ActionBtn
            rounded
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
  /**
   * 是否展示地图类型选择按钮
   */
  _showMapTypeBtn(show = true) {
    this.setState({showMapTypeBtn: show ?? true});
  }

  /**
   * 切换地图类型
   * @param {*} type   0-卫星, 1-标准
   */
  _changeMapType(type = 0) {
    var mapType = type == 1 ? 'standard' : 'satellite';
    this.state.showMapTypeBtn = false;
    this.setState({mapType: mapType});
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
    /**标题(设置image后，则该项无效) */
    title: PropTypes.string,
    /**点击事件 */
    onPress: PropTypes.func,
  };

  render() {
    return (
      <Button transparent {...this.props}>
        {this.props.image ? (
          <Thumbnail
            source={this.props.image}
            style={{
              flex: 1,
              width: Style.typeBtn.width,
              height: Style.typeBtn.height,
            }}
          />
        ) : (
          <Text
            style={{
              backgroundColor: Color.jfl_FFFFFF,
              flex: 1,
              color: Color.jfl_373737,
              fontSize: 13,
              textAlign: 'center',
              paddingLeft: 0,
              paddingRight: 0,
            }}>
            {this.props.title}
          </Text>
        )}
      </Button>
    );
  }
}

export default JFLMap;
