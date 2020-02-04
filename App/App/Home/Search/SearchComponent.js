/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
/* jshint esversion: 6 */
import {
  Screen,
  StyleSheet,
  Color,
  CommonStyle,
  PickerView,
  I18n,
} from '../../Common/index';
import {Text, Button, View, Thumbnail, Grid, Row, Col} from 'native-base';
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {ListHomeItemButton} from '../../List/Home/ListHomeComponent';
import {SwipeRow} from 'react-native-swipe-list-view';

export class LocationBottom extends PureComponent {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    data: PropTypes.any, //数据
    name: PropTypes.any, //标题
    driving: PropTypes.bool, //是否正在驾驶
    clickDetailsBtn: PropTypes.func, //点击事件
    style: PropTypes.any,
  };

  render() {
    var data = this.props.data ?? {};
    return (
      <View
        style={[
          SearchComponentStyle.LocationBottomContentStyle,
          this.props.style,
        ]}>
        <View style={{flexDirection: 'row', paddingBottom: 10}}>
          <Text style={SearchComponentStyle.LocationBottomTopTitleOneStyle}>
            {data.plate}
          </Text>
          {data.status === 'ACTIVE' ? (
            <Text
              style={SearchComponentStyle.LocationBottomTopTitleTwoGreenStyle}>
              {I18n.t('car_driving')}
            </Text>
          ) : (
            <Text
              style={SearchComponentStyle.LocationBottomTopTitleTwoGrayStyle}>
              {I18n.t('car_motionless')}
            </Text>
          )}
        </View>
        <Text style={SearchComponentStyle.LocationBottomDetailsStyle}>
          {data.purchase_date ?? ''} 卫星定位
        </Text>
        <Text style={SearchComponentStyle.LocationBottomDetailsStyle}>
          {I18n.t('location_longitude') +
            ' ' +
            ((data.device &&
              data.device.last_gps_point &&
              data.device.last_gps_point.longitude) ??
              '')}
        </Text>
        <Text style={SearchComponentStyle.LocationBottomDetailsStyle}>
          {I18n.t('location_latitude') +
            ' ' +
            ((data.device &&
              data.device.last_gps_point &&
              data.device.last_gps_point.latitude) ??
              '')}
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <ListHomeItemButton
            TitleText={I18n.t('location_history')}
            Image={require('../../Source/Img/Home/Home_search/guiji.png')}
            onPress={() => this.props.clickDetailsBtn(1)}
          />
          <ListHomeItemButton
            TitleText={I18n.t('location_details')}
            Image={require('../../Source/Img/Home/Home_search/xiangqing.png')}
            onPress={() => this.props.clickDetailsBtn(2)}
          />
        </View>
      </View>
    );
  }
}

//搜索结果告警单元格
export class SearchWarningItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    };
    this._selectCell = this._selectCell.bind(this);
  }
  static propTypes = {
    data: PropTypes.any, //数据
    carNum: PropTypes.any, //车牌号
    IMEI: PropTypes.any, //国际移动设备识别码
    DeviceNum: PropTypes.any, //设备号
    onPressItem: PropTypes.func, //点击事件
    onPressDeleteItem: PropTypes.func, //点击删除事件
  };

  render() {
    var data = this.props.data ?? {};
    let vehicle = data.vehicle ? data.vehicle : {};
    let device = data.device ? data.device : {};
    return (
      <SwipeRow
        rightOpenValue={-75}
        stopRightSwipe={-100}
        stopLeftSwipe={0.1}
        disableLeftSwipe={true} //{!(this.props.editing ?? false)}
        closeOnRowPress>
        <View style={SearchComponentStyle.waringHiddenStyle}>
          <Button
            style={{paddingVertical: 14.5, height: '100%', backgroundColor: ''}}
            onPress={() => this.props.onPressDeleteItem(data)}>
            <Text style={{fontSize: 13}}>{I18n.t('delete')}</Text>
          </Button>
        </View>
        <Button
          style={SearchComponentStyle.waringVisibleStyle}
          onPress={() => this.props.onPressItem(data)}
          activeOpacity={1}>
          <Grid style={{height: '100%'}}>
            {/* <Col style={{width: 45}}>
              <Button transparent onPress={this._selectCell}>
                <Row style={{justifyContent: 'center'}}>
                  <Thumbnail
                    square
                    style={SearchComponentStyle.warningImgStyle}
                    source={
                      this.state.focused
                        ? require('../../Source/Img/Home/Home_search_6/gou.png')
                        : require('../../Source/Img/Home/Home_search_6/yuan.png')
                    }
                  />
                </Row>
              </Button>
            </Col> */}
            <Col>
              <Row style={{justifyContent: 'space-between'}}>
                <Text style={SearchComponentStyle.warningTextStyle}>
                  {vehicle.plate}
                </Text>
                <Text style={SearchComponentStyle.warningTextStyle}>
                  {`IMEI:${device.imei}`}
                </Text>
              </Row>
              <Row style={{justifyContent: 'space-between'}}>
                <Text style={SearchComponentStyle.warningTextStyle}>
                  {data.gps_point
                    ? data.gps_point.datetime
                      ? data.gps_point.datetime
                      : null
                    : null}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: Color.jfl_DB4141,
                    paddingVertical: 4,
                    alignSelf: 'flex-end',
                  }}>
                  {data.gps_point
                    ? data.gps_point.alert
                      ? data.gps_point.alert.join(',')
                      : null
                    : null}
                </Text>
              </Row>
            </Col>
          </Grid>
        </Button>
        <View
          style={{
            backgroundColor: Color.jfl_CECECE,
            height: 0.1,
            width: '100%',
          }}
        />
      </SwipeRow>
    );
  }

  _selectCell = () => {
    this.setState({focused: !this.state.focused});
  };
}

