/* eslint-disable no-shadow */
/* eslint-disable eqeqeq */
/* eslint-disable no-alert */
import React from 'react';
import {HttpUtils, Toast, BaseComponent} from '../../Common/index';
import {Container, View} from 'native-base';
import {ListHomeSection, ListHomeItem} from './ListHomeComponent';
import {SectionList, RefreshControl} from 'react-native';
import PropTypes from 'prop-types';

export default class ListTabList extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      originalData: [], //
      showData: [], //
      refresh: false,
    };
    this._touchSectionHeader = this._touchSectionHeader.bind(this);
  }
  static propTypes = {
    /**展示的车辆状态0-全部，1-在线，2-离线 */
    status: PropTypes.number,
  };

  render() {
    let data = this.state.showData;
    return (
      <Container>
        <SectionList
          refreshControl={
            <RefreshControl
              onRefresh={this._getData}
              refreshing={this.state.refresh}
            />
          }
          sections={data}
          renderItem={this._renderItem}
          renderSectionHeader={this._renderSectionHeader}
          renderSectionFooter={this._renderSectionFooter}
          keyExtractor={this._keyExtractor}
          showsVerticalScrollIndicator={false}
        />
      </Container>
    );
  }

  _keyExtractor = (info, index) => {
    return index;
  };

  _renderSectionHeader = info => {
    let section = info.section;
    return (
      <ListHomeSection
        name={section.name}
        show={section.show}
        onPress={() => this._touchSectionHeader(info)}
      />
    );
  };

  _renderItem = info => {
    let section = info.section;
    let data = section.data && section.data[info.index];
    if (section && section.show) {
      return (
        <ListHomeItem
          data={data}
          Image={require('../../Source/Img/List/List/sedan.png')}
          CarNum={data.plate}
          DeviceNum={data.number}
          status={data.status}
          clickDetailsBtn={(index, data) =>
            this._clickItemDetailsBtn(index, data)
          }
        />
      );
    } else {
      return <View />;
    }
  };

  _goToView = (viewName, data) => {
    this.props.navigation.navigate(viewName, {data: data});
  };

  _touchSectionHeader(info) {
    this.state.showData = this.state.showData.map((item) => {
      if (item.name === info.section.name) {
        item.show = !item.show;
      }
      return item;
    });
    this.forceUpdate();
  }

  _getData = () => {
    this.setState({refresh: true});
    let status = this.props.status === 1 ? 1 : this.props.status === 2 ? 2 : 0;
    var _this = this;
    HttpUtils.postRequest_inUrl(HttpUtils.AllUrl.Vehicle.List, true, {
      status: status,
    }).then(response => {
      if (_this.unmount) {
        return;
      }
      _this.setState({refresh: false});
      if (response.code == 200 && response.data) {
        _this._getShowData(response.data);
      } else {
        Toast.show(response.message);
      }
    });
  };

  _getShowData(data) {
    this.state.originalData = data;
    this.state.showData = data
      .filter((item) => {
        return item.name || item.vehicles;
      })
      .map((item) => {
        let tempData = {};
        tempData.show = true; //是否展示
        tempData.name = item.name ? item.name : '';
        tempData.data = item.vehicles ? item.vehicles : [];
        return tempData;
      });
    this.forceUpdate();
  }

  _clickItemDetailsBtn = (index, data) => {
    if (index == 1) {
      this._goToView('SearchLocation', data);
    } else if (index == 2) {
      this._goToView('SearchHistory', data);
    } else if (index == 3) {
      this._goToView('SearchWarning', data);
    } else if (index == 4) {
      this._goToView('SearchDetails', data);
    } else {
      alert(index);
    }
  };

  componentDidMount() {
    this._getData();
  }
}
