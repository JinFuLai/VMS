//
//  JFLGoogleTools.swift
//  VMS
//
//  Created by 何治军 on 2020/2/5.
//  Copyright © 2020 Facebook. All rights reserved.
//

import UIKit

class JFLGoogleTools: NSObject {
  
  /// 筛选出包含经纬度的数据
  /// - Parameter dic: <#dic description#>
  class func getRightPoint(_ list:[JFLVehicle]?) -> [JFLVehicle]{
    var result:[JFLVehicle] = [];
    for item in list ?? [] {
      if let device = item.device, let gps = device.last_gps_point, let _ = gps.latitude, let _ = gps.longitude {
        result.append(item)
      }
    }
    return result;
  }
}
