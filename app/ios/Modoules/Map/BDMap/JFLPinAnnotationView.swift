////
////  JFLPinAnnotationView.swift
////  RN
////
////  Created by 何治军 on 2019/12/13.
////  Copyright © 2019 Facebook. All rights reserved.
////
//
//import UIKit
//
//class JFLPinAnnotationView: BMKPinAnnotationView {
//  
//  /// 旋转图片
//  /// - Parameter rotationAngle: 旋转角度(暂以正北方向为0度，顺时针增加)
//  func changeRotationAngle(_ rotationAngle:CGFloat) {
//    self.customImgV.transform = CGAffineTransform(rotationAngle:CGFloat(Double.pi / 180) * (rotationAngle))
//  }
//  
//  /// 设置图片，和旋转角度
//  /// - Parameters:
//  ///   - img: 图片
//  ///   - rotationAngle: 旋转角度(暂以正东方向为0度，顺时针增加)
//  func setImage(_ img:UIImage?, rotationAngle:CGFloat? = 0) {
//    if let new = img {
//      self.image = UIImage(named: "blank")
//      self.customImgV.image = new
//      self.customImgV.transform = CGAffineTransform(rotationAngle:CGFloat(Double.pi / 180) * (rotationAngle ?? 0))
//    }
//  }
//  
//  /// 自定义图片控件
//  lazy var customImgV: UIImageView = UIImageView()
//  
//  override init!(annotation: BMKAnnotation!, reuseIdentifier: String!) {
//    super.init(annotation: annotation, reuseIdentifier: reuseIdentifier)
//    self.addSubview(customImgV)
//    customImgV.snp.makeConstraints{$0.edges.equalToSuperview()}
//  }
//  
//  required init?(coder: NSCoder) {
//    fatalError("init(coder:) has not been implemented")
//  }
//  
//}
