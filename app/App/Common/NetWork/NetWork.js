/* jshint esversion: 6 */
/** 基于fetch 封装的网络请求工具类 **/
import {Component} from 'react';
import {DeviceEventEmitter} from 'react-native';
import {storage} from '../Storage';
import AllUrl from './AllUrl';
import {I18n} from '../Language/I18n';

const RequestType = {
  POST: 'POST',
  GET: 'GET',
};

function getHeader(haveToken) {
  var header = {Accept: 'application/json', 'Content-Type': 'application/json'};
  let timeout_promise = new Promise((resolve, reject) => {
    if (haveToken) {
      storage
        .load({
          key: 'User',
        })
        .then(user => {
          if (user) {
            header.token = user.token;
            resolve(header);
          } else {
            reject(I18n.t('not_logged_in'));
          }
        })
        .catch(err => {
          reject(err.name);
        });
    } else {
      resolve(header);
    }
  });
  let abortable_promise = Promise.race([timeout_promise]);

  return abortable_promise;
}

/**
 * GET 请求时，拼接请求URL
 * @param url 请求URL
 * @param params 请求参数
 * @returns {*}
 */
const handleUrl = url => params => {
  if (params) {
    let paramsArray = [];
    Object.keys(params).forEach(key =>
      paramsArray.push(key + '=' + encodeURIComponent(params[key])),
    );
    if (url.search(/\?/) === -1) {
      typeof params === 'object' ? (url += '?' + paramsArray.join('&')) : url;
    } else {
      url += '&' + paramsArray.join('&');
    }
  }
  return url;
};

/**
 * fetch 网络请求超时处理
 * @param original_promise 原始的fetch
 * @param timeout 超时时间 90s
 * @returns {Promise.<*>}
 */
const timeoutFetch = (original_fetch, timeout = 90000) => {
  let timeoutBlock = () => {};
  let timeout_promise = new Promise((resolve, reject) => {
    timeoutBlock = () => {
      // 请求超时处理
      reject(I18n.t('timeout_promise'));
    };
  });

  // Promise.race(iterable)方法返回一个promise
  // 这个promise在iterable中的任意一个promise被解决或拒绝后，立刻以相同的解决值被解决或以相同的拒绝原因被拒绝。
  let abortable_promise = Promise.race([original_fetch, timeout_promise]);

  setTimeout(() => {
    timeoutBlock();
  }, timeout);

  return abortable_promise;
};

/**
 * 返回对象工具
 * @param {*} code 错误码
 * @param {*} data 参数
 * @param {*} message
 */
function returnHelper(code: Number, message: String, data = null) {
  return {code: code, message: message, data: data};
}

/**
 * 网络请求工具类
 */
export default class HttpUtils extends Component {
  /**所有的地址 */
  static AllUrl = AllUrl;

  /**
   * GET 请求
   * @param url 请求URL
   * @param haveToken 是否包含token
   * @param params 请求参数
   * @returns {Promise}
   */
  static getRequest(url, haveToken = true, params = {}) {
    return this.jfl_Request(url, RequestType.GET, false, haveToken, params);
  }

  /**
   * POST 请求
   * @param url 请求的URL
   * @param haveToken 是否包含token
   * @param params 请求参数
   * @returns {Promise}
   */
  static postRequest(url, haveToken = true, params = {}) {
    return this.jfl_Request(url, RequestType.POST, true, haveToken, params);
  }

  /**
   * POST 请求(参数在url中)
   * @param url 请求的URL
   * @param haveToken 是否包含token
   * @param params 请求参数
   * @returns {Promise}
   */
  static postRequest_inUrl(url, haveToken = true, params = {}) {
    return this.jfl_Request(url, RequestType.POST, false, haveToken, params);
  }

  /**
   * 上传图片
   * @param url 请求的URL
   * @param haveToken 是否包含token
   * @param params 请求参数
   * @returns {Promise}
   */
  static updateImg(url, haveToken = true, params = {}) {
    let promise = new Promise((resolve, reject) => {
      getHeader(haveToken)
        .then(header => {
          header['Content-Type'] = 'multipart/form-data';
          timeoutFetch(
            this.getFetch(url, header, RequestType.POST, true, params, false),
          )
            .then(response => {
              response
                .json()
                .then(json => {
                  if (json.code === 456) {
                    storage.remove({key: 'User'});
                    DeviceEventEmitter.emit('RootGoToView', 'Login');
                  } else {
                    resolve(returnHelper(json.code, json.message, json.data));
                  }
                })
                .catch(err => {
                  //json解析错误
                  resolve(
                    returnHelper(400, err.message ? err.message : 'error'),
                  );
                });
            })
            .catch(err => {
              // 自定义超时和网络问题的错误,需要再重新写
              resolve(returnHelper(400, err.toString()));
            });
        })
        .catch(tokenErr => {
          //token获取错误
          resolve(returnHelper(400, tokenErr.toString()));
        });
    });
    let return_promise = Promise.resolve(promise);
    return return_promise;
  }

  /**
   * 基于fetch 的基本类请求
   * @param {*} url
   * @param {*} method 方法类型
   * @param {*} paramInBody 请求参数是否在body中
   * @param {*} haveToken 是否包含token
   * @param {*} params 请求参数
   * @param {*} toJson 当参数在boddy中是，是否转换为json
   */
  static jfl_Request(
    url,
    method = RequestType.POST,
    paramInBody = true,
    haveToken = true,
    params = {},
    toJson = true,
  ) {
    let promise = new Promise((resolve, reject) => {
      getHeader(haveToken)
        .then(header => {
          timeoutFetch(
            this.getFetch(url, header, method, paramInBody, params, toJson),
          )
            .then(response => {
              response
                .json()
                .then(json => {
                  if (json.code === 456) {
                    storage.remove({key: 'User'});
                    DeviceEventEmitter.emit('RootGoToView', 'Login');
                  } else {
                    resolve(returnHelper(json.code, json.message, json.data));
                  }
                })
                .catch(err => {
                  //json解析错误
                  resolve(
                    returnHelper(400, err.message ? err.message : 'error'),
                  );
                });
            })
            .catch(err => {
              // 自定义超时和网络问题的错误,需要再重新写
              resolve(returnHelper(400, err.toString()));
            });
        })
        .catch(tokenErr => {
          //token获取错误
          resolve(returnHelper(400, tokenErr.toString()));
        });
    });
    let return_promise = Promise.resolve(promise);
    return return_promise;
  }

  /**
   * 生成fetch
   * @param {*} url 地址
   * @param {*} header header
   * @param {*} method 请求类型
   * @param {*} paramInBody 请求参数是否在body中
   * @param {*} params 请求参数
   * @param {*} toJson 当参数在boddy中是，是否转换为json
   */
  static getFetch(
    url,
    header,
    method,
    paramInBody,
    params = {},
    toJson = true,
  ) {
    let fetchMethod = fetch(handleUrl(url)(paramInBody ? null : params), {
      method: method,
      headers: header,
      body: paramInBody ? (toJson ? JSON.stringify(params) : params) : null,
    });
    return fetchMethod;
  }
}
