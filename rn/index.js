/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
// import App from './App';
import {name as appName} from './app.json';
import RooScreen from './App/RooScreen';

// import { Initializer } from 'react-native-baidumap-sdk'

// Initializer.init('FKNzI3CxD0GQwYagDOSfnHUGUfZgcNia')//.catch(e => console.error(e))

// import { BaiduMapManager } from 'react-native-baidu-map'
// BaiduMapManager.initSDK('Y6g38tcES9avRGkcKR1GbbRttVinqueq');

AppRegistry.registerComponent(appName, () => RooScreen);
