/* eslint-disable eqeqeq */
import PropTypes from 'prop-types';
import React from 'react';
import {ViewPropTypes, DeviceEventEmitter} from 'react-native';
import {I18n} from '../Language/I18n';
import MapView from 'react-native-maps';

class JFLGoogleMap extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {...this.state};
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
    onClickRefreshDataBtnBlock: PropTypes.func,
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
      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        {...this.props}
      />
    );
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

export default JFLGoogleMap;
