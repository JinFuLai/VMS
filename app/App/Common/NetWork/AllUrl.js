/* jshint esversion: 6 */
import {Component} from 'react';

/*基本接口*/
// export const baseUrl = 'http://jinfulaikeji.com:2000/api';
export const baseUrl = 'http://192.168.0.194:2000/api';
// export const baseUrl = 'http://192.168.0.103:2000/api';
// export const baseUrl = 'http://192.168.1.111:2000/api';

export default class AllUrl extends Component {

  /**系统相关 */
  static System = {
    MapType: baseUrl + '/system/maptype',
  }

  /**用户相关接口地址 */
  static User = {
    /**登录 */
    Login: baseUrl + '/user/login',
    /**获取所有用户 */
    List: baseUrl + '/user/list',
    /**获取用户信息 */
    User: baseUrl + '/user/user',
    /**创建用户 */
    Create: baseUrl + '/user/create',
    /** */
    Delete: baseUrl + '/user/delete',
    /**更新用户信息 */
    Update: baseUrl + '/user/update',
    /**修改用户密码 */
    ChangePassword: baseUrl + '/user/changePassword',
    /**意见反馈 */
    Feedback: baseUrl + '/user/feedback',
    /**上传头像 */
    UpdatePhoto: baseUrl + '/user/updatePhoto',
  };

  /**车辆 */
  static Vehicle = {
    /**获取所有车辆 */
    All: baseUrl + '/vehicle/all',
    /**根据车牌号或者IMEI码查询相关车辆(可选择模糊查询) */
    Search: baseUrl + '/vehicle/search',
    /**根据车辆id获取车辆位置信息 */
    Location: baseUrl + '/vehicle/location',
    /**车辆查询 */
    List: baseUrl + '/vehicle/list',
    /**创建车辆 */
    CreateVehicle: baseUrl + '/vehicle/createVehicle',
    /**创建车辆类型 */
    CreateVehicleType: baseUrl + '/vehicle/createVehicleType',
    /**创建车辆品牌 */
    CreateVehicleBrand: baseUrl + '/vehicle/createVehicleBrand',
    /**创建车辆颜色 */
    CreateVehicleColor: baseUrl + '/vehicle/createVehicleColor',
    /**获取告警消息列表 */
    warnMsg: baseUrl + '/vehicle/alarmMessage',
    /**获取历史轨迹 */
    Histroy: baseUrl + '/vehicle/history',
  };
}
