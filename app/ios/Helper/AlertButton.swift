//
//  AlertButton.swift
//  RN
//
//  Created by 何治军 on 2019/12/10.
//  Copyright © 2019 Facebook. All rights reserved.
//

import UIKit
import Localize_Swift

/// 可移动的按钮浮窗
class AlertButton: UIView {
  
    /// 点击子按钮的回调
    var clickChildBtn:((Int) -> Void)?
  
    /// 点击的回调(视图需要额外增加的宽度)
  var clickTheAlertView:((CGFloat) -> Void)?
    
    /// 是否允许移动
    var canMove:Bool = true
    
    /// 停下不移动的透明度
    var tintAlpha:CGFloat = 1 {
        didSet{
            self.alpha = tintAlpha
        }
    }
    /// 背景图
    var bgImg:UIImage? = UIImage(){
        didSet{
            self.bgBtn.setBackgroundImage(bgImg, for: .normal)
            self.bgBtn.setBackgroundImage(bgImg, for: .highlighted)
        }
    }
    
    /// 可移动时距离父类头部的最小距离
    var topMargin:CGFloat = 0
  
    convenience init() {
      self.init([])
    }
  
    init(_ childTitles: [String]) {
      super.init(frame: CGRect(x: 0, y: 0 , width: 32, height: 32))
      setUpUI()
      setTheConstraints()
      addChildBtn(childTitles)
      NotificationCenter.default.addObserver(self, selector: #selector(refresh), name: NSNotification.Name(LCLLanguageChangeNotification), object: nil)
    }
  
  deinit {
    NotificationCenter.default.removeObserver(self, name: NSNotification.Name(LCLLanguageChangeNotification), object: nil)
  }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func layoutSublayers(of layer: CALayer) {
        super.layoutSublayers(of: layer)
    }
    
    //MARK: -属性
    /// 按钮
    lazy var bgBtn:UIButton = {
        let btn = UIButton(type: .custom)
        btn.setTitle("+", for: .normal)
        btn.titleLabel?.font = UIFont(name: "Avenir-Heavy", size: 30)!
        btn.titleLabel?.numberOfLines = 0
        return btn
    }()
  
    /// 子按钮
    lazy var childBtns:[UIButton] = []
  
  /// 子按钮上的原始标题，用与刷新界面的中英文显示
  fileprivate var btnTitles:[String] = []
}

extension AlertButton {
      
    func setUpUI() {
        self.addSubview(bgBtn)
        self.addGestureRecognizer(UIPanGestureRecognizer.init(target: self, action: #selector(AlertButton.panTheView(_:))))
        self.backgroundColor = .white
        bgBtn.addTarget(self, action: #selector(clickTheBgBtn(_:)), for: .touchUpInside)
        bgBtn.addTarget(self, action: #selector(touchDownTheBgBtn), for: .touchDown)
        self.layer.cornerRadius = 4
//        bgBtn.layer.cornerRadius = self.frame.width * 0.5
//        bgBtn.layer.masksToBounds = true
        
        
        self.layer.borderColor = UIColor.clear.cgColor
        self.layer.shadowColor = UIColor.gray.cgColor
        self.layer.shadowOffset = CGSize(width: 3, height: 3)
        self.layer.shadowRadius = 6
        self.layer.shadowOpacity = 1
    }
    
    func setTheConstraints() {
        bgBtn.snp.updateConstraints({ (make) in
//            make.edges.equalTo(self)
            make.top.right.centerY.equalToSuperview()
            make.width.equalTo(self.snp.height)
        })
    }
}

extension AlertButton {
  
  //MAKR: - action
  
  @objc private func clickTheBgBtn(_ btn:UIButton) {
      btn.isSelected = !btn.isSelected
//      self.canMove = !btn.isSelected
      for child in self.childBtns {
        child.isHidden = !btn.isSelected
      }
    self.clickTheAlertView?(btn.isSelected ? CGFloat(50 * self.childBtns.count) : 0)
      self.alpha = self.tintAlpha
  }
  
  @objc private func touchDownTheBgBtn() {
      if canMove { self.alpha = 1 }
  }
  
  @objc private func panTheView(_ gesture:UIGestureRecognizer) {
      if !canMove {return}
      if gesture.state == .began {
          self.alpha = 1
      }else if gesture.state == .changed {
          var movePoint = gesture.location(in: self.superview)
//          if movePoint.x < self.frame.width * 0.5 {
//              movePoint.x = self.frame.width * 0.5
//          }
          if movePoint.x > self.superview!.frame.width - self.frame.width * 0.5 {
              movePoint.x = self.superview!.frame.width - self.frame.width * 0.5
          }
          if movePoint.y < self.frame.height * 0.5 + topMargin {
              movePoint.y = self.frame.height * 0.5 + topMargin
          }
          if movePoint.y > self.superview!.frame.height - self.frame.height * 0.5 {
              movePoint.y = self.superview!.frame.height - self.frame.height * 0.5
          }
          self.center = movePoint
      }else if gesture.state == .ended {
          self.alpha = tintAlpha
          self .stopMoveAnimation(gesture)
      }
      
  }
  
  private func stopMoveAnimation(_ gesture:UIGestureRecognizer) {
      if !canMove {return}
      var movePoint = gesture.location(in: self.superview)
//      if movePoint.x <= self.superview!.frame.width * 0.5 {
//          movePoint.x = self.frame.width * 0.5 + 10
//      }
//      if movePoint.x > self.superview!.frame.width * 0.5 {
          movePoint.x = self.superview!.frame.width - self.frame.width * 0.5 - 10
//      }
      if movePoint.y < self.frame.height * 0.5 + topMargin{
          movePoint.y = self.frame.height * 0.5 + 10 + topMargin
      }
      if movePoint.y > self.superview!.frame.height - self.frame.height * 0.5 {
          movePoint.y = self.superview!.frame.height - self.frame.height * 0.5
      }
      self.center = movePoint
      
      UIView.animate(withDuration: 0.25) {
          self.center = movePoint
      }
  }
  
}

extension AlertButton {
  /// 添加子按钮
  func addChildBtn(_ titles:[String]) {
    for btn in self.childBtns {
      btn.removeFromSuperview()
    }
    self.childBtns = []
    self.btnTitles = titles;
    
    for (index,title) in titles.enumerated() {
      let btn = UIButton()
      btn.isHidden = true
      btn.tag = index
//      btn.backgroundColor = .white
      btn.titleLabel?.font = UIFont.systemFont(ofSize: 13)
      btn.setTitleColor(.hexColor("#373737"), for: .normal)
      btn.setTitle(title.localized(), for: .normal)
      btn.addTarget(self, action: #selector(clickMapTypeBtn(_:)), for: .touchUpInside)
      self.childBtns.append(btn)
      self.addSubview(btn)
      btn.snp.makeConstraints { (make) in
        make.height.top.equalTo(self.bgBtn)
        make.width.equalTo(50)
        make.right.equalTo(self.bgBtn.snp.left).offset(-50 * CGFloat(index))
      }
    }
  }
  
  @objc func clickMapTypeBtn(_ btn:UIButton) {
    self.clickChildBtn?(btn.tag)
  }
  
  ///修改按钮上的中英文
  @objc fileprivate func refresh(){
    guard self.btnTitles.count == self.childBtns.count else { return }
    for (index,title) in self.btnTitles.enumerated() {
      self.childBtns[index].setTitle(title.localized(), for: .normal)
    }
  }
}
