/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-string-refs */
import React, {PureComponent} from 'react';
import {SectionList, View, Text, DeviceEventEmitter} from 'react-native';
import {
  StyleSheet,
  Color,
  NormalCell,
  AlertView,
  storage,
  I18n,
} from '../../Common/index';
import {Button, Item} from 'native-base';

export default class Setting extends PureComponent {
  static navigationOptions = () => ({
    title: I18n.t('my_setting'),
  });

  constructor() {
    super();
  }
  render() {
    var section = this._getDefaultData();
    return (
      <View style={{backgroundColor: Color.jfl_F7F7F7}}>
        <SectionList
          style={{height: '100%'}}
          sections={section}
          renderItem={this._renderItem}
          renderSectionHeader={this._renderSectionHeader}
          renderSectionFooter={this._renderSectionFooter}
          keyExtractor={this._keyExtractor}
          ItemSeparatorComponent={this._separator}
        />
        <AlertView
          ref="AlertView_my"
          TitleText={I18n.t('my_setting_clear_cache_tip')}
          subTitleVisible={false}
          LeftBtnText={I18n.t('ok')}
          RightBtnText={I18n.t('cancel')}
          // clickLeftBtn={()=>(this.refs.AlertView_my.closeAlert())}
          // clickRightBtn={()=>(this.refs.AlertView_my.closeAlert())}
        />
      </View>
    );
  }

  _getDefaultData = () => {
    return [
      {
        key: '0',
        title: I18n.t('my_setting_security'),
        data: [
          {key: '00', title: I18n.t('my_setting_change_password')},
          {key: '01', title: I18n.t('my_setting_change_phone')},
        ],
      },
      {
        key: '1',
        title: I18n.t('my_setting_message_notice'),
        data: [
          // {key: '10', title: '好友消息通知'},
          // {key: '11', title: '圈子消息通知'},
          {key: '12', title: I18n.t('my_setting_message_notice_system')},
          {key: '13', title: I18n.t('my_setting_message_notice_warning')},
        ],
      },
      {
        key: '2',
        title: I18n.t('my_setting_basic'),
        data: [
          {key: '20', title: I18n.t('my_setting_language')},
          // {key: '21', title: I18n.t('my_setting_clear_cache')},
          // {key: '22', title: '清空聊天记录'},
        ],
      },
      {
        key: '3',
        title: '',
        data: [{key: '30', title: I18n.t('my_setting_quit')}],
      },
    ];
  };
  _keyExtractor = (info, index) => {
    return index;
  };

  _renderSectionHeader = info => {
    let section = info.section;
    if (section.key == '3') {
      //退出登录
      return;
    } else {
      return <Text style={style.sectionHeaderStyle}>{section.title}</Text>;
    }
  };

  _renderSectionFooter() {
    return <View style={style.sectionFooterStyle} />;
  }

  _renderItem = info => {
    if (info.section.key == 3) {
      //退出登录
      return (
        <Item
          style={style.logoutStyle}
          onPress={() => {
            storage.remove({key: 'User'});
            this.props.navigation.popToTop();
            DeviceEventEmitter.emit('RootGoToView', 'Login');
          }}>
          <Text>{I18n.t('my_setting_quit')}</Text>
        </Item>
      );
    } else {
      let item = info.item;
      let isArrow = info.section.key != '1';
      var hasLab = false;
      if (info.section.key == 2 && info.index == '1') {
        hasLab = true;
      }
      return (
        <NormalCell
          title={item.title}
          isArrow={isArrow}
          hasLab={hasLab}
          describe={'21.9M'}
          onPress={() => this._onPressItem(info.section.key, info.index)}
        />
      );
    }
  };

  _separator() {
    return <View style={{height: 0.5, backgroundColor: Color.jfl_DCDCDC}} />;
  }

  _goToView = (viewName, data = null) => {
    const {navigate} = this.props.navigation;
    navigate(viewName, {data: data});
  };

  _onPressItem = (section, row) => {
    if (section == 0) {
      if (row == 0) {
        this._goToView('ChangePswGetVerification');
      } else if (row == 1) {
        this._goToView('ChangePhoneGetVerification');
      }
    } else if (section == 2) {
      if (row == 0) {
        this._goToView('Language', null);
      } else if (row == 1) {
        this.refs.AlertView_my.showAlert();
      }
    }
  };

  componentDidMount() {
    this._laguageLister = DeviceEventEmitter.addListener(
      'LanguageEvent',
      () => {
        this.forceUpdate();
      },
    );
  }

  componentWillUnmount() {
    this._laguageLister.remove();
  }
}

const style = StyleSheet.create({
  sectionHeaderStyle: {
    color: Color.jfl_353535,
    fontSize: 14,
    height: 33,
    paddingLeft: 14,
    paddingRight: 14,
    lineHeight: 33,
    backgroundColor: Color.jfl_FFFFFF,
  },
  sectionFooterStyle: {
    height: 10,
  },
  logoutStyle: {
    backgroundColor: Color.jfl_FFFFFF,
    height: 44,
    justifyContent: 'center',
  },
});
