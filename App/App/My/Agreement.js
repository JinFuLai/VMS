/* jshint esversion: 6 */
import React, {PureComponent} from 'react';
import {WebView} from 'react-native-webview';
import {I18n} from '../Common/index';

export default class Agreement extends PureComponent {
  static navigationOptions = _ => ({
    title: I18n.t('my_agreement'),
  });
  render() {
    return <WebView source={{uri: 'https://www.baidu.com'}} />;
  }
}
