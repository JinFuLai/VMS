/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Color, I18n} from '../../Common/index';
import {
  ListItem,
  Text,
  Right,
  Thumbnail,
  Grid,
  Row,
  Button,
  View,
  Item,
} from 'native-base';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// 每项的标题栏
export class ListHomeSection extends Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    name: PropTypes.any, //标题
    show: PropTypes.bool, //是否展示
    onPress: PropTypes.any, //点击事件
  };

  render() {
    return (
      <View style={{backgroundColor: Color.jfl_FFFFFF, flex: 1}}>
        <Item
          style={ListHomeComponentStyle.sectionContentStyle}
          onPress={this.props.onPress}>
          <Grid>
            <Row style={{alignItems: 'center', paddingHorizontal: 16}}>
              <Text style={ListHomeComponentStyle.sectionTitleStyle}>
                {this.props.name}
              </Text>
              <Right>
                <Thumbnail
                  square
                  source={
                    this.props.show
                      ? require('../../Source/Img/List/List/arrows2.png')
                      : require('../../Source/Img/List/List/arrows.png')
                  }
                  style={ListHomeComponentStyle.sectionImageStyle}
                />
              </Right>
            </Row>
          </Grid>
        </Item>
      </View>
    );
  }
}

//单元格
export class ListHomeItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    };
    this._touchCell = this._touchCell.bind(this);
  }
  static propTypes = {
    data: PropTypes.any, //数据
    Image: PropTypes.any, //图片
    CarNum: PropTypes.any, //车牌号
    DeviceNum: PropTypes.any, //设备号
    status: PropTypes.any, //是否正在驾驶
    clickDetailsBtn: PropTypes.any, //点击事件
  };

  render() {
    return (
      <ListItem onPress={this._touchCell}>
        <Grid>
          <Row style={ListHomeComponentStyle.itemTopStyle}>
            <Thumbnail
              square
              source={this.props.Image}
              style={ListHomeComponentStyle.itemImageStyle}
            />
            <View style={ListHomeComponentStyle.itemTitleContentStyle}>
              <Text style={ListHomeComponentStyle.itemTitleStyle}>
                {I18n.t('car_num') + ' :  ' + this.props.CarNum}
              </Text>
              <Text style={ListHomeComponentStyle.itemTitleStyle}>
                {I18n.t('car_device_num') + ' :  ' + this.props.DeviceNum}
              </Text>
            </View>
            {this.props.status ? (
              <Text style={ListHomeComponentStyle.itemRightGreenStyle}>
                {this.props.status === 'ACTIVE'
                  ? I18n.t('car_driving')
                  : I18n.t('car_motionless')}
              </Text>
            ) : (
              <Text style={ListHomeComponentStyle.itemRightGrayStyle}>
                {I18n.t('car_motionless')}
              </Text>
            )}
          </Row>
          {this.state.focused ? (
            <Row style={ListHomeComponentStyle.itemBottomStyle}>
              <ListHomeItemButton
                TitleText={I18n.t('car_location')}
                Image={require('../../Source/Img/List/List_Touch/dingwei.png')}
                onPress={() => {
                  if (this.props.clickDetailsBtn != null) {
                    this.props.clickDetailsBtn(1, this.props.data);
                  }
                }}
              />
              <ListHomeItemButton
                TitleText={I18n.t('car_history')}
                Image={require('../../Source/Img/List/List_Touch/guiji.png')}
                onPress={() => {
                  if (this.props.clickDetailsBtn != null) {
                    this.props.clickDetailsBtn(2, this.props.data);
                  }
                }}
              />
              <ListHomeItemButton
                TitleText={I18n.t('car_warnning')}
                Image={require('../../Source/Img/List/List_Touch/gaojing.png')}
                onPress={() => {
                  if (this.props.clickDetailsBtn != null) {
                    this.props.clickDetailsBtn(3, this.props.data);
                  }
                }}
              />
              <ListHomeItemButton
                TitleText={I18n.t('car_details')}
                Image={require('../../Source/Img/List/List_Touch/xiangqing.png')}
                onPress={() => {
                  if (this.props.clickDetailsBtn != null) {
                    this.props.clickDetailsBtn(4, this.props.data);
                  }
                }}
              />
              <Thumbnail
                square
                source={require('../../Source/Img/List/List_Touch/shuangjiantou.png')}
                style={{width: 13, height: 13}}
              />
            </Row>
          ) : null}
        </Grid>
      </ListItem>
    );
  }

  _touchCell = () => {
    this.setState({focused: !this.state.focused});
  };
}

// 单元格底部详情按钮
export class ListHomeItemButton extends Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    TitleText: PropTypes.any, //标题文字
    Image: PropTypes.any, //图片
    onPress: PropTypes.any, //点击事件
  };

  render() {
    return (
      <Button transparent onPress={this.props.onPress}>
        <Thumbnail
          square
          source={this.props.Image}
          style={{width: 22.5, height: 22.5}}
        />
        <Text style={{color: Color.jfl_2A2A2A, fontSize: 12}}>
          {this.props.TitleText}
        </Text>
      </Button>
    );
  }
}

const ListHomeComponentStyle = StyleSheet.create({
  sectionContentStyle: {
    backgroundColor: Color.jfl_DDDDDD,
    marginTop: 14,
    height: 31,
  },
  sectionTitleStyle: {
    color: Color.jfl_3A3A3A,
    fontSize: 14,
  },
  sectionImageStyle: {
    // marginTop:2.5,
    width: 12,
    height: 7,
  },
  itemTopStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 38.5,
  },
  itemBottomStyle: {
    flexDirection: 'row',
    alignContent: 'space-between',
    height: 34.5,
  },
  itemImageStyle: {
    width: 25,
    height: 25,
    marginRight: 25,
  },
  itemTitleContentStyle: {
    flexDirection: 'column',
    flex: 1,
  },
  itemTitleStyle: {
    color: Color.jfl_3A3A3A,
    fontSize: 12,
  },
  itemRightGrayStyle: {
    color: Color.jfl_383838,
    fontSize: 13,
  },
  itemRightGreenStyle: {
    color: Color.jfl_21D06B,
    fontSize: 13,
  },
});
