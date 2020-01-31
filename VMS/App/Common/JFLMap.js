/* eslint-disable eqeqeq */
import PropTypes from 'prop-types';
import React from 'react';
import {
  requireNativeComponent,
  ViewPropTypes,
  findNodeHandle,
  UIManager,
  Platform,
  View,
} from 'react-native';
import {I18n} from './Language/I18n';

class JFLMap extends React.PureComponent {
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
    /**是否显示显示3D楼块效果 */
    buildingsEnabled: PropTypes.bool,
    /**是否显示指南针按钮 */
    showCompassBtn: PropTypes.bool,
    /**是否显示定位按钮 */
    showLocationBtn: PropTypes.bool,
    /** alertV距离顶部的距离 */
    alertVTopMargin: PropTypes.number,
    /** 点击底部的按钮回调 */
    onClickBottomBtnBlock: PropTypes.func,
  };

  componentDidMount() {
    this.refreshLanguage();
  }

  render() {
    return <JFLMapView ref={this.JFLMapView} {...this.props} />;
  }

  /**刷新语言显示 */
  refreshLanguage() {
    this.setLanguage(I18n.t('map_language'));
  }

  /**设置语言('0'-英语，'1'-中文) */
  setLanguage(type) {
    this.callNativeMethod('setLanguage', type);
  }
  /**设置地图类型 */
  setMapType(type) {
    this.callNativeMethod('changeTypes', {mapType: type});
  }
  /**设置MARK点 */
  setMarks(array) {
    this.callNativeMethod('addMarkList', array);
  }
  /**移除MARK点 */
  removeAllMarks() {
    this.callNativeMethod('removeAllMarks');
  }
  /**设置历史轨迹 */
  setPolylines(array) {
    this.callNativeMethod('addPolylines', array);
  }
  /**开始历史轨迹动画 */
  startHistoryAnimation() {
    this.callNativeMethod('startHistoryAnimation');
  }
  /**结束历史轨迹动画 */
  stopHistoryAnimation() {
    this.callNativeMethod('stopHistoryAnimation');
  }
  /**设置一个车辆定位 */
  setLocationItem(item) {
    this.callNativeMethod('setLocationItem', item);
  }

  /**
   * 调用原生方法
   *
   * @private
   */
  callNativeMethod = (command, params) => {
    if (Platform.OS == 'ios') {
      UIManager.dispatchViewManagerCommand(
        findNodeHandle(this),
        UIManager.getViewManagerConfig('JFLMapView').Commands[command],
        params ? [params] : null,
      );
    }
  };
}

const JFLMapView =
  Platform.OS == 'ios' ? requireNativeComponent('JFLMapView', JFLMap) : View;

export default JFLMap;
