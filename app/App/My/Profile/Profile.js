/* eslint-disable handle-callback-err */
/* eslint-disable no-bitwise */
/* eslint-disable react-native/no-inline-styles */
/* jshint esversion: 6 */
import React from 'react';
import {
  Color,
  I18n,
  storage,
  Loading,
  Toast,
  HttpUtils,
  PickerView,
  BaseComponent,
  UserInfo,
} from '../../Common/index';
import {Item, Container, Input, Button, Text, Thumbnail} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import {Keyboard} from 'react-native';

const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
  maxWidth: 150,
  maxHeight: 150,
  allowsEditing: true,
  videoQuality: 'medium',
};
export default class ProfileScreen extends BaseComponent {
  static navigationOptions = ({navigation}) => ({
    title: I18n.t('my_profile'),
    headerRight: () => {
      <Button transparent onPress={() => navigation.state.params.saveUser()}>
        <Text style={{color: Color.jfl_FFFFFF}}>{I18n.t('save')}</Text>
      </Button>
    },
  });
  constructor() {
    super();
    this.state = {
      ...this.state, //共用父类属性
      user: null,
      selectedImg: null, // 图片选择时的图片
    };
  }

  render() {
    let user = this.state.user;
    if (user == null) {
      return <Container>{this.state.isRefresh ? <Loading /> : null}</Container>;
    } else {
      return (
        <Container style={{backgroundColor: Color.jfl_F7F7F7}}>
          {this.returnItem(
            I18n.t('my_username'),
            'username',
            user.username,
            false,
          )}
          {this.returnImgItem()}
          {this.returnItem(I18n.t('my_gender'), 'gender', user.gender)}
          {this.returnItem(
            I18n.t('my_contact_first_name'),
            'contact.first_name',
            user.contact && user.contact.first_name,
          )}
          {this.returnItem(
            I18n.t('my_contact_last_name'),
            'contact.last_name',
            user.contact && user.contact.last_name,
          )}
          {this.returnItem(
            I18n.t('my_contact_mobile'),
            'contact.mobile',
            user.contact && user.contact.mobile,
          )}
          {this.returnItem(
            I18n.t('my_contact_qq'),
            'contact.QQ',
            user.contact && user.contact.QQ,
          )}
          {this.returnItem(
            I18n.t('my_contact_email'),
            'contact.email',
            user.contact && user.contact.email,
          )}
          {this.state.isRefresh ? <Loading /> : null}
          <PickerView
            ref={ref => (this.PickerView = ref)}
            callOneValue={(value, tag) => this.callOneValue(value, tag)}
          />
        </Container>
      );
    }
  }

  componentDidMount() {
    //在初始化render之后只执行一次，在这个方法内，可以访问任何组件，componentDidMount()方法中的子组件在父组件之前执行
    this.props.navigation.setParams({
      saveUser: () => this._clickSaveBtn(),
    });
    this._loadUserInfo();
  }

  componentWillUnmount = () => {
    super.componentWillUnmount();
    this.PickerView && this.PickerView.hide();
  };

  /**
   * 返回单元格
   * @param {*} 标题
   * @param {*} 用于修改的user的属性名称(层级之间用‘.’隔开，最多三级，如first.second.third)
   * @param {*} 显示的信息
   * @param {*} 是否能被编辑
   */
  returnItem(title, attribute, info, editable = true) {
    let attrs = attribute.split('.', 3);
    if (attrs.lenght <= 0) {
      return;
    }
    let firstAttri = attrs[0];
    let secondAttri = attrs[1];
    let thirdAttri = attrs[2];
    var noInput = firstAttri === 'gender';
    return (
      <Item
        onPress={() => {
          if (noInput && firstAttri === 'gender') {
            Keyboard.dismiss();
            this.PickerView.showArray(['man', 'woman', 'secret'], firstAttri);
          }
        }}
        style={{
          paddingHorizontal: 15,
          height: 44,
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 14, color: Color.jfl_565656}}>
          {title ?? '标题'}
        </Text>
        {noInput ? (
          <Text
            style={{
              textAlign: 'right',
              fontSize: 15,
              lineHeight: 20,
              marginLeft: 10,
              marginVertical: 4,
              maxHeight: 20,
              color: editable ? Color.jfl_282828 : Color.jfl_B2B2B2,
            }}>
            {info}
          </Text>
        ) : (
          <Input
            style={{
              textAlign: 'right',
              fontSize: 15,
              lineHeight: 20,
              marginLeft: 10,
              marginVertical: 4,
              maxHeight: 20,
              padding: 0,
              color: editable ? Color.jfl_282828 : Color.jfl_B2B2B2,
            }}
            editable={editable}
            placeholder="请输入"
            defaultValue={info}
            onChangeText={text => {
              let user = this.state.user;
              if (firstAttri && secondAttri && thirdAttri) {
                if (user[firstAttri] == null) {
                  user[firstAttri] = {};
                }
                if (user[firstAttri][secondAttri] == null) {
                  user[firstAttri][secondAttri] = {};
                }
                user[firstAttri][secondAttri][thirdAttri] = text;
              } else if (firstAttri && secondAttri) {
                if (user[firstAttri] == null) {
                  user[firstAttri] = {};
                }
                user[firstAttri][secondAttri] = text;
              } else if (firstAttri) {
                user[firstAttri] = text;
              }
            }}
          />
        )}
      </Item>
    );
  }

