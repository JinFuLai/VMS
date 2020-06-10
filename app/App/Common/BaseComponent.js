import React,{PureComponent} from 'react';

function inject_unount(Target){

  // class NewComponent extends PureComponent {
  //   constructor(props){
  //     super(props);
  //     this.unmount = false;
  //   }

  //   render() {
  //       return <Target {...this.props}/>
  //   }

  //   // componentWillUnmount() { //子类使用时，需使用super
  //   //   this.unmount = true;
  //   //   // this.call(this, ...arguments);
  //   // }
  // }

  // 改装componentWillUnmount，销毁的时候记录一下(子类使用时，需使用super)
  var next = Target.prototype.componentWillUnmount;
  Target.prototype.componentWillUnmount = function() {
    if (next) {
      next.call(this, ...arguments);
    }
    this.unmount = true;
  };

  // 对setState的改装，setState查看目前是否已经销毁
  let setState = Target.prototype.setState;
  Target.prototype.setState = function() {
    // if (this.unmount) {
    //   return;
    // }
    setState.call(this, ...arguments);
  };

  // return NewComponent;
}

@inject_unount
export default class BaseComponent extends PureComponent {}