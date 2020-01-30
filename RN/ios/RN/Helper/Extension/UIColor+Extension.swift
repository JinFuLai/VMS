//
//  UIColor+Extension.swift
//  RN
//
//  Created by 何治军 on 2019/12/11.
//  Copyright © 2019 Facebook. All rights reserved.
//

import UIKit

extension UIColor {
    
    ///随机色
    class var random:UIColor {
        return UIColor(red: CGFloat(arc4random_uniform(256))/255.0, green: CGFloat(arc4random_uniform(256))/255.0, blue: CGFloat(arc4random_uniform(256))/255.0, alpha: 1)
    }
    
    /// 通过哈希值返回颜色
    ///
    /// - Parameter hexColor: 哈希值
    /// - Returns: <#return value description#>
    class func hexColor(_ hexColor:Int) ->UIColor {
        let red = CGFloat((hexColor & 0xFF0000) >> 16)/255.0
        let green = CGFloat((hexColor & 0xFF00) >> 8)/255.0
        let blue = CGFloat(hexColor & 0xFF)/255.0
        return UIColor(red: red, green: green, blue: blue, alpha: 1)
    }
    
    /// 通过哈希值字符返回颜色
    ///
    /// - Parameter hexColor: 哈希值字符
    /// - Returns: <#return value description#>
    class func hexColor(_ hexColor:String) ->UIColor {
        return UIColor.hexColor(hexColor, alpha: 1)
    }
    
    /// 通过哈希值字符返回颜色
    ///
    /// - Parameter hexColor: 哈希值字符
    /// - Parameter alpha: 透明度
    /// - Returns: <#return value description#>
    class func hexColor(_ hexColor:String ,alpha:CGFloat) ->UIColor {
        var cString = hexColor.trimmingCharacters(in: CharacterSet.whitespacesAndNewlines).uppercased()
        // 去掉前缀
        if cString.hasPrefix("0X") {
            let start = cString.index(cString.startIndex, offsetBy: 2)
            cString = String(cString[start..<cString.endIndex])
        }
        if cString.hasPrefix("#") {
            let start = cString.index(cString.startIndex, offsetBy: 1)
            cString = String(cString[start..<cString.endIndex])
        }
        
        guard cString.count == 6 else {
            return .black
        }
        var redStr:String = ""
        var greenStr:String = ""
        var blueStr:String = ""
        for i in 0...2 {
            let start = cString.index(cString.startIndex, offsetBy: i * 2)
            let end = cString.index(start, offsetBy: 2)
            if i == 0 {
                redStr = String(cString[start..<end])
            }else if i == 1 {
                greenStr = String(cString[start..<end])
            }else{
                blueStr = String(cString[start..<end])
            }
        }
        var r:UInt64 = 0
        Scanner(string: redStr).scanHexInt64(&r)
        var g:UInt64 = 0
        Scanner(string: greenStr).scanHexInt64(&g)
        var b:UInt64 = 0
        Scanner(string: blueStr).scanHexInt64(&b)
        return UIColor(red: CGFloat(r)/255.0, green:  CGFloat(g)/255.0, blue:  CGFloat(b)/255.0, alpha: alpha)
    }
}
