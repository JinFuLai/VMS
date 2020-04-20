let LoadingTool = {
  showLoading(timeOut = 10000) {
    this.startShowLoading();
    this.timerLoading = setTimeout(() => {
      this.stopLoading();
    }, timeOut);
  },
  /**
   * 延迟500ms显示loading动画
   * @param delay 延迟ms数
   */
  showLoadingDelay(delay = 500) {
    this.timerLoading && clearTimeout(this.timerLoading);
    this.dissTimer && clearTimeout(this.dissTimer);
    this.timerLoading = setTimeout(() => {
      this.startShowLoading();
    }, delay);
    this.dissTimer = setTimeout(() => {
      this.stopLoading();
    }, 60000);
  },
  startShowLoading() {
    global.mLoadingComponentRef && global.mLoadingComponentRef.showLoading();
  },
  stopLoading() {
    global.mLoadingComponentRef && global.mLoadingComponentRef.stopLoading();
    this.timerLoading && clearTimeout(this.timerLoading);
    this.dissTimer && clearTimeout(this.dissTimer);
  },
};

export default LoadingTool;
