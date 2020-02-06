//
//  JFLMap.swift
//  RN
//
//  Created by 何治军 on 2019/12/10.
//  Copyright © 2019 Facebook. All rights reserved.
//

import UIKit
import Localize_Swift

class JFLMapView: UIView{
  
  /// 地图类型
  @objc var mapType:UInt = 1{
    didSet{
      self.mapView.mapType = BMKMapType.init(rawValue: mapType) ?? BMKMapType.standard
    }
  }
  
  /// 是否打开路况图层
  @objc var trafficEnabled:Bool = false{
    didSet{
      self.mapView.isTrafficEnabled = trafficEnabled
    }
  }
  
  /// 是否显示定位图层
  @objc var showsUserLocation:Bool = false{
    didSet{
      self.mapView.showsUserLocation = showsUserLocation
      if self.showsUserLocation {
        self.locationManager.requestLocation(withReGeocode: true, withNetworkState: true) { (location, state, error) in
          if error == nil, location != nil {
            let userLocation = BMKUserLocation()
            userLocation.location = location!.location
            self.mapView.updateLocationData(userLocation)
            self.mapView.setCenter(userLocation.location.coordinate, animated: true)
          }else{
            self.makeToast("定位失败")
          }
        }
      }
    }
  }
  
  /// 是否显示显示3D楼块效果
  @objc var buildingsEnabled:Bool = false{
    didSet{
      self.mapView.isBuildingsEnabled = buildingsEnabled
    }
  }
  
  /// 是否显示数据刷新按钮
  @objc var showRefreshDataBtn:Bool = false{
    didSet{
      self.btnRefreshData.isHidden = !showRefreshDataBtn
    }
  }
  
  /// 是否显示定位
  @objc var showLocationBtn:Bool = false{
    didSet{
      self.btnLocation.isHidden = !showLocationBtn
    }
  }
  
  ///alertV距离顶部的距离
  @objc var alertVTopMargin:Float = 25{
    didSet{
      self.alertV.topMargin = CGFloat(self.alertVTopMargin)
      self.alertV.snp.updateConstraints{$0.top.equalToSuperview().offset(self.alertVTopMargin)}
    }
  }
  
  /// alertV背景图
  @objc var alertVImag:String = "chakan"{
    didSet{
      self.alertV.bgImg = UIImage(named: alertVImag)
    }
  }
  
  /// 点击浮窗上按钮的回调
  @objc var onClickBottomBtnBlock:RCTBubblingEventBlock?
  /// 点击刷新数据按钮的回调
  @objc var onClickRefreshDataBtnBlock:RCTBubblingEventBlock?
  //------------标记点---------------
  /// 地图上所有的标记点
  var allAnnotations:[BMKPointAnnotation] = []
  //---------------------------
  
  //------------历史轨迹---------------
  /// 历史轨迹中的所有位置点
  fileprivate var historyPoints:[JFLLocation] = []
  /// 历史轨迹动画用计时器
  fileprivate var historyTimer:Timer?
  /// 历史轨迹动画当前显示的点
  fileprivate var historyIndex:Int = 0
  /// 历史轨迹显示当前位置的点（用于设置mark）
  fileprivate var historyAnnotationView:JFLPinAnnotationView?
  /// 地图上的所有的历史轨迹线条
  fileprivate var allPolyline:[BMKPolyline] = []
  //---------------------------

  
  /// 是否能展示Paopao
  fileprivate var canShowPaopao:Bool = true
  
  convenience init() { self.init(frame:CGRect()) }

  override init(frame: CGRect) {
    super.init(frame: frame)
    setUpUI()
    setDefault()
  }
  
  required init?(coder: NSCoder) { fatalError("init(coder:) has not been implemented") }

  /// 百度地图
  lazy var mapView:BMKMapView = {
    let map = BMKMapView()
    map.showMapScaleBar = false
    map.delegate = self
    map.isOverlookEnabled = false//不支持俯仰角
    map.isRotateEnabled = false//不支持旋转
    return map
  }()
  
  /// 定位相关
  lazy var locationManager: BMKLocationManager = {
    let manager = BMKLocationManager()
    manager.delegate = self
    return manager
  }()
  
