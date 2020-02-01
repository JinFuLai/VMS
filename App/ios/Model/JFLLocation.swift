//
//  JFLLocation.swift
//  RN
//
//  Created by 何治军 on 2020/1/13.
//  Copyright © 2020 Facebook. All rights reserved.
//

import UIKit
import ObjectMapper

/// 定位信息
class JFLLocation: NSObject,Mappable {
  
  var id:String?
  var gps_point:JFLGPSPoint?
  var device:JFLDevice?
  var vehicle:JFLVehicle?
  var driver:Any?
  var group:Any?
  
  override init() { super.init() }

  required init?(map: Map) { }
  
  func mapping(map: Map) {
    id <- map["_id"]
    gps_point <- map["gps_point"]
    device <- map["device"]
    vehicle <- map["vehicle"]
    driver <- map["driver"]
    group <- map["group"]
  }
  
  /// 为了oc😓
  /// - Parameter json: <#json description#>
  @objc class func getModel(_ json:[String:Any]) ->JFLLocation?{
    return JFLTools.getModel(json, classType: JFLLocation.self)
  }
  
  /// 为了oc😓
  /// - Parameter json: <#json description#>
  @objc class func getModelArray(_ json:[[String:Any]]) ->[JFLLocation]{
    return JFLTools.getModelArray(json, classType: JFLLocation.self)
  }
}
