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
      self.mapView.isMyLocationEnabled = showsUserLocation
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
  
  /// 点击按钮的回调
  @objc var onClickBottomBtnBlock:RCTBubblingEventBlock?
  /// 点击刷新数据按钮的回调
  @objc var onClickRefreshDataBtnBlock:RCTBubblingEventBlock?
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
  /// 地图上的所有的历史轨迹线条
  fileprivate var allPolyline:[GMSPolyline] = []
  //---------------------------
  
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
    map.delegate = self
    map.settings.tiltGestures = false //不支持俯仰角
    map.settings.rotateGestures = false//不支持旋转
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

extension JFLGoogleMapView{
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
//      item.title = item.item.plate
      item.icon = UIImage(named: "car")
      item.map = self.mapView
      item.rotation = CLLocationDegrees(item.item.device?.last_gps_point?.direction ?? 0)
    }
    self.allMarkers.append(contentsOf: markers)
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
//    self.mapView.clear()
    for item in self.allMarkers {
      item.map = nil
    }
    self.allMarkers = []
  }
  
  /// 添加历史轨迹点
  /// - Parameter list: <#list description#>
  @objc func addPolylines(_ list:[JFLLocation]?) {
    let rightList = JFLGoogleTools.getRightLocations(list)
    guard rightList.count > 0 else {return}
    for item in rightList {
      item.vehicle?.showAlertView = false // 不要浮窗
    }
    self.removeAllPolylines()
    self.historyPoints = rightList
    let path = GMSMutablePath()
    for item in rightList {
      path.add(CLLocationCoordinate2D(latitude: CLLocationDegrees(item.gps_point?.latitude ?? 0), longitude: CLLocationDegrees(item.gps_point?.longitude ?? 0)))
    }
    let rectangle = GMSPolyline(path: path)
    rectangle.map = self.mapView
    rectangle.strokeColor = UIColor.hexColor("#37BCAD")
    rectangle.strokeWidth = 6
    self.allPolyline.append(rectangle)
    
    if let firstP = rightList.first, let latitude = firstP.gps_point?.latitude, let longitude = firstP.gps_point?.longitude{
      let zoom = self.mapView.camera.zoom
      self.mapView.camera = GMSCameraPosition(target: CLLocationCoordinate2D(latitude: CLLocationDegrees(latitude), longitude: CLLocationDegrees(longitude)), zoom: zoom < 14 ? 14 : zoom)
    }
  }
  
  /// 移除地图上所有的历史轨迹线条
  fileprivate func removeAllPolylines() {
//    self.mapView.clear()
    for item in self.allPolyline {
      item.map = nil
    }
    self.allPolyline = []
  }
  
  ///点击刷新数据按钮
  @objc fileprivate func clickRefreshDataBtn() {
    self.onClickRefreshDataBtnBlock?([:])
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
  
  
  /// 设置地图旋转角度
  /// - Parameter rotationAngle: 旋转的角度
  fileprivate func setTheMapDirection(_ rotationAngle:CLLocationDirection) {
    let oldCamerra = self.mapView.camera
    if oldCamerra.bearing != rotationAngle {
      let newCamera = GMSCameraPosition(target: oldCamerra.target, zoom: oldCamerra.zoom < 10 ? 10 : oldCamerra.zoom, bearing: rotationAngle, viewingAngle: oldCamerra.viewingAngle)
      self.mapView.camera = newCamera
    }
  }
}

//MARK: -GMSMapViewDelegate
extension JFLGoogleMapView:GMSMapViewDelegate{
  func mapView(_ mapView: GMSMapView, markerInfoWindow marker: GMSMarker) -> UIView? {
    if let jflMarker = marker as? JFLGoogleMarker, jflMarker.item.showAlertView {
//      let paopaoView = jflMarker.item.isCurrentHistoryPoint ? JFLPaopaoView(["map_details"], imgNames:["xiangqing"]) : JFLPaopaoView(["map_history","map_warn","map_details"], imgNames:["guiji","gaojing","xiangqing"])
      let paopaoView = JFLPaopaoView()
      paopaoView.frame = CGRect(x: 0, y: 0, width: paopaoView.systemLayoutSizeFitting(UIView.layoutFittingCompressedSize).width, height: paopaoView.systemLayoutSizeFitting(UIView.layoutFittingCompressedSize).height)
      paopaoView.clickBottomBtnBlock = { [weak self]index in
        guard let strongSelf = self else { return }
        DispatchQueue.main.async {
          strongSelf.onClickBottomBtnBlock?(["index":NSNumber(integerLiteral: index),"item":jflMarker.item.toJSON()])
        }
      }
      paopaoView.model = jflMarker.item
      return paopaoView
    }
    return nil
  }
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
  /// 开始历史轨迹动画
  /// - Parameter list: list description
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
        if let mark = self.allMarkers.first {
          mark.position = point
          if let vehicle = showHistory.vehicle {
             mark.item = vehicle
          }
          if let direction = gps.direction {
//            self.setTheMapDirection(CLLocationDirection(direction))
            mark.rotation = CLLocationDirection(direction)
          }
          let zoom = self.mapView.camera.zoom
          self.mapView.camera = GMSCameraPosition(target: point, zoom: zoom < 14 ? 14 : zoom)
        }
      }
      historyIndex += 1
    }
  }
}

//MARK: - 设置车辆定位
extension JFLGoogleMapView{
  @objc func setLocationItem(_ item:JFLVehicle?) {
    guard let vehicle = item, let device = vehicle.device, let model = device.last_gps_point, let latitude = model.latitude, let longitude = model.longitude else { return }
    let zoom = self.mapView.camera.zoom
    self.mapView.camera = GMSCameraPosition(target: CLLocationCoordinate2D(latitude: CLLocationDegrees(latitude), longitude: CLLocationDegrees(longitude)), zoom: zoom)
    vehicle.showAlertView = false
    self.addMarks([vehicle])
  }
}