  /// 浮动地图类型选择器
  lazy var alertV:AlertButton = {
    let type = ["map_satellite","map_standard"]
    let v = AlertButton(type)//"map_3D",
    v.bgBtn.setTitle(nil, for: .normal)
    v.bgImg = UIImage(named: "chakan")
    v.canMove = false
    v.topMargin = CGFloat(self.alertVTopMargin)
    v.clickTheAlertView = {[weak self] extraWidth in
      guard let strongSelf = self else { return }
      strongSelf.alertV.snp.updateConstraints{$0.width.equalTo(extraWidth+32)}
    }
    v.clickChildBtn = { [weak self] index in
      guard let strongSelf = self else { return }
      strongSelf.changeMapType(UInt(type.count - index))//
    }
    return v
  }()
  
  ///数据刷新按钮
  lazy var btnRefreshData: UIButton = {
    let btn = UIButton()
    btn.setImage(UIImage(named: "compass"), for: .normal)
    btn.addTarget(self, action: #selector(clickRefreshDataBtn), for: .touchUpInside)
    btn.isHidden = !self.showRefreshDataBtn
    btn.layer.cornerRadius = 17
    btn.backgroundColor = .white
    btn.layer.shadowColor = UIColor.gray.cgColor
    btn.layer.shadowOffset = CGSize(width: 3, height: 3)
    btn.layer.shadowRadius = 6
    btn.layer.shadowOpacity = 1
    return btn
  }()
  
  ///定位按钮
  lazy var btnLocation: UIButton = {
    let btn = UIButton()
    btn.setImage(UIImage(named: "dingwei")?.withRenderingMode(.alwaysTemplate), for: .normal)
    btn.tintColor = UIColor.hexColor("#444444")
    btn.addTarget(self, action: #selector(clickLocationBtn), for: .touchUpInside)
    btn.isHidden = !self.showLocationBtn
    btn.layer.cornerRadius = 17
    btn.backgroundColor = .white
    btn.layer.shadowColor = UIColor.gray.cgColor
    btn.layer.shadowOffset = CGSize(width: 3, height: 3)
    btn.layer.shadowRadius = 6
    btn.layer.shadowOpacity = 1
    return btn
  }()
}

extension JFLMapView{
  fileprivate func setUpUI(){
    self.addSubview(mapView)
    self.addSubview(alertV)
    self.addSubview(btnRefreshData)
    self.addSubview(btnLocation)
    mapView.snp.makeConstraints{$0.edges.equalToSuperview()}
    alertV.snp.makeConstraints { (make) in
      make.width.height.equalTo(32)
      make.right.equalToSuperview().offset(-15)
      make.top.equalToSuperview().offset(40)
    }
    btnRefreshData.snp.makeConstraints { (make) in
      make.width.height.equalTo(34)
      make.left.equalToSuperview().offset(15)
      make.bottom.equalToSuperview().offset(-30.5)
    }
    btnLocation.snp.makeConstraints { (make) in
      make.width.height.equalTo(34)
      make.left.equalToSuperview().offset(15)
      make.bottom.equalTo(btnRefreshData.snp.top).offset(-14)
    }
  }
  
  fileprivate func setDefault(){  }
}

extension JFLMapView{
  
  /// 设置语言（目前百度地图无法设置英文，暂时只能修改上面的自定义组件）
  /// - Parameter language: "0" - 英语， "1" -中文
  @objc func setLanguage(_ language:String) {
    Localize.setCurrentLanguage(language == "1" ? "zh-Hans" : "English")
  }
  
  /// 设置地图类型(0-空白地图,1-（包含3D地图）,2-卫星地图,标准地图,3-3d)
  /// - Parameter type: type description
  @objc func changeMapType(_ type:UInt) {
    if type == 3 {
      self.mapView.mapType = .standard
      self.mapView.isBuildingsEnabled = true
    }else{
      self.mapView.mapType = BMKMapType.init(rawValue:type) ?? BMKMapType.standard
      self.mapView.isBuildingsEnabled = false
    }
  }
  
  /// 设定地图是否打开路况图层
  /// - Parameter enabled: <#type description#>
  @objc func changeTrafficEnabled(_ enabled:Bool) {
    self.mapView.isTrafficEnabled = enabled
  }
  
  /// 设定地图是否显示定位图层
  /// - Parameter type: <#type description#>
  @objc func changeShowsUserLocation(_ enabled:Bool) {
    self.mapView.showsUserLocation = enabled
  }
  
  /// 设定地图是否现显示3D楼块效果
  /// - Parameter type: <#type description#>
  @objc func changeBuildingsEnabled(_ enabled:Bool) {
    self.mapView.isBuildingsEnabled = enabled
  }
  
  /// 添加标记点
  /// - Parameter list: <#list description#>
  @discardableResult
  @objc func addMarks(_ list:[JFLVehicle]?) ->[BMKPointAnnotation]{
    guard list != nil else { return [] }
    var annotations:[BMKPointAnnotation] = []
    for item in list! {
      if let annotation = JFLPointAnnotation.getAnnotation(item){
        annotations.append(annotation)
      }
    }
    self.allAnnotations.append(contentsOf: annotations)
    self.mapView.addAnnotations(annotations)
    return annotations
  }
  
  /// 移除标记点
  /// - Parameter list: <#list description#>
  @objc func removeMarks(_ list:[JFLVehicle]?) {
    guard list != nil else { return }
    var annotations:[BMKPointAnnotation] = []
    for item in list! {
      if let annotation = JFLPointAnnotation.getAnnotation(item){
        annotations.append(annotation)
      }
    }
    self.mapView.removeAnnotations(annotations)
  }
  
  /// 移除所有的标记点
  /// - Parameter list: <#list description#>
  @objc func removeAllMarks() {
    self.mapView.removeAnnotations(self.allAnnotations)
  }
  
  /// 添加历史轨迹点
  /// - Parameter list: list description
  @objc func addPolylines(_ list:[JFLLocation]?) {
    self.historyPoints = JFLBDTools.getPoints(locations: list)
//    self.canShowPaopao = false
    if let point = self.historyPoints.first, let first = point.gps_point,let latitude = first.latitude, let longitude = first.longitude {
      self.mapView.setCenter(CLLocationCoordinate2DMake(CLLocationDegrees(latitude), CLLocationDegrees(longitude)), animated: false)
    }
    if let polyline = JFLBDTools.getPolyline(locations: self.historyPoints){
      self.mapView.add(polyline)
    }
  }
  
  /// 移除地图上所有的历史轨迹西线条
  fileprivate func removeAllPolylines() {
    self.mapView.removeOverlays(self.allPolyline)
  }
  
  ///点击刷新数据按钮
  @objc fileprivate func clickRefreshDataBtn() {
    self.onClickRefreshDataBtnBlock?([:])
  }
  
  ///定位
  @objc fileprivate func clickLocationBtn() {
    let status = self.mapView.getMapStatus() ?? BMKMapStatus()
    status.fRotation = 0
    status.fLevel = status.fLevel < 10 ? 10 : status.fLevel
    self.mapView.setMapStatus(status, withAnimation: true)
    self.locationManager.requestLocation(withReGeocode: true, withNetworkState: true) { (location, state, error) in
      if error == nil, location != nil {
        let userLocation = BMKUserLocation()
        userLocation.location = location!.location
        self.mapView.updateLocationData(userLocation)
        self.mapView.setCenter(userLocation.location.coordinate, animated: true)
      }else{
        self.makeToast("定位失败")
      }
    }
  }
}

//MARK: - 历史轨迹动画实现相关
extension JFLMapView{
  /// 开始历史轨迹动画
  /// - Parameter list: <#list description#>
  @objc func startHistoryAnimation() {
    guard self.historyPoints.count > 0 else { return }
    self.stopHistoryAnimation()
    self.removeAllMarks()
    guard let point = self.historyPoints.first, let vehicle = point.vehicle else{
      return
    }
    if vehicle.device == nil {//待优化
      vehicle.device = point.device
      if let dev = vehicle.device,dev.last_gps_point == nil {
        dev.last_gps_point = point.gps_point
      }
    }
    vehicle.isCurrentHistoryPoint = true
    self.addMarks([vehicle])
    if historyTimer == nil {
      historyTimer = Timer.scheduledTimer(timeInterval: 2, target: self, selector: #selector(historyAnimationAction), userInfo: nil, repeats: true)
      historyTimer?.fire()
    }
  }
  
  /// 停止历史轨迹动画
  /// - Parameter list: list description
  @objc func stopHistoryAnimation() {
    self.historyAnnotationView = nil
    historyTimer?.invalidate()
    historyTimer = nil
    historyIndex = 0
  }
  
  @objc fileprivate func historyAnimationAction() {
    if historyIndex >= self.historyPoints.count {
      self.stopHistoryAnimation()
    }else{
      let showHistory = self.historyPoints[historyIndex]
      if let gps = showHistory.gps_point, let latitude = gps.latitude, let longitude = gps.longitude {
        let point = CLLocationCoordinate2D(latitude: CLLocationDegrees(latitude), longitude: CLLocationDegrees(longitude))
        if let annotation =  self.historyAnnotationView?.annotation as? BMKPointAnnotation {
          annotation.coordinate = point
        }
        if let paopaoView = self.historyAnnotationView?.paopaoView as? JFLActionPaopaoView, let vehicle = showHistory.vehicle{
          paopaoView.customV?.model = vehicle
        }
        if let direction = gps.direction {
          self.historyAnnotationView?.changeRotationAngle(direction)
          let status = self.mapView.getMapStatus() ?? BMKMapStatus()
          status.fLevel = status.fLevel > 18 || status.fLevel < 14 ? 17 : status.fLevel
//          status.fRotation = Float(direction)
          self.mapView.setMapStatus(status, withAnimation: true)
        }
        self.mapView.setCenter(point, animated: true)
      }
      historyIndex += 1
    }
  }
}

//MARK: - 设置车辆定位
extension JFLMapView{
  @objc func setLocationItem(_ item:JFLVehicle?) {
    guard let vehicle = item, let device = vehicle.device, let model = device.last_gps_point, let latitude = model.latitude, let longitude = model.longitude else { return }
    self.canShowPaopao = false
    self.mapView.setCenter(CLLocationCoordinate2DMake(CLLocationDegrees(latitude), CLLocationDegrees(longitude)), animated: false)
    self.addMarks([vehicle])
  }
}

//MARK: -BMKLocationManagerDelegate
extension JFLMapView:BMKLocationManagerDelegate{
  
}

//MARK: -BMKMapViewDelegate
extension JFLMapView:BMKMapViewDelegate{
  
  /// Mark相关
  /// - Parameters:
  ///   - mapView: <#mapView description#>
  ///   - annotation: <#annotation description#>
  func mapView(_ mapView: BMKMapView!, viewFor annotation: BMKAnnotation!) -> BMKAnnotationView! {
    let pointReuseIndentifier = "pointReuseIndentifier"
    if let annota = annotation as? JFLPointAnnotation, let annotationView = mapView.dequeueReusableAnnotationView(withIdentifier: pointReuseIndentifier) as? JFLPinAnnotationView ?? JFLPinAnnotationView(annotation: annota, reuseIdentifier: pointReuseIndentifier) {
      if annota.item.isCurrentHistoryPoint {//标记历史轨迹的点
        self.historyAnnotationView = annotationView
      }
      annotationView.pinColor = UInt(BMKPinAnnotationColorRed)
//      annotationView.canShowCallout = true
      annotationView.animatesDrop = false
      annotationView.enabled3D = true
//      annotationView.centerOffset = CGPoint(x: 0, y: 7)
//      let paopaoView = annota.item.isCurrentHistoryPoint ? JFLPaopaoView(["map_details"], imgNames:["xiangqing"]) : JFLPaopaoView(["map_history","map_warn","map_details"], imgNames:["guiji","gaojing","xiangqing"])
      let paopaoView = JFLPaopaoView()
      paopaoView.frame = CGRect(x: 0, y: 0, width: paopaoView.systemLayoutSizeFitting(UIView.layoutFittingCompressedSize).width, height: paopaoView.systemLayoutSizeFitting(UIView.layoutFittingCompressedSize).height)
      paopaoView.clickBottomBtnBlock = { [weak self]index in
        guard let strongSelf = self else { return }
        DispatchQueue.main.async {
          strongSelf.onClickBottomBtnBlock?(["index":NSNumber(integerLiteral: index),"item":annota.item.toJSON()])
        }
      }
      let pView = JFLActionPaopaoView(customView: paopaoView)
      paopaoView.model = annota.item
      pView.frame = paopaoView.frame
      annotationView.paopaoView = pView
      
      annotationView.canShowCallout = self.canShowPaopao
      if let device = annota.item.device, let gps = device.last_gps_point, let direction = gps.direction {
        annotationView.setImage(UIImage(named: "car"), rotationAngle: direction)
      }
      return annotationView
    }else{
      return nil
    }
  }
  
  /// 轨迹相关
  /// - Parameters:
  ///   - mapView: <#mapView description#>
  ///   - overlay: <#overlay description#>
  func mapView(_ mapView: BMKMapView!, viewFor overlay: BMKOverlay!) -> BMKOverlayView! {
    if let over = overlay as? BMKPolyline, let polylineView = BMKPolylineView(polyline: over) {
      polylineView.strokeColor = UIColor.hexColor("#37BCAD")
      polylineView.lineWidth = 6
      polylineView.lineDashType = kBMKLineDashTypeNone
      polylineView.lineCapType = kBMKLineCapRound
      polylineView.lineJoinType = kBMKLineJoinRound
      return polylineView
    }else{
      return nil
    }
  }
}
