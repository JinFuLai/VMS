//
//  JFLGPSPoint.swift
//  RN
//
//  Created by 何治军 on 2020/1/13.
//  Copyright © 2020 Facebook. All rights reserved.
//

import UIKit
import ObjectMapper

/// gps信息
class JFLGPSPoint: NSObject,Mappable {
  
  var id:String?
  var longitude:CGFloat?
  var latitude:CGFloat?
  var speed:CGFloat?
  var altitude:CGFloat?
  
  var alert:[String]?
  var direction:CGFloat?
  var custom_data:Any?
  
  override init() { super.init() }

  required init?(map: Map) { }
  
  func mapping(map: Map) {
    id <- map["_id"]
    longitude <- map["longitude"]
    latitude <- map["latitude"]
    speed <- map["speed"]
    altitude <- map["altitude"]
    
    alert <- map["alert"]
    direction <- map["direction"]
    custom_data <- map["custom_data"]
  }
  
  /// 为了oc😓
  /// - Parameter json: <#json description#>
  @objc class func getModel(_ json:[String:Any]) ->JFLGPSPoint?{
    return JFLBDTools.getModel(json, classType: JFLGPSPoint.self)
  }
  
  /// 为了oc😓
  /// - Parameter json: <#json description#>
  @objc class func getModelArray(_ json:[[String:Any]]) ->[JFLGPSPoint]{
    return JFLBDTools.getModelArray(json, classType: JFLGPSPoint.self)
  }
}
