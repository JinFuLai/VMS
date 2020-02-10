////
////  JFLPopView.swift
////  RN
////
////  Created by 何治军 on 2019/12/11.
////  Copyright © 2019 Facebook. All rights reserved.
////
//
//import UIKit
//import Localize_Swift
//
//class JFLPaopaoView: UIView {
//  
//  var model:JFLVehicle = JFLVehicle(){
//    didSet{
//      self.titleLab.text = "车牌号码：   \(model.plate ?? "暂无数据") \n设备类型：   \(model.device?.device_type ?? "暂无数据")\n身份ID：      暂无数据\n联系方式：   暂无数据\nIMEI号：      \(model.device?.imei ?? "暂无数据")\nSIM卡号：    \(model.device?.simcard ?? "暂无数据")\n车辆识别号：\(model.number ?? "暂无数据")"
//    }
//  }
//  
//    convenience init() {
//      self.init([], imgNames:[])
//    }
//  
//    init(_ btnTitles:[String], imgNames:[String]) {
//      super.init(frame:CGRect())
//      setUpUI()
//      setTheLayout()
//      setDefault()
//      setBottomBtn(btnTitles, imgNames:imgNames)
//      NotificationCenter.default.addObserver(self, selector: #selector(refresh), name: NSNotification.Name(LCLLanguageChangeNotification), object: nil)
//    }
//    
//    deinit {
//      NotificationCenter.default.removeObserver(self, name: NSNotification.Name(LCLLanguageChangeNotification), object: nil)
//    }
//      
//  override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
//    print("touch JFLPaopaoView")
//  }
//
//    required init?(coder: NSCoder) {
//      fatalError("init(coder:) has not been implemented")
//    }
//  
//  lazy var titleLab:UILabel = {
//    let lbl = UILabel()
//    lbl.numberOfLines = 0
//    lbl.font = UIFont.customFont(ofSize: 13)
//    return lbl
//  }()
//  
//  var bottomBtns:[UIButton] = []
//  
//  /// 子按钮上的原始标题，用与刷新界面的中英文显示
//  fileprivate var btnTitles:[String] = []
//  
//  var clickBottomBtnBlock:((Int)->Void)?
//  
//}
//
//extension JFLPaopaoView{
//  
//  func setDefault() {
//    self.backgroundColor = UIColor.white.withAlphaComponent(0.9)
//    self.layer.cornerRadius = 6
//    self.layer.borderColor = UIColor.clear.cgColor
//    self.layer.shadowColor = UIColor.gray.cgColor
//    self.layer.shadowOffset = CGSize(width: 3, height: 3)
//    self.layer.shadowOpacity = 0.5
//  }
//  
//  func setUpUI() {
//    self.addSubview(titleLab)
//  }
//  
//  func setTheLayout() {
//    titleLab.snp.makeConstraints { (make) in
//      make.left.equalToSuperview().offset(10).priorityHigh()
//      make.centerX.equalToSuperview()
//      make.top.equalToSuperview().offset(8)
//      make.width.equalTo(SCREEN_WIDTH * 0.6)
//      make.height.greaterThanOrEqualTo(120)
//      make.bottom.lessThanOrEqualToSuperview().offset(-8)
//    }
//  }
//  
//  func setBottomBtn(_ titles:[String], imgNames:[String]) {
//    for btn in self.bottomBtns {
//      btn.removeFromSuperview()
//    }
//    self.bottomBtns = []
//    self.btnTitles = titles
//    for (index,title) in titles.enumerated() {
//      let btn = UIButton()
//      btn.tag = index
////      btn.backgroundColor = .white
//      btn.titleLabel?.font = UIFont.systemFont(ofSize: 13)
//      btn.setTitleColor(.hexColor("#373737"), for: .normal)
//      btn.setTitle(title.localized(), for: .normal)
//      if index < imgNames.count{
//        btn.setImage(UIImage(named: imgNames[index]), for: .normal)
//      }
//      btn.addTarget(self, action: #selector(clickBottomBtn(_:)), for: .touchUpInside)
//      self.bottomBtns.append(btn)
//      self.addSubview(btn)
//      btn.snp.makeConstraints { (make) in
//        make.height.equalTo(30)
//        make.top.equalTo(titleLab.snp.bottom)
//        make.bottom.equalToSuperview().offset(-10)
//        make.width.equalToSuperview().dividedBy(titles.count)
//        if index == 0 {
//          make.left.equalToSuperview()
//        }else{
//          make.left.equalTo(self.bottomBtns[index - 1].snp.right)
//        }
//        if index == titles.count - 1 {
//          make.right.equalToSuperview()
//        }
//      }
//    }
//  }
//  
//  @objc func clickBottomBtn(_ btn:UIButton) {
//    self.clickBottomBtnBlock?(btn.tag)
//  }
//  
//  ///修改控件上的中英文
//  @objc fileprivate func refresh(){
//    guard self.btnTitles.count == self.bottomBtns.count else { return }
//    for (index,title) in self.btnTitles.enumerated() {
//      self.bottomBtns[index].setTitle(title.localized(), for: .normal)
//    }
//  }
//}
