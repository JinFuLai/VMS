//
//  JFLGoogleMapView.swift
//  VMS
//
//  Created by 何治军 on 2020/2/3.
//  Copyright © 2020 Facebook. All rights reserved.
//

import UIKit
import Localize_Swift

class JFLGoogleMapView: UIView{
  
  /// 地图类型
  @objc var mapType:UInt = 0{
    didSet{
      self.mapView.mapType = GMSMapViewType.init(rawValue: mapType) ?? GMSMapViewType.normal
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
      if self.showsUserLocation {
        self.locationManager.startUpdatingLocation()
      }
    }
  }
  
  /// 是否显示显示3D楼块效果
  @objc var buildingsEnabled:Bool = false{
    didSet{
      self.mapView.isBuildingsEnabled = buildingsEnabled
    }
  }
  
  /// 是否显示指南针
  @objc var showCompassBtn:Bool = true{
    didSet{
//      self.mapView.settings.compassButton = showCompassBtn
      self.btnCompass.isHidden = !showCompassBtn
    }
  }
  
  /// 是否显示定位
  @objc var showLocationBtn:Bool = false{
    didSet{
      self.btnLocation.isHidden = !showCompassBtn
    }
  }
  
  ///alertV距离顶部的距离
  @objc var alertVTopMargin:Float = 40{
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
  
  /// 点击按钮的回调
  @objc var onClickBottomBtnBlock:RCTBubblingEventBlock?
  //------------标记点---------------
  /// 地图上所有的标记点
  var allMarkers:[JFLGoogleMarker] = []
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

  /// 谷歌地图
  lazy var mapView:GMSMapView = {
    let map = GMSMapView(frame: CGRect(), camera: GMSCameraPosition(target: CLLocationCoordinate2D(), zoom: 10))
//    map.showMapScaleBar = true
    map.delegate = self
    map.settings.tiltGestures = false //不支持俯仰角
    return map
  }()
  
  /// 定位相关
  lazy var locationManager: CLLocationManager = {
    let manager = CLLocationManager()
    manager.delegate = self
    manager.desiredAccuracy = kCLLocationAccuracyBest
    manager.distanceFilter = kCLDistanceFilterNone
    manager.requestAlwaysAuthorization()
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
  
  ///方向重置按钮
  lazy var btnCompass: UIButton = {
    let btn = UIButton()
    btn.setImage(UIImage(named: "compass"), for: .normal)
    btn.addTarget(self, action: #selector(clickCompassBtn), for: .touchUpInside)
    btn.isHidden = !self.showCompassBtn
    btn.layer.cornerRadius = 14
    btn.backgroundColor = .white
    btn.layer.shadowColor = UIColor.gray.cgColor
    btn.layer.shadowOffset = CGSize(width: 6, height: 6)
    btn.layer.shadowRadius = 6
    btn.layer.shadowOpacity = 1
    return btn
  }()
  
  ///定位按钮
  lazy var btnLocation: UIButton = {
    let btn = UIButton()
    btn.setImage(UIImage(named: "dingwei"), for: .normal)
    btn.addTarget(self, action: #selector(clickLocationBtn), for: .touchUpInside)
    btn.isHidden = !self.showLocationBtn
    btn.layer.cornerRadius = 14
    btn.backgroundColor = .white
    btn.layer.shadowColor = UIColor.gray.cgColor
    btn.layer.shadowOffset = CGSize(width: 6, height: 6)
    btn.layer.shadowRadius = 6
    btn.layer.shadowOpacity = 1
    return btn
  }()
}

extension JFLGoogleMapView{
  fileprivate func setUpUI(){
    self.addSubview(mapView)
    self.addSubview(alertV)
    self.addSubview(btnCompass)
    self.addSubview(btnLocation)
    mapView.snp.makeConstraints{$0.edges.equalToSuperview()}
    alertV.snp.makeConstraints { (make) in
      make.width.height.equalTo(32)
      make.right.equalToSuperview().offset(-15)
      make.top.equalToSuperview().offset(40)
    }
    btnCompass.snp.makeConstraints { (make) in
      make.width.height.equalTo(28)
      make.right.bottom.equalToSuperview().offset(-15)
    }
    btnLocation.snp.makeConstraints { (make) in
      make.width.height.equalTo(28)
      make.right.equalToSuperview().offset(-15)
      make.bottom.equalTo(btnCompass.snp.top).offset(-15)
    }
  }
  
  fileprivate func setDefault(){  }
}

extension JFLGoogleMapView{
  
  /// 设置语言（目前百度地图无法设置英文，暂时只能修改上面的自定义组件）
  /// - Parameter language: "0" - 英语， "1" -中文
  @objc func setLanguage(_ language:String) {
    Localize.setCurrentLanguage(language == "1" ? "zh-Hans" : "English")
  }
  
  /// 设置地图类型(0-空白地图,1-卫星地图,标准地图,3-3d)
  /// - Parameter type: type description
  @objc func changeMapType(_ type:UInt) {
    if type == 3 {
      self.mapView.mapType = .hybrid
      self.mapView.isBuildingsEnabled = true
    }else{
      self.mapView.mapType = GMSMapViewType.init(rawValue:type) ?? GMSMapViewType.normal
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
    if enabled {
      self.locationManager.requestLocation()
    }
  }
  
  /// 设定地图是否现显示3D楼块效果
  /// - Parameter type: <#type description#>
  @objc func changeBuildingsEnabled(_ enabled:Bool) {
    self.mapView.isBuildingsEnabled = enabled
  }
  
  /// 添加标记点
  /// - Parameter list: <#list description#>
  @discardableResult
  @objc func addMarks(_ list:[JFLVehicle]?) ->[GMSMarker]{
    let rightList = JFLGoogleTools.getRightPoint(list)
    let markers = JFLGoogleMarker.getMarkers(rightList)
    for item in markers {
      item.title = item.item.plate
      item.icon = UIImage(named: "car")
      item.map = self.mapView
      item.rotation = CLLocationDegrees(item.item.device?.last_gps_point?.direction ?? 0)
    }
    return markers
  }
  
  /// 移除标记点
  /// - Parameter list: <#list description#>
  @objc func removeMarks(_ list:[JFLVehicle]?) {
    let rightList = JFLGoogleTools.getRightPoint(list)
    for item in rightList {
      if let itemId = item.id {
        for (index,marker) in self.allMarkers.enumerated() {
          if let markerId = marker.item.id, markerId == itemId {
            marker.map = nil
            self.allMarkers.remove(at: index)
          }
        }
      }
    }
  }
  
  /// 移除所有的标记点
  /// - Parameter list: <#list description#>
  @objc func removeAllMarks() {
    self.mapView.clear()
  }
  
  /// 添加历史轨迹点
  /// - Parameter list: <#list description#>
  @objc func addPolylines(_ list:[JFLLocation]?) {
//    self.historyPoints = JFLBDTools.getPoints(locations: list)
//    if let point = self.historyPoints.first, let first = point.gps_point,let latitude = first.latitude, let longitude = first.longitude {
//      self.mapView.setCenter(CLLocationCoordinate2DMake(CLLocationDegrees(latitude), CLLocationDegrees(longitude)), animated: false)
//    }
//    if let polyline = JFLBDTools.getPolyline(locations: self.historyPoints){
//      self.mapView.add(polyline)
//    }
  }
  
  /// 移除地图上所有的历史轨迹西线条
  fileprivate func removeAllPolylines() {
//    self.mapView.removeOverlays(self.allPolyline)
  }
  
  ///重置方向
  @objc fileprivate func clickCompassBtn() {
    let oldCamerra = self.mapView.camera
    if oldCamerra.bearing != 0 {
      let newCamera = GMSCameraPosition(target: oldCamerra.target, zoom: oldCamerra.zoom < 10 ? 10 : oldCamerra.zoom, bearing: 0, viewingAngle: oldCamerra.viewingAngle)
      self.mapView.camera = newCamera
    }
  }
  
  ///定位
  @objc fileprivate func clickLocationBtn() {
    self.locationManager.startUpdatingLocation()
        let oldCamerra = self.mapView.camera
    if oldCamerra.bearing != 0 || oldCamerra.zoom < 10 {
      let newCamera = GMSCameraPosition(target: oldCamerra.target, zoom: oldCamerra.zoom < 10 ? 10 : oldCamerra.zoom, bearing: 0, viewingAngle: oldCamerra.viewingAngle)
      self.mapView.camera = newCamera
    }
  }
}

//MARK: -GMSMapViewDelegate
extension JFLGoogleMapView:GMSMapViewDelegate{
  
}

//MARK: - CLLocationManagerDelegate
extension JFLGoogleMapView:CLLocationManagerDelegate{
  func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
    if let location = locations.first {
      let zoom = self.mapView.camera.zoom
      self.mapView.camera = GMSCameraPosition(target: CLLocationCoordinate2D(latitude: location.coordinate.latitude, longitude: location.coordinate.longitude), zoom: zoom)
      manager.stopUpdatingLocation()
    }else{
      self.makeToast("定位失败")
      manager.stopUpdatingLocation()
    }
  }
}

//MARK: - 历史轨迹动画实现相关
extension JFLGoogleMapView{
  
}
