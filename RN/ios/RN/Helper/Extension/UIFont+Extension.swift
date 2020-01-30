//
//  UIFont+Extension.swift
//  RN
//
//  Created by 何治军 on 2019/12/11.
//  Copyright © 2019 Facebook. All rights reserved.
//

import UIKit

extension UIFont {
    /// 自定义字体，以便于后期修改
    class func customFont(ofSize:CGFloat , weight: UIFont.Weight? = UIFont.Weight.init(rawValue: 0)) ->UIFont {
        return UIFont.systemFont(ofSize: ofSize,  weight: weight ?? .init(rawValue: 0))
    }
}

