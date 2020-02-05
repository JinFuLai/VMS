//
//  JFLVehicle.swift
//  RN
//
//  Created by 何治军 on 2020/1/13.
//  Copyright © 2020 Facebook. All rights reserved.
//

import UIKit
import ObjectMapper

enum JFLVehicleStatue:String {
  case active = "ACTIVE"
  case inactive = "INACTIVE"
  case deleted = "DELETED"
}

/// 车辆信息
class JFLVehicle: NSObject,Mappable {
  
  var id:String?
  var number:String?
  /// 车牌号
  var plate:String?
//  var account:Any?
//  var vehicle_type:Any?
  
//  var vehicle_brand:Any?
  var engine_number:String?
  var frame_number:String?
  var purchase_date:String?
//  var vehicle_color:Any?
  
  var tires:Int?
  var length:Int?
  var width:Int?
  var hight:Int?
  var onehundred_consumption:Int?
  
  var device:JFLDevice?
  var install_date:String?
//  var install_user:Any?
//  var group:Any?
//  var safe_zone:Any?
  
//  var un_safe_zone:Any?
  var photos:[String]?
  var note:String?
  var status:JFLVehicleStatue?

  
  /// 是否是用于显示历史轨迹的当前位置标记点（本地自定义的属性）
  var isCurrentHistoryPoint:Bool = false
  /// 点击是否展示浮窗(本地自定义的属性,用于google地图)
  var showAlertView = true
  
  override init() { super.init() }

  required init?(map: Map) { }
  
  func mapping(map: Map) {
    id <- map["_id"]
    number <- map["number"]
    plate <- map["plate"]
//    account <- map["account"]
//    vehicle_type <- map["vehicle_type"]
    
//    vehicle_brand <- map["vehicle_brand"]
    engine_number <- map["engine_number"]
    frame_number <- map["frame_number"]
    purchase_date <- map["purchase_date"]
//    vehicle_color <- map["vehicle_color"]
    
    tires <- map["tires"]
    length <- map["length"]
    width <- map["width"]
    hight <- map["hight"]
    onehundred_consumption <- map["onehundred_consumption"]
    
    device <- map["device"]
    install_date <- map["install_date"]
//    install_user <- map["install_user"]
//    group <- map["group"]
//    safe_zone <- map["safe_zone"]
    
//    un_safe_zone <- map["un_safe_zone"]
    photos <- map["photos"]
    note <- map["note"]
    status <- map["status"]
  }
  
  /// 为了oc😓
  /// - Parameter json: <#json description#>
  @objc class func getModel(_ json:[String:Any]) ->JFLVehicle?{
    return JFLBDTools.getModel(json, classType: JFLVehicle.self)
  }
  
  /// 为了oc😓
  /// - Parameter json: <#json description#>
  @objc class func getModelArray(_ json:[[String:Any]]) ->[JFLVehicle]{
    return JFLBDTools.getModelArray(json, classType: JFLVehicle.self)
  }
}
