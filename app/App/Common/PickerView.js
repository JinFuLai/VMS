/* jshint esversion: 6 */
import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  Platform,
  BackHandler,
  Animated,
  Easing,
} from 'react-native';
import Picker from 'react-native-picker';
import {provinces} from './provinces';
import PropTypes from 'prop-types';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default class PickerView extends Component<{}> {
  static propTypes = {
    cancel: PropTypes.string, //取消按钮
    title: PropTypes.string, //中间标题
    confirm: PropTypes.string, //确认按钮
    callBackAddressValue: PropTypes.func, //地址回调方法
    callBackDateValue: PropTypes.func, //日期回调方法（年月日）
    callBackTimeValue: PropTypes.func, //时间回调方法（时分秒）
    callOneValue: PropTypes.func, //当使用showArray后的回调方法
    pickerBg: PropTypes.array, //背景颜色
    startYear: PropTypes.number, //开始年份
    endYear: PropTypes.number, //结束年份
    synchronousRefresh: PropTypes.bool, //是否同步刷新
  };

  static defaultProps = {
    cancel: '取消',
    title: '',
    confirm: '确认',
    pickerBg: [255, 255, 255, 1],
    startYear: 2010,
    endYear: 2030,
    synchronousRefresh: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      xPosition: new Animated.Value(0),
      isShow: false, //弹框是否显示
      selectedValue: [], //选择的值  address: ['河北', '唐山', '古冶区']   date: ['2018年', '1月', '1日']
    };
  }

  UNSAFE_componentWillMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }
  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  onBackAndroid() {
    if (this.state.isShow) {
      this.hide();
      return true;
    }
    return false;
  }

  /**
   *  在外部调用 显示字符串/数字的数组
   * @param array [string/num]
   * @param tag 可用于对生成的picker做标记
   */
  showArray(array, tag = null) {
    if (!this.state.isShow) {
      this.state.selectedValue = array;
      this._showArray(array, tag);
      this.showAnimal();
      this.state.isShow = true;
    }
  }

  /**
   *  在外部调用 显示地址
   * @param pickedValue ['河北', '唐山', '古冶区']
   * @param tag 可用于对生成的picker做标记
   */
  showAddress(pickedValue, tag = null) {
    if (!this.state.isShow) {
      this.state.selectedValue = pickedValue;
      this._showAreaPicker(tag);
      this.showAnimal();
      this.state.isShow = true;
    }
  }

  /**
   *  在外部调用 显示地址
   * @param pickedValue ['2018年', '1月', '1日']
   * @param tag 可用于对生成的picker做标记
   */
  showDate(pickedValue, tag = null) {
    if (!this.state.isShow) {
      this.state.selectedValue = pickedValue;
      this._showDatePicker(tag);
      this.showAnimal();
      this.state.isShow = true;
    }
  }

  /**
   *  在外部调用 显示地址
   * @param pickedValue ['24时', '12分', '2秒']
   * @param tag 可用于对生成的picker做标记
   */
  showTime(pickedValue, tag = null) {
    if (!this.state.isShow) {
      this.state.selectedValue = pickedValue;
      this._showTimePicker(tag);
      this.showAnimal();
      this.state.isShow = true;
    }
  }

  /**
   * 隐藏地址
   */
  hide() {
    if (this.state.isShow) {
      Picker.hide();
      this.hideAnimal();
      this.state.isShow = false;
    }
  }

  /**
   * 调用showArray后的确认值
   * @param pickedValue  [string/Num]
   */
  confirmOneValue(pickedValue, tag = null) {
    this.props.callOneValue && this.props.callOneValue(pickedValue, tag);
  }

  /**
   * 地址确认值
   * @param pickedValue  ['河北', '唐山', '古冶区']
   */
  confirmAddressValue(pickedValue, tag = null) {
    this.props.callBackAddressValue &&
      this.props.callBackAddressValue(pickedValue, tag);
  }

  /**
   * 日期确认值
   * @param pickedValue  ['2018年', '1月', '1日']
   */
  confirmDateValue(pickedValue, tag = null) {
    this.props.callBackDateValue &&
      this.props.callBackDateValue(pickedValue, tag);
  }

  /**
   * 时间确认值
   * @param pickedValue  ['2018年', '1月', '1日']
   */
  confirmTimeValue(pickedValue, tag = null) {
    this.props.callBackTimeValue &&
      this.props.callBackTimeValue(pickedValue, tag);
  }

  _showArray(array, tag = null) {
    Picker.init({
      pickerData: array,
      selectedValue: this.state.selectedValue,
      onPickerConfirm: pickedValue => {
        this.confirmOneValue(pickedValue, tag);
        this.hide();
      },
      onPickerCancel: pickedValue => {
        this.hide();
      },
      onPickerSelect: pickedValue => {
        if (this.props.synchronousRefresh) {
          this.confirmOneValue(pickedValue, tag);
        }
      },
      // pickerToolBarBg: [255, 255, 255, 1],
      pickerBg: this.props.pickerBg,
      pickerCancelBtnText: this.props.cancel,
      pickerConfirmBtnText: this.props.confirm,
      pickerTitleText: this.props.title,
      ...this.props,
    });
    Picker.show();
  }

  _showAreaPicker(tag = null) {
    Picker.init({
      pickerData: this._createAreaData(),
      selectedValue: this.state.selectedValue,
      onPickerConfirm: pickedValue => {
        this.confirmAddressValue(pickedValue, tag);
        this.hide();
      },
      onPickerCancel: pickedValue => {
        this.hide();
      },
      onPickerSelect: pickedValue => {
        //Picker.select(['山东', '青岛', '黄岛区'])
        if (this.props.synchronousRefresh) {
          this.confirmAddressValue(pickedValue, tag);
        }
      },
      pickerBg: this.props.pickerBg,
      pickerCancelBtnText: this.props.cancel,
      pickerConfirmBtnText: this.props.confirm,
      pickerTitleText: this.props.title,
      ...this.props,
    });
    Picker.show();
  }

  _showDatePicker(tag = null) {
    Picker.init({
      pickerData: this._createDateData(),
      selectedValue: this.state.selectedValue,
      pickerFontColor: [0, 0, 0, 1],
      onPickerConfirm: pickedValue => {
        this.confirmDateValue(pickedValue, tag);
        this.hide();
      },
      onPickerCancel: () => {
        this.hide();
      },
      onPickerSelect: pickedValue => {
        if (this.props.synchronousRefresh) {
          this.confirmDateValue(pickedValue, tag);
        }
      },
      pickerBg: this.props.pickerBg,
      pickerCancelBtnText: this.props.cancel,
      pickerConfirmBtnText: this.props.confirm,
      pickerTitleText: this.props.title,
      pickerCancelBtnColor: [55, 55, 55, 1],
      pickerConfirmBtnColor: [55, 188, 173, 1],
      ...this.props,
    });
    Picker.show();
  }

  _showTimePicker(tag = null) {
    Picker.init({
      pickerData: this._createTimeData(),
      selectedValue: this.state.selectedValue,
      pickerFontColor: [0, 0, 0, 1],
      onPickerConfirm: pickedValue => {
        this.confirmTimeValue(pickedValue, tag);
        this.hide();
      },
      onPickerCancel: () => {
        this.hide();
      },
      onPickerSelect: pickedValue => {
        if (this.props.synchronousRefresh) {
          this.confirmTimeValue(pickedValue, tag);
        }
      },
      pickerBg: this.props.pickerBg,
      pickerCancelBtnText: this.props.cancel,
      pickerConfirmBtnText: this.props.confirm,
      pickerTitleText: this.props.title,
      pickerCancelBtnColor: [55, 55, 55, 1],
      pickerConfirmBtnColor: [55, 188, 173, 1],
      ...this.props,
    });
    Picker.show();
  }

  _createAreaData() {
    let data = [];
    let len = provinces.length;
    for (let i = 0; i < len; i++) {
      let city = [];
      for (let j = 0, cityLen = provinces[i].city.length; j < cityLen; j++) {
        let _city = {};
        _city[provinces[i].city[j].name] = provinces[i].city[j].area;
        city.push(_city);
      }
      let _data = {};
      _data[provinces[i].name] = city;
      data.push(_data);
    }
    return data;
  }

  /**创建日期数据 */
  _createDateData() {
    let date = [];
    for (let i = this.props.startYear; i < this.props.endYear; i++) {
      let month = [];
      for (let j = 1; j < 13; j++) {
        let day = [];
        if (j === 2) {
          for (let k = 1; k < 29; k++) {
            day.push(k);
          }
          //Leap day for years that are divisible by 4, such as 2000, 2004
          if (i % 4 === 0) {
            day.push(29);
          }
        } else if (j in {1: 1, 3: 1, 5: 1, 7: 1, 8: 1, 10: 1, 12: 1}) {
          for (let k = 1; k < 32; k++) {
            day.push(k);
          }
        } else {
          for (let k = 1; k < 31; k++) {
            day.push(k);
          }
        }
        let _month = {};
        _month[j] = day;
        month.push(_month);
      }
      let _date = {};
      _date[i] = month;
      date.push(_date);
    }
    return date;
  }

  /**创建时间数据 */
  _createTimeData() {
    let time = [];
    for (let i = 0; i < 24; i++) {
      let minutes = [];
      for (let j = 0; j < 60; j++) {
        let seconds = [];
        for (let k = 0; k < 60; k++) {
          seconds.push(k);
        }
        let _minutes = {};
        _minutes[j] = seconds;
        minutes.push(_minutes);
      }
      let _time = {};
      _time[i] = minutes;
      time.push(_time);
    }
    return time;
  }

  showAnimal() {
    Animated.timing(this.state.xPosition, {
      toValue: 1,
      easing: Easing.linear,
      duration: 300,
    }).start();
  }
  hideAnimal() {
    Animated.timing(this.state.xPosition, {
      toValue: 0,
      easing: Easing.linear,
      duration: 200,
    }).start();
  }
  render() {
    return (
      <Animated.View
        style={[
          style.containt,
          {
            transform: [
              {
                translateY: this.state.xPosition.interpolate({
                  inputRange: [0, 1],
                  outputRange: [deviceHeight, 0],
                }),
              },
            ],
          },
        ]}
      />
    );
  }
}

const style = StyleSheet.create({
  containt: {
    width: deviceWidth,
    height: deviceHeight,
    position: 'absolute',
    opacity: 0.3,
    backgroundColor: 'transparent',
    left: 0,
    bottom: 0,
  },
});
