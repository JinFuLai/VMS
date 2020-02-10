////
////  JFLPointAnnotation.swift
////  RN
////
////  Created by 何治军 on 2019/12/12.
////  Copyright © 2019 Facebook. All rights reserved.
////
//
//import UIKit
//
//class JFLPointAnnotation: BMKPointAnnotation {
//  
//  /// 数据
//  var item:JFLVehicle = JFLVehicle()
//  
//  /// 根据dic创建对象
//  /// - Parameter dic: <#dic description#>
//  class func getAnnotation(_ model:JFLVehicle) -> JFLPointAnnotation?{
//    if let device = model.device, let gps = device.last_gps_point, let latitude = gps.latitude, let longitude = gps.longitude {
//      let annotation = JFLPointAnnotation()
//      annotation.item = model
//      annotation.coordinate = CLLocationCoordinate2D(latitude: CLLocationDegrees(latitude), longitude: CLLocationDegrees(longitude))
//      if let title = model.plate { annotation.title = title }
//      return annotation
//    }else{
//      return nil
//    }
//  }
//}
