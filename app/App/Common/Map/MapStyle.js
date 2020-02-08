import {Color, Screen} from '../Tools';
import {StyleSheet} from 'react-native';

export const Style = StyleSheet.create({
  typeBtn: {
    position: 'absolute',
    marginTop: 21.5,
    right: 14.5,
    alignSelf: 'flex-end',
    width: 31,
    height: 31,
    backgroundColor: Color.jfl_FFFFFF,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowColor: Color.jfl_373737,
    shadowOpacity: 0.5,
    borderRadius: 0,
  },
  funcBtn: {
    position: 'absolute',
    bottom: 0,
    marginLeft: 14.5,
    width: 34,
    height: 34,
    marginBottom: 30.5,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowColor: Color.jfl_373737,
    shadowOpacity: 0.5,
  },
});
