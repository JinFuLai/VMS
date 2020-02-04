/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';
import {SectionList, View, Text} from 'react-native';
import {StyleSheet, Color, I18n} from '../../Common/index';
import HelpCell from './HelpCell';

export default class Help extends PureComponent {
  static navigationOptions = {
    title: I18n.t('my_help'),
  };
  constructor() {
    super();
    this.state = {
      data: [
        {
          title: '怎么拉黑好友？',
          describe:
            '在好友聊天界面里面点击更多操作里面有一个拉黑好友，点击即可。',
        },
        {
          title: '怎么找到拉黑的好友？',
          describe:
            '风萧萧兮易水寒，壮士一去兮不复还，探虎穴兮入蛟宫，仰天呼气兮成白虹。',
        },
        {
          title: '怎么查看我的车的定位？',
          describe: '大风起兮云飞扬，威加海内兮归故乡，安得猛士兮守西方。',
        },
        {
          title: '怎么查看车的基本信息？',
          describe: '有一美人兮，见之不忘。一日不见兮，思之如狂',
        },
        {
          title: '怎么找到企业车辆的详细信息？',
          describe: '耸轻躯以鹤立，若将飞而未翔',
        },
      ],
    };
  }
  render() {
    var sections = [];
    var array = [];
    for (var index = 0; index < this.state.data.length; index++) {
      const element = this.state.data[index];
      array.push({key: index, name: element.title, describe: element.describe});
    }
    sections.push({key: '热点问题', data: array});
    return (
      <View style={{backgroundColor: Color.jfl_F7F7F7, height: '100%'}}>
        <SectionList
          sections={sections}
          keyExtractor={item => item.key}
          renderItem={this._renderItem}
          renderSectionHeader={this._renderSectionHeader}
          ItemSeparatorComponent={this._separator}
        />
      </View>
    );
  }
  _renderSectionHeader = info => {
    let section = info.section.key;
    return <Text style={style.sectionStyle}>{section}</Text>;
  };

  _renderItem = info => {
    let item = info.item;
    return <HelpCell title={item.name} describe={item.describe} />;
  };

  _separator() {
    return <View style={{height: 0.5, backgroundColor: Color.jfl_DCDCDC}} />;
  }
}

const style = StyleSheet.create({
  sectionStyle: {
    height: 40,
    paddingLeft: 14,
    color: Color.jfl_353535,
    fontSize: 14,
    lineHeight: 40,
    backgroundColor: Color.jfl_F7F7F7,
  },
  itemStyle: {
    height: 42,
    paddingLeft: 14,
    color: Color.jfl_353535,
    fontSize: 14,
    lineHeight: 42,
    backgroundColor: Color.jfl_FFFFFF,
  },
});
