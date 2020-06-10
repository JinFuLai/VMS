/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
import PropTypes from 'prop-types';
import React from 'react';
import {ViewPropTypes} from 'react-native';
import {I18n} from '../Language/I18n';
import {Button, Container, Thumbnail, Text} from 'native-base';
import {Style} from './MapStyle';
import {Color} from '../Tools';
import {MapView, Location} from 'react-native-baidumap-sdk';
import Config from '../Config';
const {Marker, Callout, Polyline} = MapView;

import GpsUtil from './GPSTool/GpsUtil';

class JFLBaiduMap extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      myLocation: null, // 我的位置
      center: null, //地图中心
      mapType: null,
      showMapTypeBtn: false, //是否展示地图类型选择按钮
      marks: [], //标记点
      showMarkPaopao: true, //点击mark，是否展示浮窗
      historyPoint: [], //历史轨迹点集合
      historyMark: null, //历史轨迹显示的mark点
    };
    this.historyMarkIndex = 0; //historyMark所显示的点在historyPoint的位置
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
    /**地图放大等级 */
    zoomLevel: PropTypes.number,
  };

  async componentDidMount() {
    this.refreshLanguage();
    if (this.props.showsUserLocation && this.props.showsUserLocation == true) {
      await Location.init();
      Location.setOptions({gps: true});
      this._LocationListener = Location.addLocationListener(location => {
        var point = {
          latitude: location.latitude,
          longitude: location.longitude,
        };
        Location.stop();
        this.setState({myLocation: point, center: point});
      });
      Location.start();
    }
  }

  componentWillUnmount() {
    this._LocationListener && this._LocationListener.remove();
  }

  render() {
    if (this.state.mapType == undefined) {
      this.state.mapType = this.props.mapType;
    }
    var historyP = this.state.historyPoint
      .filter((item, index) => {
        return item.gps_point && item.vehicle && item.device;
      })
      .map((item, index) => {
        return this.getRightPoint({
          latitude: item.gps_point.latitude,
          longitude: item.gps_point.longitude,
        });
      });
    var bdLocation = this.state.myLocation
      ? this.getRightPoint(this.state.myLocation)
      : null;
    var bdCenter = null;
    if (
      this.state.center &&
      this.state.center.longitude &&
      this.state.center.latitude
    ) {
      bdCenter = this.getRightPoint(this.state.center);
    }
    return (
      <Container>
        <MapView
          {...this.props}
          ref={ref => (this.MapView = ref)}
          rotateDisabled={true} //禁止旋转
          style={([this.props.style], {width: '100%', height: '100%'})}
          satellite={this.state.mapType === 0}
          locationEnabled={this.props.showsUserLocation}
          location={bdLocation}
          zoomLevel={this.props.zoomLevel ?? 13}
          center={bdCenter}
          // center={this.state.center}
        >
          {this.props.children}
          {/* 显示标记点 */}
          {this.state.marks
            .filter((vechile, index) => {
              return (
                vechile.device &&
                vechile.device.last_gps_point &&
                vechile.device.last_gps_point.latitude &&
                vechile.device.last_gps_point.longitude
              );
            })
            .map((vechile, index) => {
              var device = vechile.device ? vechile.device : {};
              return this._returnMark(
                vechile,
                device,
                device.last_gps_point,
                index,
              );
            })}
          {historyP.length > 0 && this._returnHistoryLine(historyP)}
          {this.state.historyMark &&
            this._returnMark(
              this.state.historyMark.vechile,
              this.state.historyMark.device,
              this.state.historyMark.gps_point,
              'historyPoint',
            )}
        </MapView>
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
                  onPress={() => this.setMapType(index)}
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
   * 设置marker点
   * @param {*} vechile
   * @param {*} device
   * @param {*} point
   * @param {*} key
   */
  _returnMark(vechile, device, point, key) {
    let coordinate = this.getRightPoint(point);
    return (
      <Marker
        key={key}
        image={'car'}
        coordinate={coordinate}
        // view={()=>
        //   <Thumbnail
        //   source={require('../../Source/Img/Home/Home/car.png')}
        //   style={{width: 30, height: 30}}
        // />
        // }
      >
        {this.state.showMarkPaopao ? (
          <Callout>
            <Text
              style={{
                width: 240,
                fontSize: 13,
                backgroundColor: Color.jfl_FFFFFF,
                opacity: 0.8,
                padding: 10,
                borderRadius: 4,
                overflow: 'hidden',
              }}>
              {vechile
                ? `车牌号码： ${vechile.plate ??
                    '暂无数据'} \n设备类型：  ${device.device_type ??
                    '暂无数据'}\n身份ID： 暂无数据\n联系方式： 暂无数据\nIMEI号：  ${device.imei ??
                    '暂无数据'}\nSIM卡号：  ${device.simcard ??
                    '暂无数据'}\n车辆识别号： ${vechile.number ??
                    '暂无数据'}\n地址： ${
                    device.last_gps_point
                      ? device.last_gps_point.address ?? '暂无数据'
                      : '暂无数据'
                  }`
                : null}
            </Text>
          </Callout>
        ) : null}
      </Marker>
    );
  }

  /**
   * 绘制历史轨迹
   * @param {*} historyP
   */
  _returnHistoryLine(historyP) {
    return <Polyline color={Color.jfl_37BCAD} width={4} points={historyP} />;
  }

  /**
   * 是否展示地图类型选择按钮
   */
  _showMapTypeBtn(show = true) {
    this.setState({showMapTypeBtn: show ?? true});
  }

  /**跳转到定位点 */
  _onClickLocationBtn() {
    this.setState({center: this.state.myLocation});
  }

  /**
   * 地图移动到指定点
   * @param {*} point {latitude: number, longitude:number}
   */
  _moveToPoint(point) {
    this.setState({center: point});
  }

  /**刷新语言显示 */
  refreshLanguage() {
    this.setLanguage(I18n.t('map_language'));
  }

  /**设置语言('0'-英语，'1'-中文) */
  setLanguage(type) {}

  /**
   * 切换地图类型
   * @param {*} type   0-卫星, 1-标准
   */
  setMapType(type = 1) {
    this.state.showMapTypeBtn = false;
    this.setState({mapType: type});
  }

  /**
   * 设置MARK点
   * @param {[vehicle]} array [vehicle]
   */
  setMarks(array) {
    array && this.setState({marks: array});
  }

  /**移除MARK点 */
  removeAllMarks() {
    this.setState({marks: []});
  }

  /**
   * 设置历史轨迹
   * @param {[location]} array [location]
   */
  setPolylines(array) {
    var polints = array.filter((item, index) => {
      return item.gps_point && item.vehicle && item.device;
    });
    polints && this.setState({historyPoint: polints, historyMark: polints[0]});
    polints && polints[0] && this._moveToPoint(polints[0].gps_point);
  }

  /**开始历史轨迹动画 */
  startHistoryAnimation() {
    this.stopHistoryAnimation();
    this.historyMarkIndex += 1;
    if (this.historyMarkIndex < this.state.historyPoint.length) {
      this.timer = setTimeout(() => {
        this.startHistoryAnimation();
      }, 1000);
    } else {
      this.historyMarkIndex = 0;
      this.timer = null;
    }
    this.setState({
      historyMark: this.state.historyPoint[this.historyMarkIndex],
    });
    this.state.historyPoint &&
      this.state.historyPoint[this.historyMarkIndex] &&
      this._moveToPoint(
        this.state.historyPoint[this.historyMarkIndex].gps_point,
      );
  }

  /**结束历史轨迹动画 */
  stopHistoryAnimation() {
    this.timer = null;
  }

  /**设置一个车辆定位 */
  setLocationItem(item) {
    item && this.setState({marks: [item]});
    item.device &&
      item.device.last_gps_point &&
      this._moveToPoint(item.device.last_gps_point);
  }

  /**
   * 点击mark，是否展示paopao
   * @param {*} show
   */
  showMarkPaopaoView(show = true) {
    this.setState({showMarkPaopao: show ?? true});
  }

  /**
   * 获取正确的点(坐标系转化)
   * @param {*} point
   */
  getRightPoint(point) {
    if (Config.isStayInChina) {
      return GpsUtil.gcj02_To_Bd09(point.longitude, point.latitude).toJson();
    } else {
      return GpsUtil.gps84_To_Bd09(point.longitude, point.latitude).toJson();
    }
  }
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

export default JFLBaiduMap;
