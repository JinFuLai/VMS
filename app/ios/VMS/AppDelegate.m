/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
//#import <BaiduMapAPI_Base/BMKBaseComponent.h>
//#import <BMKLocationkit/BMKLocationComponent.h>
#if RCT_DEV
#import <React/RCTDevLoadingView.h>
#endif

#import <GoogleMaps/GoogleMaps.h>

@interface AppDelegate()
//<BMKLocationAuthDelegate>

@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
//  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  
  NSURL *jsCodeLocation;
  #ifdef DEBUG

    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  #else

    jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];

  #endif
  
  RCTBridge *bridge = [[RCTBridge alloc] initWithBundleURL:jsCodeLocation
                                              moduleProvider:nil
                                               launchOptions:launchOptions];
  #if RCT_DEV
    [bridge moduleForClass:[RCTDevLoadingView class]];
  #endif

  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"VMS"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
//  百度地图相关
//  BMKMapManager *mapManager = [[BMKMapManager alloc] init];
//  // 如果要关注网络及授权验证事件，请设定generalDelegate参数
//  BOOL ret = [mapManager start:@"Za6BsogYqHMDKHebmY5Hjrz4Oxsk3QjY"  generalDelegate:nil];
//  if (!ret) {
//      NSLog(@"manager start failed!");
//  }
////  //设置为GCJ02坐标
////  [BMKMapManager setCoordinateTypeUsedInBaiduMapSDK: BMK_COORDTYPE_COMMON];
//  //定位
//  [[BMKLocationAuth sharedInstance] checkPermisionWithKey:@"Za6BsogYqHMDKHebmY5Hjrz4Oxsk3QjY" authDelegate:self];
  //谷歌地图
  [GMSServices provideAPIKey:@"AIzaSyBT6v9p64rmCpRmZou0Hd6s5x9bD2y1-t0"];
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

//- (void)onCheckPermissionState:(BMKLocationAuthErrorCode)iError{
//  NSLog(@"百度定位sdk注册错误：%ld", (long)iError);
//}
@end
