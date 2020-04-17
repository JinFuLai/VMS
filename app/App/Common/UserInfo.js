import {storage} from './Storage';

export default class UserInfo {
  /**用于存储当前登录的用户 */
  static user = null;

  /**
   * 加载本地用户信息
   */
  static loadLocalUserInfo() {
    let promise = new Promise((resolve, reject) => {
      storage
        .load({
          key: 'User',
        })
        .then(info => {
          UserInfo.user = info;
          resolve(info);
        })
        .catch(err => {
          // switch (err.name) {
          //   case 'NotFoundError':
          //     // TODO;
          //     break;
          //   case 'ExpiredError':
          //     // TODO
          //     break;
          // }
          reject(err);
        });
    });
    return Promise.resolve(promise);
  }

  /**修改并更新本地用户信息 */
  static saveUserInfo(user) {
    UserInfo.user = user;
    storage.save({
      key: 'User',
      data: user,
      expires: 1000 * 3600 * 24 * 30,
    });
  }
}
