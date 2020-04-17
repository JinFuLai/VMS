/* jshint esversion: 6 */
import {
  StyleSheet as RnStyleSheet,
  // ViewStyle,
  // TextStyle,
  // ImageStyle,
  Dimensions,
} from 'react-native';

// type StyleProps = Partial<ViewStyle | TextStyle | ImageStyle>;
//以前无法获取属性，故用此发
// export const StyleSheet = {
//   create(styles: {[className: string]: StyleProps}) {
//     return RnStyleSheet.create(styles);
//   },
// };
export const StyleSheet = RnStyleSheet;

export const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  ScreenWidth: Dimensions.get('screen').width,
  ScreenHeight: Dimensions.get('screen').height,
};

export const Color = {
  jfl_clear: 'transparent',
  jfl_37BCAD: '#37BCAD',
  jfl_D35454: '#D35454',
  jfl_353535: '#353535',
  jfl_FFFFFF: '#FFFFFF',
  jfl_9F9F9F: '#9F9F9F',
  jfl_F7F7F7: '#F7F7F7',
  jfl_E9E9E9: '#E9E9E9',
  jfl_DCDCDC: '#DCDCDC',
  jfl_3A3A3A: '#3A3A3A',
  jfl_383838: '#383838',
  jfl_21D06B: '#21D06B',
  jfl_DDDDDD: '#DDDDDD',
  jfl_CECECE: '#CECECE',
  jfl_2A2A2A: '#2A2A2A',
  jfl_545454: '#545454',
  jfl_000000: '#000000',
  jfl_7E7C7C: '#7E7C7C',
  jfl_5C5C5C: '#5C5C5C',
  jfl_373737: '#373737',
  jfl_111111: '#111111',
  jfl_3BBC72: '#3BBC72',
  jfl_333333: '#333333',
  jfl_E43744: '#E43744',
  jfl_DB4141: '#DB4141',
  jfl_B2B2B2: '#B2B2B2',
  jfl_717171: '#717171',
  jfl_5B5B5B: '#5B5B5B',
  jfl_4F4F4F: '#4F4F4F',
  jfl_282828: '#282828',
  jfl_565656: '#565656',
}; 

/**
 * 抽离成公共方法
 */
export function awaitWrap(promise) {
  return promise
    .then(data => {
      return [null, data];
    })
    .catch(err => {
      return [err, null];
    });
}