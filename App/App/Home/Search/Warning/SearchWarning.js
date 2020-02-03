/* eslint-disable no-shadow */
import React from 'react';
import {
  CommonStyle,
  AlertView,
  I18n,
  HttpUtils,
  Loading,
  Toast,
  BaseComponent,
} from '../../../Common/index';
import {Container, Text} from 'native-base';
import {SearchWarningItem} from '../SearchComponent';
import {SwipeListView} from 'react-native-swipe-list-view';
import {RefreshControl} from 'react-native';

export default class SearchWarning extends BaseComponent {
  static navigationOptions = _ => ({
    headerTitle: () => (
      <Text style={CommonStyle.navGreenStyle}>{I18n.t('warnning_list')}</Text>
    ),
  });

  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      refresh: false,
      data: [],
    };
    this._goToView = this._goToView.bind(this);
  }

  static propTypes = {
    // searchKey: PropTypes.any,//标题
  };

  render() {
    const data = this.state.data;
    return (
      <Container>
        <SwipeListView
          refreshing
          refreshControl={<RefreshControl />}
          data={data}
          renderItem={this._renderItem}
          keyExtractor={() => Math.random().toString()} //还需要处理
        />

        <AlertView
          ref={ref => {
            this.AlertView = ref;
          }}
          TitleText="确认删除选中的告警通知吗？"
          subTitleVisible={false}
          LeftBtnText="确定"
          RightBtnText="取消"
          // clickLeftBtn={()=>(this.refs.AlertView_my.closeAlert())}
          // clickRightBtn={()=>(this.refs.AlertView_my.closeAlert())}
        />
        {this.state.refresh ? <Loading /> : null}
      </Container>
    );
  }

  _renderItem = info => {
    let data = info.item;
    let vehicle = data.vehicle ? data.vehicle : {};
    let device = data.device ? data.device : {};
    return (
      <SearchWarningItem
        data={data}
        carNum={vehicle.plate}
        IMEI={device.imei}
        onPressItem={data => this._goToView('SearchWarningDetails', data)}
        onPressDeleteItem={() => this.AlertView.showAlert()}
      />
    );
  };

  _goToView = (viewName, data) => {
    const {navigate} = this.props.navigation;
    navigate(viewName, {data: data});
  };

  componentDidMount() {
    this._getData();
  }

  _getData() {
    const data = this.props.navigation.state.params.data;
    const id = data && data._id;
    if (!id) {
      return;
    }
    this.setState({refresh: true});
    var _this = this;
    HttpUtils.postRequest_inUrl(HttpUtils.AllUrl.Vehicle.warnMsg, true, {
      id: id,
    }).then(response => {
      if (_this.unmount) {
        return;
      }
      _this.setState({refresh: false});
      if (response.code === 200) {
        if (response.data && response.data.length > 0) {
          _this.setState({data: response.data});
        } else {
          Toast.show(I18n.t('no_more'));
        }
      } else {
        Toast.show(response.message);
      }
    });
  }
}
