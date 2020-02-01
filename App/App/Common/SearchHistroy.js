import {storage} from './Storage';
export default class SearchHistroy {
  /**获取本地搜索历史 */
  static getHistroy() {
    let timeout_promise = new Promise((resolve, reject) => {
      storage
        .load({
          key: 'SearchHistroy',
        })
        .then(info => {
          if (info) {
            resolve(info);
          } else {
            reject(null);
          }
        })
        .catch(_err => {
          reject(null);
        });
    });
    let abortable_promise = Promise.race([timeout_promise]);
    return abortable_promise;
  }

  /**
   * 保存本地搜索历史
   * @param {*} histroy 搜索历史数组【string】
   */
  static saveSearchHistroy(histroy) {
    storage.save({
      key: 'SearchHistroy',
      data: histroy,
      expires: null,
    });
  }
}