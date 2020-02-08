/* eslint-disable consistent-this */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  CommonStyle,
  JFLMap,
  I18n,
  Loading,
  HttpUtils,
  Toast,
  BaseComponent,
} from '../../../Common/index';
import {Container, Text, Grid, Row} from 'native-base';
import {HistoryBottom} from '../SearchComponent';

export default class SearchHistory extends BaseComponent {
  static navigationOptions = _ => ({
    headerTitle: () => (
      <Text style={CommonStyle.navGreenStyle}>{I18n.t('history')}</Text>
    ),
  });

  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      refresh: false,
      data: [],
    };
  }

  static propTypes = {};

  render() {
    const data = this.props.navigation.state.params.data;
    return (
      <Container>
        <JFLMap
          ref={ref => {
            this.JFLMap = ref;
          }}
          onClickBottomBtnBlock={event => {
            let dic = event.nativeEvent;
            if (dic.index === 0) {
              //详情
              this._goToView('SearchDetails', dic.item);
            }
          }}
          style={{flex: 1}}
        />
        <HistoryBottom
          ref={ref => {
            this.picker = ref;
          }}
          carNum={data.carNum}
          IMEI={data.IMEI}
          driving={data.driving}
          clickDetailsBtn={index => this._clickDetailsBottomBtn(index)}
        />
        {this.state.refresh ? <Loading /> : null}
      </Container>
    );
  }

  componentDidMount() {
    this.JFLMap.showMarkPaopaoView(false);
    const data = this.props.navigation.state.params.data;
    this.JFLMap.setLocationItem(data);
  }

  _goToView = (viewName, data = {}) => {
    // const {navigate} = this.props.navigation;
    this.props.navigation.push(viewName, {data: data}); //push可以才能推出相同界面，而navigate不行
  };

  /**
   * 点击底部详情上的按钮
   * @param {*} index 0-确定，1-取消
   */
  _clickDetailsBottomBtn(index) {
    if (index === 0) {
      const data = this.props.navigation.state.params.data;
      const deviceID = data && data.device && data.device._id;
      if (!deviceID) {
        Toast.show(I18n.t('no_more'));
        return;
      }
      const start = `${this.picker
        .getStartDay()
        .join('/')} ${this.picker.getStartTime().join(':')}`;
      const end = `${this.picker
        .getEndDay()
        .join('/')} ${this.picker.getEndTime().join(':')}`;
      this.setState({refresh: true});
      var _this = this;
      HttpUtils.postRequest_inUrl(HttpUtils.AllUrl.Vehicle.Histroy, true, {
        deviceID: deviceID,
        start: start,
        end: end,
      }).then(response => {
        if (_this.unmount) {
          return;
        }
        _this.setState({refresh: false});
        if (response && response.code === 200) {
          if (response.data && response.data.length > 0) {
            this.JFLMap.setPolylines(response.data);
            this.JFLMap.startHistoryAnimation();
          } else {
            Toast.show(I18n.t('no_more'));
          }
        } else {
          Toast.show(response.message);
        }
      });
    } else {
    }
  }
}
