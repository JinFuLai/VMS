/* eslint-disable eqeqeq */
import PropTypes from 'prop-types';
import React from 'react';
import {ViewPropTypes, DeviceEventEmitter} from 'react-native';
import JFLGoogleMap from './JFLGoogleMap';
import JFLBaiduMap from './JFLBaiduMap';

class JFLMap extends React.PureComponent {
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
    this._navListener && this._navListener.remove();
  }

  render() {
    if (this.isGoogleMap) {
      return <JFLGoogleMap ref={ref => (this.JFLMap = ref)} {...this.props} />;
    } else {
      return <JFLBaiduMap ref={ref => (this.JFLMap = ref)} {...this.props} />;
    }
  }

  /**刷新语言显示 */
  refreshLanguage() {
    this.setLanguage();
  }

  /**设置语言('0'-英语，'1'-中文) */
  setLanguage() {}

  /**
   * 切换地图类型
   * @param {*} type   0-卫星, 1-标准
   */
  setMapType(type) {
    this.JFLMap && this.JFLMap.setMapType(type);
  }

  /**
   * 设置MARK点
   * @param {[vehicle]} array [vehicle]
   */
  setMarks(array) {
    this.JFLMap && this.JFLMap.setMarks(array);
  }

  /**移除MARK点 */
  removeAllMarks() {
    this.JFLMap && this.JFLMap.removeAllMarks();
  }

  /**
   * 设置历史轨迹
   * @param {[location]} array [location]
   */
  setPolylines(array) {
    this.JFLMap && this.JFLMap.setPolylines(array);
  }

  /**开始历史轨迹动画 */
  startHistoryAnimation() {
    this.JFLMap && this.JFLMap.startHistoryAnimation();
  }

  /**结束历史轨迹动画 */
  stopHistoryAnimation() {
    this.JFLMap && this.JFLMap.stopHistoryAnimation();
  }

  /**设置一个车辆定位 */
  setLocationItem(item) {
    this.JFLMap && this.JFLMap.setLocationItem(item);
  }

  /**
   * 点击mark，是否展示paopao
   * @param {*} show
   */
  showMarkPaopaoView(show) {
    this.JFLMap && this.JFLMap.showMarkPaopaoView(show);
  }
}

export default JFLMap;
