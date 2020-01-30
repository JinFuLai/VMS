/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Text, View, Modal, Dimensions, TouchableOpacity} from 'react-native';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import {Color, StyleSheet} from './Tools';

export default class AlertView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      placeViewHeight: 0,
      checkIndex: 1,
      modalVisible: false,
    };
    this.showAlert = this.showAlert.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
    this.clickLeftBtn = this.clickLeftBtn.bind(this);
    this.clickRightBtn = this.clickRightBtn.bind(this);
  }

  static propTypes = {
    /****************是否显示************************/
    ModalVisible: PropTypes.bool, //是否显示对话框

    /********文字****************/
    TitleText: PropTypes.any, //标题文字
    DesText: PropTypes.any, //描述文字
    LeftBtnText: PropTypes.any, //左侧按钮文字
    RightBtnText: PropTypes.any, //右侧按钮文字

    /***********宽高距离*************/
    HeightModal: PropTypes.any, //这个弹窗的高度
    WidthModal: PropTypes.any, //这个弹窗的宽度
    TitleHeight: PropTypes.any, //这个弹窗的标题高度
    TitleWidth: PropTypes.any, //这个弹窗的标题宽度
    TitleMarginTop: PropTypes.any, //标题顶部距离
    TitleMarginBottom: PropTypes.any, //标题底部距离

    /********字体****************/
    TitleFontSize: PropTypes.number, //标题的文字大小
    TitleFontColor: PropTypes.any, //标题的文字颜色

    DescriptionFontSize: PropTypes.number, //描述的文字大小
    DescriptionFontColor: PropTypes.any, //描述的文字颜色

    BottomViewStyle: Text.propTypes.style, //底部视图的样式
    LeftBtnStytle: Text.propTypes.style, //左侧按钮的样式
    RightBtnStytle: Text.propTypes.style, //右侧按钮的样式
  };

  showAlert() {
    this.setState({modalVisible: true});
  }

  closeAlert() {
    this.setState({modalVisible: false});
  }

  clickLeftBtn() {
    if (this.props.clickLeftBtn) {
      this.props.clickLeftBtn();
    } else {
      this.closeAlert();
    }
  }
  clickRightBtn() {
    if (this.props.clickRightBtn) {
      this.props.clickRightBtn();
    } else {
      this.closeAlert();
    }
  }

  render() {
    return (
      <View>
        <Modal
          animationType={'fade'}
          visible={this.state.modalVisible}
          transparent={true}
          onRequestClose={() => this.setState({modalVisible: false})}>
          {this.renderContent()}
        </Modal>
      </View>
    );
  }

  renderContent() {
    return (
      <View style={styles.ViewPage}>
        <View
          style={{
            height: this.props.HeightModal ? this.props.HeightModal : 150,
            width: this.props.WidthModal ? this.props.WidthModal : 303,
            backgroundColor: 'white',
            borderRadius: 4,
            display: 'flex',
            marginBottom: this.state.placeViewHeight,
          }}>
          <View
            style={{flex: 1, justifyContent: 'space-around', marginTop: 10}}>
            {
              /********title**********/
              <View
                style={{
                  height: this.props.TitleHeight
                    ? this.props.TitleHeight
                    : this.props.HeightModal
                    ? this.props.HeightModal - 50
                    : 100,
                  width: this.props.TitleWidth ? this.props.TitleWidth : 303,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: this.props.TitleFontSize
                      ? this.props.TitleFontSize
                      : 14,
                    color: this.props.TitleFontColor
                      ? this.props.TitleFontColor
                      : '#243047',
                    marginBottom: this.props.TitleMarginBottom
                      ? this.props.TitleMarginBottom
                      : 10,
                    marginLeft: 15,
                    marginRight: 15,
                  }}>
                  {this.props.TitleText}
                </Text>
                {this.props.DesText && (
                  <Text
                    style={{
                      fontSize: this.props.TitleFontSize
                        ? this.props.TitleFontSize
                        : 14,
                      color: this.props.TitleFontColor
                        ? this.props.TitleFontColor
                        : '#243047',
                      marginBottom: this.props.TitleMarginBottom
                        ? this.props.TitleMarginBottom
                        : 10,
                      marginLeft: 15,
                      marginRight: 15,
                    }}>
                    {this.props.DesText}
                  </Text>
                )}
              </View>
            }

            <View style={{flex: 1}} />
            {/* 取消确定 */}
            <View
              style={[
                styles.defeatulBottomViewStyle,
                this.props.BottomViewStyle,
              ]}>
              <View style={styles.btnContainerStyle}>
                <TouchableOpacity
                  style={{alignItems: 'center', width: '100%'}}
                  onPress={() => this.clickLeftBtn()}>
                  <Text
                    style={[
                      styles.defeaultLeftBtnStytle,
                      this.props.LeftBtnStytle,
                    ]}>
                    {this.props.LeftBtnText ? this.props.LeftBtnText : '取消'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.btnContainerStyle}>
                <TouchableOpacity
                  style={{alignItems: 'center', width: '100%'}}
                  onPress={() => this.clickRightBtn()}>
                  <Text
                    style={[
                      styles.defeaultRightBtnStytle,
                      this.props.OKBtnStytle,
                    ]}>
                    {this.props.RightBtnText ? this.props.RightBtnText : '确定'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ViewPage: {
    width: deviceWidth,
    height: deviceHeight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  defeatulBottomViewStyle: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btnContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 15,
    height: 30,
    width: 88,
  },
  defeaultLeftBtnStytle: {
    fontSize: 15,
    textAlign: 'center',
    color: Color.jfl_FFFFFF,
    height: '100%',
    lineHeight: 30,
    width: '100%',
    backgroundColor: Color.jfl_37BCAD,
  },
  defeaultRightBtnStytle: {
    fontSize: 15,
    textAlign: 'center',
    color: Color.jfl_FFFFFF,
    height: '100%',
    lineHeight: 30,
    width: '100%',
    backgroundColor: Color.jfl_9F9F9F,
  },
});
