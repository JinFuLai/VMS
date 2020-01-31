/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* jshint esversion: 6 */
import React from 'react';
import {
  AlertView,
  I18n,
  Color,
  StyleSheet,
  BaseComponent,
} from '../../Common/index';
import {Container, Icon, View, Item, Input} from 'native-base';
import {SwipeListView} from 'react-native-swipe-list-view';
import {testPoints} from '../../Common/pointData';
import MessageItem from './MessageItem';

export default class MessageList extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      type: 0, //0-警告消息，1-系统消息，2-圈子消息
      editing: false, //是否是编辑状态
      refreshing: false, //是否正在加载
    };
  }

  static propTypes = {};

  render() {
    const dataArray = [testPoints[0], testPoints[45], testPoints[89]];
    return (
      <Container style={{backgroundColor: Color.jfl_F7F7F7}}>
        <Item style={style.Search}>
          <Icon name="ios-search" />
          <Input
            placeholder={
              this.state.type === 0
                ? I18n.t('list_search_title')
                : I18n.t('search')
            }
            clearButtonMode="while-editing"
            style={{fontSize: 14}}
          />
        </Item>
        <SwipeListView
          // refreshControl={
          //   <RefreshControl
          //     refreshing={this.state.refreshing}
          //     onRefresh={() => this.onRefresh()}
          //   />
          // }
          showsVerticalScrollIndicator={false}
          data={dataArray}
          renderItem={this._renderWarnItem}
          keyExtractor={() => Math.random().toString()} //还需要处理
          ItemSeparatorComponent={this._separatorline}
        />

        <AlertView
          ref={ref => {
            this.AlertView = ref;
          }}
          TitleText="确认删除选中的告警通知吗？"
          subTitleVisible={false}
          LeftBtnText={I18n.t('ok')}
          RightBtnText={I18n.t('cancel')}
          // clickLeftBtn={()=>(this.refs.AlertView_my.closeAlert())}
          // clickRightBtn={()=>(this.refs.AlertView_my.closeAlert())}
        />
        <View />
      </Container>
    );
  }
  /**
   * 修改列表类型
   * @param {*} type 0-警告消息，1-系统消息，2-圈子消息
   */
  changeType(type) {
    this.state.editing = false;
    this.setState({refreshing: false});
    this.setState({type: type});
  }

  /**
   * 修改列表编辑状态
   * @param {*} editing true-正在编辑，false-未编辑
   */
  changeEditing(editing) {
    // this.setState.refreshing = false;
    this.setState({refreshing: false});
    this.setState({editing: editing});
  }

  /**
   * 下拉刷新
   */
  onRefresh() {
    if (this.state.editing === true) {
      return;
    }
    this.setState({refreshing: true});
  }

  _renderWarnItem = info => {
    let data = info.item;
    var type = this.state.type;
    return (
      <MessageItem
        data={data}
        type={type}
        editing={this.state.editing}
        firstText={
          type === 0 ? 'car.name' : type === 1 ? '系统消息提醒' : '圈子消息提醒'
        }
        sectonText={type === 0 ? 'car.IMEI' : data.datetime}
        thirdText={
          type === 0
            ? data.datetime
            : type === 1
            ? '系统消息提醒的具体内容：车管家车管家车管家车管家车管家车管家'
            : '圈子消息提醒的具体内容'
        }
        fourthText={type === 0 ? '超速提醒' : null}
        onPressItem={info => {
          let view = type === 0 ? null : type === 1 ? 'SystemMessage' : null;
          view && this.goToView(view, info);
        }}
        onPressDeleteItem={() => this.AlertView.showAlert()}
      />
    );
  };

  _separatorline = _ => {
    return (
      <View
        style={{width: '100%', height: 1, backgroundColor: Color.jfl_CECECE}}
      />
    );
  };

  goToView(viewName, data = {}) {
    this.props.navigation && this.props.navigation.navigate(viewName, data);
  }
}

const style = StyleSheet.create({
  Search: {
    backgroundColor: Color.jfl_FFFFFF,
    color: Color.jfl_3A3A3A,
    fontSize: 14,
    borderBottomWidth: 0,
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginLeft: 15,
    marginRight: 15,
    marginVertical: 10,
    shadowColor: Color.jfl_000000,
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.1,
    borderRadius: 17.5,
  },
});
