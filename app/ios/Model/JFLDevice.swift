//
//  JFLDevice.swift
//  RN
//
//  Created by 何治军 on 2020/1/13.
//  Copyright © 2020 Facebook. All rights reserved.
//

import UIKit
import ObjectMapper

//设备类型  VEHICLE_GPS：车载GPS，PERSONAL_GPS：手持GPS
enum JFLDeviceType:String {
  case vehicle_gps = "VEHICLE_GPS"
  case personal_gps = "PERSONAL_GPS"
}

/// 设备信息
class JFLDevice: NSObject,Mappable {
  
  var id:String?
  var imei:String?
  var device_type:String?
//  var manufactor:Any?
  var simcard:Any?
  
  var produce_date:String?
  var purchase_date:String?
  var expire_date:String?
  var batch_number:String?
//  var account:Any?
  
  var last_gps_point:JFLGPSPoint?
  var note:String?
  var status:JFLDeviceType?
  
  override init() { super.init() }

  required init?(map: Map) { }
  
  func mapping(map: Map) {
    id <- map["_id"]
    imei <- map["imei"]
    device_type <- map["device_type"]
//    manufactor <- map["manufactor"]
    simcard <- map["simcard"]
    
    produce_date <- map["produce_date"]
    purchase_date <- map["purchase_date"]
    expire_date <- map["expire_date"]
    batch_number <- map["batch_number"]
//    account <- map["account"]
    
    last_gps_point <- map["last_gps_point"]
    note <- map["note"]
    status <- map["status"]
  }
  
  /// 为了oc😓
  /// - Parameter json: <#json description#>
  @objc class func getModel(_ json:[String:Any]) ->JFLDevice?{
    return JFLBDTools.getModel(json, classType: JFLDevice.self)
  }
  
  /// 为了oc😓
  /// - Parameter json: <#json description#>
  @objc class func getModelArray(_ json:[[String:Any]]) ->[JFLDevice]{
    return JFLBDTools.getModelArray(json, classType: JFLDevice.self)
  }
}
