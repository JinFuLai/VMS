/* jshint esversion: 6 */
import {Color, Screen} from '../Common/index';
import {StyleSheet} from 'react-native';

export const Style = StyleSheet.create({
  top: {
    width: Screen.width,
    height: Screen.height * 0.3,
    backgroundColor: Color.jfl_37BCAD,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 0,
  },
  bottom: {
    flexDirection: 'column',
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 0,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  bottomBgImg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'contain',
  },
  bottomInputV: {
    flexDirection: 'column',
    borderRadius: 4,
    backgroundColor: Color.jfl_FFFFFF,
    elevation: 9,
    shadowRadius: 4,
    alignItems: 'flex-end',
    transform: [{translateY: -36}],
    width: Screen.width - 72,
    padding: 21,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowColor: Color.jfl_373737,
    shadowOpacity: 0.5,
  },
  inputImg: {
    width: 15.5,
    height: 18.5,
  },
  inputText: {
    fontSize: 14,
    marginLeft: 15,
  },
  loginBtn: {
    marginTop: 28,
    color: Color.jfl_FFFFFF,
    fontSize: 16,
    backgroundColor: Color.jfl_37BCAD,
  },
  forgetBtn: {
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  forgetText: {
    fontSize: 13,
    color: Color.jfl_5C5C5C,
    textDecorationLine: 'underline',
  },
  appBg: {
    flexDirection: 'column',
    backgroundColor: Color.jfl_FFFFFF,
    borderTopWidth: 0,
  },
  appName: {
    textAlign: 'center',
    color: Color.jfl_545454,
    fontSize: 12,
  },
});