///告警详情底部
export class WarningBottom extends PureComponent {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    data: PropTypes.any, //数据(location)
    carNum: PropTypes.any, //车牌号
    IMEI: PropTypes.any, //国际移动设备识别码
    driving: PropTypes.bool, //是否正在驾驶
    clickDetailsBtn: PropTypes.any, //点击事件
  };

  render() {
    var data = this.props.data ?? {};
    let vehicle = data.vehicle ? data.vehicle : {};
    let device = data.device ? data.device : {};
    return (
      <View
        style={[
          SearchComponentStyle.LocationBottomContentStyle,
          this.props.style,
        ]}>
        <Grid>
          <Row style={{height: 17, justifyContent: 'space-between'}}>
            <Text style={SearchComponentStyle.warningBottomTextStyle}>
              {vehicle.plate}
            </Text>
            <Text style={[SearchComponentStyle.warningBottomTextStyle, {}]}>
              {`IMEI:${device.imei}`}
            </Text>
          </Row>
          <Row style={{height: 17, marginBottom: 10, marginTop: 5}}>
            <Text
              style={[
                SearchComponentStyle.warningBottomTextStyle,
                {color: Color.jfl_DB4141},
              ]}>
              {device.last_gps_point
                ? device.last_gps_point.alert
                  ? device.last_gps_point.alert.join('  ')
                  : null
                : null}
            </Text>
          </Row>
          <Col>
            <Text style={SearchComponentStyle.warningBottomTextStyle}>
              {device.last_gps_point ? device.last_gps_point.datetime : null}
              卫星定位
            </Text>
            <Text style={SearchComponentStyle.warningBottomTextStyle}>
              {I18n.t('location_longitude') +
                ' ' +
                (device.last_gps_point
                  ? device.last_gps_point.longitude
                  : null)}
            </Text>
            <Text style={SearchComponentStyle.warningBottomTextStyle}>
              {I18n.t('location_latitude') +
                ' ' +
                (device.last_gps_point ? device.last_gps_point.latitude : null)}
            </Text>
            <Row style={{height: 17}}>
              <Text style={SearchComponentStyle.warningBottomTextStyle}>
                {I18n.t('location_speed') +
                  ' ' +
                  (device.last_gps_point ? device.last_gps_point.speed : null)}
              </Text>
              <Text
                style={[
                  SearchComponentStyle.warningBottomTextStyle,
                  {color: Color.jfl_DB4141, marginLeft: 5},
                ]}>
                {data.speed}
              </Text>
            </Row>
          </Col>
        </Grid>
      </View>
    );
  }
}

