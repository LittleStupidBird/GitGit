//
//  AppDelegate.h
//  TestDemo
//
//  Created by Allen on 2017/2/7.
//  Copyright © 2017年 AIA. All rights reserved.
//

#import <UIKit/UIKit.h>

@protocol OIDAuthorizationFlowSession;

@interface AppDelegate : UIResponder <UIApplicationDelegate>

@property (strong, nonatomic) UIWindow *window;
@property(nonatomic, strong, nullable) id<OIDAuthorizationFlowSession> currentAuthorizationFlow;


@end

