//
//  NotificationService.h
//  TestDemo
//
//  Created by Allen on 2017/7/25.
//  Copyright © 2017年 AIA. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

#define IOS10_OR_LATER ([[[UIDevice currentDevice] systemVersion] floatValue] >= 10.0)
#define IOS9_OR_LATER ([[[UIDevice currentDevice] systemVersion] floatValue] >= 9.0)
#define IOS8_OR_LATER ([[[UIDevice currentDevice] systemVersion] floatValue] >= 8.0)
#define IOS7_OR_LATER ([[[UIDevice currentDevice] systemVersion] floatValue] >= 7.0)

@interface NotificationService : NSObject <UIApplicationDelegate>
/**
 * 让用户给推送授权，并注册APNS获取DeviceToken
 */
+ (void)replyPushNotificationAuthorization:(UIApplication *)application andDelegate:(id)delegate;

/**
 * 基于时间间隔，创建一个本地通知
 */
+ (void)creatLocalNotificationWithTitle:(NSString *)title subTitle:(NSString *)subTitle body:(NSString *)body userInfo:(NSDictionary *)userInfo requestIdentifier:(NSString *)requestIdentifier afterTimeInterval:(NSTimeInterval)timeInterval repeats:(BOOL)repeats;

/**
 * 基于日历时间，创建一个本地通知
 */
+ (void)creatLocalNotificationWithTitle:(NSString *)title subTitle:(NSString *)subTitle body:(NSString *)body userInfo:(NSDictionary *)userInfo requestIdentifier:(NSString *)requestIdentifier dateComponents:(NSDateComponents *)components repeats:(BOOL)repeats;

/**
 * iOS10以前创建一个本地通知
 */
+ (void)creatLocalNotificationWithTitle:(NSString *)title subTitle:(NSString *)subTitle body:(NSString *)body userInfo:(NSDictionary *)userInfo fireDate:(NSDate *)fireDate repeatInterval:(NSCalendarUnit)repeatInterval;

/**
 * 根据标识符删除所有通知
 */
+ (void)removeNotificationWithRequestIdentifier:(NSString *)requestIdentifier;
    
/**
 * 删除所有通知
 */
+ (void)removeAllNotification;

/**
 * Test-添加通知Action分类
 */
+ (void)addNotificationCategory;
@end
