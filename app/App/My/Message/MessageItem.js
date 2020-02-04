/* eslint-disable react-native/no-inline-styles */
import {Color, StyleSheet, I18n} from '../../Common/index';
import {Text, View, Grid, Row, Col, Button, Thumbnail, Icon} from 'native-base';
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {SwipeRow} from 'react-native-swipe-list-view';

export default class MessageItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    };
    this._selectCell = this._selectCell.bind(this);
  }
  static propTypes = {
    data: PropTypes.any, //数据
    firstText: PropTypes.any, //第一个文字
    sectonText: PropTypes.any, //第二个文字
    thirdText: PropTypes.any, //第三个文字
    fourthText: PropTypes.any, //第四个文字
    onPressItem: PropTypes.func, //点击事件
    onPressDeleteItem: PropTypes.func, //点击删除事件
    editing: PropTypes.bool, //是否是编辑状态
    type: PropTypes.number, //0-警告消息，1-系统消息，2-圈子消息
  };

  render() {
    var data = this.props.data;
    return (
      <SwipeRow
        rightOpenValue={-75}
        stopLeftSwipe={0.1}
        stopRightSwipe={-300}
        disableLeftSwipe={true} //{!(this.props.editing ?? false)}
        closeOnRowPress>
        <View style={style.Hidden}>
          <Button
            style={{paddingVertical: 14.5, height: '100%', backgroundColor: ''}}
            onPress={() =>
              this.props.onPressDeleteItem && this.props.onPressDeleteItem(data)
            }>
            <Text style={{fontSize: 13}}>{I18n.t('delete')}</Text>
          </Button>
        </View>
        <Button
          style={style.Visible}
          onPress={() => {
            if (this.props.editing) {
              this._selectCell();
            } else {
              this.props.onPressItem && this.props.onPressItem(data);
            }
          }}
          activeOpacity={1}>
          <Grid style={{height: '100%'}}>
            {this.props.editing ? (
              <Col style={{width: 45}}>
                <Button
                  style={{backgroundColor: ''}}
                  onPress={this._selectCell}>
                  <Row style={{justifyContent: 'center'}}>
                    <Thumbnail
                      square
                      style={style.Img}
                      source={
                        this.state.focused
                          ? require('../../Source/Img/Home/Home_search_6/gou.png')
                          : require('../../Source/Img/Home/Home_search_6/yuan.png')
                      }
                    />
                  </Row>
                </Button>
              </Col>
            ) : (
              <Col style={{width: 20}} />
            )}
            <Col>
              <Row style={{justifyContent: 'space-between'}}>
                <Text style={style.Text}>{this.props.firstText}</Text>
                <Text style={style.Text}>{this.props.sectonText}</Text>
              </Row>
              <Row style={{justifyContent: 'space-between'}}>
                <Text style={style.Text}>{this.props.thirdText}</Text>
                {this.props.type === 0 ? (
                  <Text
                    style={{
                      fontSize: 12,
                      color: Color.jfl_DB4141,
                      paddingVertical: 4,
                      alignSelf: 'flex-end',
                    }}>
                    {this.props.fourthText}
                  </Text>
                ) : (
                  <Icon />
                )}
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

const style = StyleSheet.create({
  Hidden: {
    height: 60,
    backgroundColor: Color.jfl_E43744,
    flexDirection: 'row-reverse',
  },
  Visible: {
    width: '100%',
    height: 60,
    backgroundColor: Color.jfl_FFFFFF,
    borderRadius: 0,
  },
  Img: {
    width: 17,
    height: 17,
  },
  Text: {
    paddingVertical: 4,
    color: Color.jfl_3A3A3A,
    fontSize: 12,
  },
});
