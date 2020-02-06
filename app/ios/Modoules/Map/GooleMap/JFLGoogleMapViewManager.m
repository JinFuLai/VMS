//
//  JFLGoogleMapViewManager.m
//  VMS
//
//  Created by 何治军 on 2020/2/3.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>
#import <React/RCTViewManager.h>

#import "VMS-Swift.h"

NS_ASSUME_NONNULL_BEGIN

@interface JFLGoogleMapViewManager : RCTViewManager

@end

NS_ASSUME_NONNULL_END


@implementation JFLGoogleMapViewManager

RCT_EXPORT_MODULE(JFLGoogleMapView)

RCT_EXPORT_VIEW_PROPERTY(mapType, NSUInteger)
RCT_EXPORT_VIEW_PROPERTY(trafficEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(showsUserLocation, BOOL)
RCT_EXPORT_VIEW_PROPERTY(buildingsEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(showRefreshDataBtn, BOOL)
RCT_EXPORT_VIEW_PROPERTY(showLocationBtn, BOOL)
RCT_EXPORT_VIEW_PROPERTY(alertVTopMargin, float)

RCT_EXPORT_VIEW_PROPERTY(onClickBottomBtnBlock, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onClickRefreshDataBtnBlock, RCTBubblingEventBlock)

RCT_EXPORT_METHOD(changeTypes:(nonnull NSNumber *)reactTag array:(NSDictionary *)dic){
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
    JFLGoogleMapView *mapView = (JFLGoogleMapView *) viewRegistry[reactTag];
    if ([dic.allKeys containsObject:@"mapType"]) {
      NSString *type = [NSString stringWithFormat:@"%@",dic[@"mapType"]];
      [mapView changeMapType:type.longLongValue];
    }
    if ([dic.allKeys containsObject:@"trafficEnabled"]) {
      BOOL enable = dic[@"trafficEnabled"];
      [mapView changeTrafficEnabled:enable];
    }
    if ([dic.allKeys containsObject:@"showsUserLocation"]) {
      BOOL enable = dic[@"showsUserLocation"];
      [mapView changeShowsUserLocation:enable];
    }
    if ([dic.allKeys containsObject:@"buildingsEnabled"]) {
      BOOL enable = dic[@"buildingsEnabled"];
      [mapView changeBuildingsEnabled:enable];
    }
    if ([dic.allKeys containsObject:@"language"]) {
      NSString *language = dic[@"language"];
      [mapView setLanguage:language];
    }
  }];
}

RCT_EXPORT_METHOD(setLanguage:(nonnull NSNumber *)reactTag language:(NSString* _Nonnull)language){
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
    JFLGoogleMapView *mapView = (JFLGoogleMapView *) viewRegistry[reactTag];
    [mapView setLanguage:language];
  }];
}


RCT_EXPORT_METHOD(addMarkList:(nonnull NSNumber *)reactTag array:(NSArray<NSDictionary<NSString *,id> *> * _Nonnull)array){
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
    JFLGoogleMapView *mapView = (JFLGoogleMapView *) viewRegistry[reactTag];
    [mapView addMarks:[JFLVehicle getModelArray:array]];
  }];
}

RCT_EXPORT_METHOD(removeMarks:(nonnull NSNumber *)reactTag array:(NSArray<NSDictionary<NSString *,id> *> * _Nonnull)array){
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
    JFLGoogleMapView *mapView = (JFLGoogleMapView *) viewRegistry[reactTag];
    [mapView removeMarks:[JFLVehicle getModelArray:array]];
  }];
}

RCT_EXPORT_METHOD(removeAllMarks:(nonnull NSNumber *)reactTag){
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
    JFLGoogleMapView *mapView = (JFLGoogleMapView *) viewRegistry[reactTag];
    [mapView removeAllMarks];
  }];
}

RCT_EXPORT_METHOD(addPolylines:(nonnull NSNumber *)reactTag array:(NSArray<NSDictionary<NSString *,id> *> * _Nonnull)array){
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
    JFLGoogleMapView *mapView = (JFLGoogleMapView *) viewRegistry[reactTag];
    [mapView addPolylines:[JFLLocation getModelArray:array]];
  }];
}

RCT_EXPORT_METHOD(startHistoryAnimation:(nonnull NSNumber *)reactTag){
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
    JFLGoogleMapView *mapView = (JFLGoogleMapView *) viewRegistry[reactTag];
    [mapView startHistoryAnimation];
  }];
}

RCT_EXPORT_METHOD(stopHistoryAnimation:(nonnull NSNumber *)reactTag){
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
    JFLGoogleMapView *mapView = (JFLGoogleMapView *) viewRegistry[reactTag];
    [mapView stopHistoryAnimation];
  }];
}

RCT_EXPORT_METHOD(setLocationItem:(nonnull NSNumber *)reactTag array:(NSDictionary<NSString *,id> *)item){
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
    JFLGoogleMapView *mapView = (JFLGoogleMapView *) viewRegistry[reactTag];
    [mapView setLocationItem:[JFLVehicle getModel:item]];
  }];
}


- (UIView *)view{
  return [[JFLGoogleMapView alloc]init];
}
@end
