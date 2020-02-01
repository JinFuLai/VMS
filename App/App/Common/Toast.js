import {Component} from 'react';
import Toast from 'react-native-root-toast';

export class toast extends Component {
  /**当前显示的toast */
  static showToast = null;
  /**展示弹窗信息 */
  static show(info) {
    if (info) {
      if (this.showToast) {
        Toast.hide(this.showToast);
        this.showToast = null;
      }
      let toastV = Toast.show(info, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: null,
        onShow: () => {
          // calls on toast\`s appear animation start
        },
        onShown: () => {
          // calls on toast\`s appear animation end.
        },
        onHide: () => {
          // calls on toast\`s hide animation start.
        },
        onHidden: () => {
          // calls on toast\`s hide animation end.
          Toast.hide(toastV);
          this.showToast = null;
        },
      });
      this.showToast = toastV;
    }
  }
}
