//
//  JFLMapModel.swift
//  RN
//
//  Created by 何治军 on 2019/12/12.
//  Copyright © 2019 Facebook. All rights reserved.
//

import UIKit
import ObjectMapper

class JFLMapModel: NSObject,Mappable {
  
  var userId:Int?
  var address:String?
  var latitude:CGFloat?
  var longitude:CGFloat?
  var speed:CGFloat?
  
  var directionString:String?
  var vehicleStatus:String?
  var imagePath:String?
  var datetime:String?
  var mileage:CGFloat?
  
  var stop:Bool = false
  /// 是否是用于显示历史轨迹的当前位置标记点（本地自定义的属性）
  var isCurrentHistoryPoint:Bool = false
  
  override init() { super.init() }

  required init?(map: Map) { }
  
  func mapping(map: Map) {
    userId <- map["userId"]
    address <- map["address"]
    latitude <- map["latitude"]
    longitude <- map["longitude"]
    speed <- map["speed"]

    directionString <- map["directionString"]
    vehicleStatus <- map["vehicleStatus"]
    imagePath <- map["imagePath"]
    datetime <- map["datetime"]
    mileage <- map["mileage"]
    
    stop <- map["stop"]
  }
  
  /// 为了oc😓
  /// - Parameter json: <#json description#>
  @objc class func getModel(_ json:[String:Any]) ->JFLMapModel?{
    return JFLBDTools.getModel(json, classType: JFLMapModel.self)
  }
  
  /// 为了oc😓
  /// - Parameter json: <#json description#>
  @objc class func getModelArray(_ json:[[String:Any]]) ->[JFLMapModel]{
    return JFLBDTools.getModelArray(json, classType: JFLMapModel.self)
  }
}
