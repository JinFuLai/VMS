//
//  JFLPolyline.swift
//  RN
//
//  Created by 何治军 on 2019/12/12.
//  Copyright © 2019 Facebook. All rights reserved.
//

import UIKit
import ObjectMapper

class JFLTools: BMKPolyline {
  
  /// 筛选出正确的点
  /// - Parameter items: <#items description#>
  class func getPoints(vehicles:[JFLVehicle]?) ->[JFLVehicle]{
    guard vehicles != nil else { return [] }
    let resultItms = vehicles!.filter { (dic) -> Bool in
      if let device = dic.device, let gps = device.last_gps_point, let _ = gps.latitude, let _ = gps.longitude {
        return true
      }else{  return false }
    }
    return resultItms
  }
  
  /// 筛选出JFLGPSPoint数组中正确的点
  /// - Parameter items: <#items description#>
  class func getPoints(locations:[JFLLocation]?) ->[JFLLocation]{
    guard locations != nil else { return [] }
    let resultItms = locations!.filter { (dic) -> Bool in
      if let gps = dic.gps_point, let _ = gps.latitude, let _ = gps.longitude {
        return true
      }else{  return false }
    }
    return resultItms
  }
  
  /// 根据JFLLocation数组创建BMKPolyline对象
  /// - Parameter dic: dic description
  class func getPolyline(locations:[JFLLocation]) -> BMKPolyline?{
    let GPSPoints = locations.map {$0.gps_point!}
    return JFLTools.getPolyline(GPSPoints:GPSPoints);
  }
  
  /// 根据GPSPoint数组创建BMKPolyline对象
  /// - Parameter dic: dic description
  class func getPolyline(GPSPoints:[JFLGPSPoint]) -> BMKPolyline?{
    let coords:UnsafeMutablePointer<CLLocationCoordinate2D> = UnsafeMutablePointer<CLLocationCoordinate2D>.allocate(capacity: GPSPoints.count)
    for (index,dic) in GPSPoints.enumerated() {
      if let latitude = dic.latitude, let longitude = dic.longitude {
        let point = CLLocationCoordinate2D(latitude: CLLocationDegrees(latitude), longitude: CLLocationDegrees(longitude))
        coords[index] = point
      }
    }
    if GPSPoints.count > 0 {
      let polyline = BMKPolyline(coordinates: coords, count: UInt(GPSPoints.count))
      return polyline
    }else{
      return nil
    }
  }
  
  /// 获取车辆的旋转角度(待后期修改优化)
  /// - Parameter items: <#items description#>
  class func getRotationAngle(_ items:JFLMapModel) ->CGFloat{
    switch items.directionString {
    case "正东":
      return 0
    case "东南":
      return 45
    case "正南":
      return 90
    case "西南":
      return 135
    case "正西":
      return 180
    case "西北":
      return 225
    case "正北":
      return 270
    case "东北":
      return 315
    default:
      return 0
    }
  }
  
}

extension JFLTools{
  
  class func getModelArray<T:Mappable>(_ data:[[String : Any]] ,classType:T.Type) -> [T] {
      let models  = Mapper<T>().mapArray(JSONArray: data)
      return models
  }
  
  class func getModel<T:Mappable>(_ data:[String : Any] ,classType:T.Type) -> T? {
      let model  = Mapper<T>().map(JSON: data)
      return model
  }
}
