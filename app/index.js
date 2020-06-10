/**
 * @format
 */

import 'react-native-gesture-handler';
// import {BaiduMapManager} from 'react-native-baidu-map';
// if (Platform.OS === 'ios') {
//   BaiduMapManager.initSDK('Za6BsogYqHMDKHebmY5Hjrz4Oxsk3QjY');
// }
import {AppRegistry, Platform} from 'react-native';
// import App from './App';
import {name as appName} from './app.json';
import RooScreen from './App/RooScreen';

import {Initializer} from 'react-native-baidumap-sdk';

if (Platform.OS === 'ios') {
  Initializer.init('Za6BsogYqHMDKHebmY5Hjrz4Oxsk3QjY'); //.catch(e => console.error(e))
}

AppRegistry.registerComponent(appName, () => RooScreen);