  /**
   * 返回头像栏
   */
  returnImgItem() {
    return (
      <Item
        onPress={() => this.changeImg()}
        style={{
          paddingHorizontal: 15,
          height: 44,
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 14, color: Color.jfl_565656}}>
          {I18n.t('my_photo')}
        </Text>
        <Thumbnail
          source={
            this.state.selectedImg
              ? {uri: this.state.selectedImg.uri}
              : this.state.user.photo
              ? {uri: this.state.user.photo}
              : require('../../Source/Img/My/My/touxiang.png')
          }
          defaultSource={require('../../Source/Img/My/My/touxiang.png')}
          style={{width: 30, height: 30}}
        />
      </Item>
    );
  }

  /**
   * 选择图片
   */
  changeImg() {
    Keyboard.dismiss();
    ImagePicker.showImagePicker(options, response => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({selectedImg: response});
      }
    });
  }

  /**点击保存按钮 */
  _clickSaveBtn() {
    Keyboard.dismiss();
    let user = this.state.user;
    if (user == null) {
      return;
    }
    this.setState({isRefresh: true});
    if (this.state.selectedImg) {
      this._updateUserPhoto(this.state.selectedImg);
    } else {
      this._updateUserInfo();
    }
  }

  /**加载用户信息 */
  _loadUserInfo() {
    this.setState({isRefresh: true});
    HttpUtils.getRequest(HttpUtils.AllUrl.User.User, true).then(response => {
      if (this.unmount) {
        return;
      }
      this.setState({isRefresh: false});
      if ((response.code === 200) & (response.data !== null)) {
        UserInfo.saveUserInfo(response.data);
        this.setState({user: response.data});
      } else {
        Toast.show(response.message);
      }
    });
  }

  /**
   * 更新用户头像
   * @param {*} img 选择的头像
   */
  _updateUserPhoto(img) {
    let formData = new FormData();
    let file = {
      uri: img.uri ? img.uri : '',
      type: img.type ? img.type : 'image/jpeg',
      name: img.fileName ? img.fileName : 'default' + Math.random().toString(),
    };
    formData.append('photo', file);
    var _this = this;
    HttpUtils.updateImg(HttpUtils.AllUrl.User.UpdatePhoto, true, formData).then(
      response => {
        if (_this.unmount) {
          return;
        }
        if (response) {
          if ((response.code === 200) & (response.data !== null)) {
            _this.state.user.photo = response.data;
            //TODO:头像修改成功后，在修改用户信息
            _this._updateUserInfo();
          } else {
            _this.setState({isRefresh: false});
            Toast.show(response.message);
          }
        }
      },
    );
  }

  /**更新用户信息 */
  _updateUserInfo() {
    var _this = this;
    HttpUtils.postRequest(
      HttpUtils.AllUrl.User.Update,
      true,
      this.state.user,
    ).then(response => {
      if (_this.unmount) {
        return;
      }
      _this.setState({isRefresh: false});
      if (response) {
        if ((response.code === 200) & (response.data !== null)) {
          UserInfo.saveUserInfo(response.data);
          Toast.show(response.message);
          _this.props.navigation.state.params.refresh();
          _this.props.navigation.goBack();
        } else {
          Toast.show(response.message);
        }
      }
    });
  }

  /**
   * picker的回调方法
   * @param {*} value picker选中的值
   * @param {*} tag picker的标记
   */
  callOneValue(value, tag = null) {
    let user = this.state.user;
    if (user) {
      if (tag) {
        user[tag] = value[0];
        // this.setState({user: user});
        this.forceUpdate();
      }
    }
  }
}
