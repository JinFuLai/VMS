//
//  JFLGoogleMarker.swift
//  VMS
//
//  Created by 何治军 on 2020/2/5.
//  Copyright © 2020 Facebook. All rights reserved.
//

import UIKit

class JFLGoogleMarker: GMSMarker {
  
  /// 数据
  var item:JFLVehicle = JFLVehicle()
  
  /// 筛选出包含经纬度的数据,并
  /// - Parameter list: <#dic description#>
  class func getMarkers(_ list:[JFLVehicle]?) -> [JFLGoogleMarker]{
    var result:[JFLGoogleMarker] = [];
    for item in list ?? [] {
      if let device = item.device, let gps = device.last_gps_point, let _ = gps.latitude, let _ = gps.longitude {
        let mark = JFLGoogleMarker(position: CLLocationCoordinate2DMake(CLLocationDegrees(item.device?.last_gps_point?.latitude ?? 0), CLLocationDegrees(item.device?.last_gps_point?.longitude ?? 0)))
        mark.item = item
        result.append(mark)
      }
    }
    return result;
  }
}