///历史轨迹底部
export class HistoryBottom extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      startDay: ['', '', ''],
      starttime: [],
      endDay: ['', '', ''],
      endTime: [],
    };
  }
  static propTypes = {
    carNum: PropTypes.any, //车牌号
    IMEI: PropTypes.any, //国际移动设备识别码
    driving: PropTypes.bool, //是否正在驾驶
    clickDetailsBtn: PropTypes.any, //点击事件
  };

  render() {
    return (
      <View
        style={[
          SearchComponentStyle.LocationBottomContentStyle,
          {height: 165, paddingHorizontal: 0, paddingVertical: 0},
          this.props.style,
        ]}>
        <Grid>
          <Row style={{height: 36, justifyContent: 'space-between'}}>
            <Button transparent onPress={() => this._setDay(0)}>
              <Text style={{fontSize: 15, color: Color.jfl_373737}}>
                {I18n.t('history_last_weak')}
              </Text>
            </Button>
            <Button transparent onPress={() => this._setDay(1)}>
              <Text style={{fontSize: 15, color: Color.jfl_373737}}>
                {I18n.t('history_this_weak')}
              </Text>
            </Button>
            <Button transparent onPress={() => this._setDay(2)}>
              <Text style={{fontSize: 15, color: Color.jfl_373737}}>
                {I18n.t('history_yesterday')}
              </Text>
            </Button>
            <Button transparent onPress={() => this._setDay(3)}>
              <Text style={{fontSize: 15, color: Color.jfl_373737}}>
                {I18n.t('history_today')}
              </Text>
            </Button>
          </Row>
          <View style={CommonStyle.separatorLineStyle} />
          <Row>
            <Button
              transparent
              style={SearchComponentStyle.pickerBtn}
              onPress={() => this._openDay(0)}>
              <Text style={{fontSize: 14, color: Color.jfl_373737}}>
                {`${this.state.startDay[0]}-${this.state.startDay[1]}-${
                  this.state.startDay[2]
                }`}
              </Text>
            </Button>
            <Button
              transparent
              style={SearchComponentStyle.pickerBtn}
              onPress={() => this._openTime(0)}>
              <Text style={{fontSize: 14, color: Color.jfl_373737}}>
                {`${this.state.starttime[0]}:${this.state.starttime[1]}:${
                  this.state.starttime[2]
                }`}
              </Text>
              <Thumbnail
                square
                size={14.5}
                style={{width: 9, height: 14.5}}
                source={require('../../Source/Img/My/My/jiantou.png')}
              />
            </Button>
          </Row>
          <View style={CommonStyle.separatorLineStyle} />
          <Row>
            <Button
              transparent
              style={SearchComponentStyle.pickerBtn}
              onPress={() => this._openDay(1)}>
              <Text style={{fontSize: 14, color: Color.jfl_373737}}>
                {`${this.state.endDay[0]}-${this.state.endDay[1]}-${
                  this.state.endDay[2]
                }`}
              </Text>
            </Button>
            <Button
              transparent
              style={SearchComponentStyle.pickerBtn}
              onPress={() => this._openTime(1)}>
              <Text style={{fontSize: 14, color: Color.jfl_373737}}>
                {`${this.state.endTime[0]}:${this.state.endTime[1]}:${
                  this.state.endTime[2]
                }`}
              </Text>
              <Thumbnail
                square
                size={14.5}
                style={{width: 9, height: 14.5}}
                source={require('../../Source/Img/My/My/jiantou.png')}
              />
            </Button>
          </Row>
          <View style={CommonStyle.separatorLineStyle} />
          <Row
            style={{
              justifyContent: 'space-around',
              paddingTop: 7.5,
              paddingBottom: 9.5,
            }}>
            <Button
              rounded
              onPress={() => this.props.clickDetailsBtn(0)}
              style={{
                backgroundColor: Color.jfl_37BCAD,
                width: '60%',
                height: 29,
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 14, color: Color.jfl_FFFFFF}}>
                {I18n.t('ok')}
              </Text>
            </Button>
            {/* <Button
              rounded
              onPress={() => this.props.clickDetailsBtn(1)}
              style={{
                backgroundColor: Color.jfl_B2B2B2,
                width: '40%',
                height: 29,
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 14, color: Color.jfl_FFFFFF}}>
                {I18n.t('cancel')}
              </Text>
            </Button> */}
          </Row>
        </Grid>
        <PickerView
          ref={ref => (this.datePicker = ref)}
          callBackDateValue={this._callBackDateValue.bind(this)}
          callBackTimeValue={this._callBackTimeValue.bind(this)}
        />
      </View>
    );
  }

  componentWillUnmount() {
    this.datePicker.hide();
  }

  componentDidMount() {
    this._setDay(3);
  }

  /**
   * 选择日期(年月日)
   * @param {*} index 0-开始，1-结束
   */
  _openDay(index) {
    if (index == 0) {
      this.datePicker.showDate(this.state.satrtDay, 'startDay');
    } else if (index == 1) {
      this.datePicker.showDate(this.state.satrtDay, 'endDay');
    }
  }

  _callBackDateValue(value, tag) {
    if (tag === 'startDay') {
      this.setState({
        startDay: value,
      });
    } else if (tag === 'endDay') {
      this.setState({
        endDay: value,
      });
    }
  }

  /**
   * 选择时间
   * @param {*} index 0-开始，1-结束
   */
  _openTime(index) {
    if (index == 0) {
      this.datePicker.showTime(this.state.starttime, 'starttime');
    } else if (index == 1) {
      this.datePicker.showTime(this.state.endTime, 'endTime');
    }
  }

  _callBackTimeValue(value, tag) {
    if (tag === 'starttime') {
      this.setState({
        starttime: value,
      });
    } else if (tag === 'endTime') {
      this.setState({
        endTime: value,
      });
    }
  }

  /**
   * 设置日期(年月日)
   * @param {int} index 0-上周，1-本周，2-昨天，3-今天
   */
  _setDay(index) {
    let now = new Date();
    let some = Date.parse(now) + 1000 * 60 * 60 * 4;
    let whatDay = now.getDay();
    let startDate = now,
      endDate = now;
    let startDay = [],
      endDay = [];
    if (index === 0) {
      //上周
      some -= (whatDay + 7) * 1000 * 60 * 60 * 24;
      startDate = new Date(some);
      endDate = new Date(some + 7 * 1000 * 60 * 60 * 24);
    } else if (index === 1) {
      //本周
      some -= whatDay * 1000 * 60 * 60 * 24;
      startDate = new Date(some);
      endDate = new Date(some + whatDay * 1000 * 60 * 60 * 24);
    } else if (index === 2) {
      //昨天
      some -= 1000 * 60 * 60 * 24;
      startDate = new Date(some);
      endDate = new Date(some + 1000 * 60 * 60 * 24);
    } else {
      //今天
    }
    startDay = [
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      startDate.getDate(),
    ];
    endDay = [endDate.getFullYear(), endDate.getMonth() + 1, endDate.getDate()];
    this.state.startDay = startDay;
    this.state.endDay = endDay;
    this.state.starttime = ['0', '0', '0'];
    this.state.endTime = ['0', '0', '0'];
    this.forceUpdate();
  }

  /**获取开始日期数据 */
  getStartDay() {
    return this.state.startDay;
  }

  /**获取开始事假数据 */
  getStartTime() {
    return this.state.starttime;
  }

  /**获取结束日期 */
  getEndDay() {
    return this.state.endDay;
  }

  /**获取结束时间 */
  getEndTime() {
    return this.state.endTime;
  }
}

