/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable eqeqeq */
/* eslint-disable no-alert */
import React from 'react';
import {StatusBar} from 'react-native';
import {
  CommonStyle,
  Color,
  Loading,
  HttpUtils,
  Toast,
  I18n,
  BaseComponent,
} from '../../Common/index';
import {Container, Content, Text, List} from 'native-base';
import {ListHomeItem} from '../../List/Home/ListHomeComponent';

///搜索结果页
export default class SearchResult extends BaseComponent {
  static navigationOptions = () => ({
    headerTitle: () => (
      <Text style={CommonStyle.navGreenStyle}>{I18n.t('search_result')}</Text>
    ),
  });

  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      list: [], //搜索结果
    };
  }

  render() {
    var resultList = this.state.list;
    return (
      <Container>
        <StatusBar
          barStyle="light-content"
          translucent={false}
          backgroundColor={Color.jfl_37BCAD}
        />
        <Content>
          <List>
            {resultList.map((item, index) => {
              return (
                <ListHomeItem
                  data={item}
                  Image={require('../../Source/Img/List/List/sedan.png')}
                  CarNum={item.plate}
                  DeviceNum={item.number}
                  status={item.status}
                  key={index}
                  clickDetailsBtn={selectedIndex =>
                    this._clickItemDetailsBtn(selectedIndex, item)
                  }
                />
              );
            })}
          </List>
        </Content>
        {this.state.refresh ? <Loading /> : null}
      </Container>
    );
  }

  _goToView = (viewName, data = {}) => {
    const {navigate} = this.props.navigation;
    navigate(viewName, {data: data});
  };

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
    this.setState({refresh: true});
    var _this = this;
    HttpUtils.postRequest_inUrl(HttpUtils.AllUrl.Vehicle.Search, true, {
      keyword: this.props.navigation.state.params.data,
      fuzzy: true, //是否模糊查询
    }).then(response => {
      if (_this.unmount) {
        return;
      }
      _this.setState({refresh: false});
      if (response.code === 200) {
        if (response.data && response.data.length > 0) {
          _this.setState({list: response.data});
        } else {
          Toast.show(I18n.t('no_more'));
        }
      } else {
        Toast.show(response.message);
      }
    });
  }
}
