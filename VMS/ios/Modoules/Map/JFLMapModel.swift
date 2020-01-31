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
    return JFLTools.getModel(json, classType: JFLMapModel.self)
  }
  
  /// 为了oc😓
  /// - Parameter json: <#json description#>
  @objc class func getModelArray(_ json:[[String:Any]]) ->[JFLMapModel]{
    return JFLTools.getModelArray(json, classType: JFLMapModel.self)
  }
}

//"userId": 792,
//"latitude": 30.5628,
//"longitude": 103.9844,
//"address": "四川 成都市 双流县 川齿路(川西干燥技术有限公司 附近)",
//"speed": 22.0,
//"directionString": "正北",
//"vehicleStatus": "ACC开",
//"imagePath": null,
//"datetime": "2017-12-29T04:48:30",
//"mileage": 0.7001953,
//"stop": 0.0