const SearchComponentStyle = StyleSheet.create({
  LocationBottomContentStyle: {
    backgroundColor: Color.jfl_FFFFFF,
    paddingHorizontal: 15,
    paddingVertical: 13,
    height: 151,
    width: Screen.width,
  },
  LocationBottomTopTitleOneStyle: {
    color: Color.jfl_111111,
    fontSize: 15,
    paddingRight: 27,
  },
  LocationBottomTopTitleTwoGreenStyle: {
    color: Color.jfl_3BBC72,
    fontSize: 15,
  },
  LocationBottomTopTitleTwoGrayStyle: {
    color: Color.jfl_383838,
    fontSize: 15,
  },
  LocationBottomDetailsStyle: {
    color: Color.jfl_333333,
    fontSize: 14,
  },
  waringHiddenStyle: {
    height: 60,
    backgroundColor: Color.jfl_E43744,
    flexDirection: 'row-reverse',
  },
  waringVisibleStyle: {
    width: '100%',
    height: 60,
    backgroundColor: Color.jfl_FFFFFF,
    borderRadius: 0,
  },
  warningImgStyle: {
    width: 17,
    height: 17,
  },
  warningTextStyle: {
    paddingVertical: 4,
    color: Color.jfl_3A3A3A,
    fontSize: 12,
  },
  warningBottomTextStyle: {
    marginVertical: 2,
    fontSize: 12,
    color: Color.jfl_3A3A3A,
  },
  pickerBtn: {
    height: 35,
    flex: 1,
    justifyContent: 'space-between',
    paddingRight: 14,
  },
});
