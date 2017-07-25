//
//  NotificationService.h
//  TestDemo
//
//  Created by Allen on 2017/7/25.
//  Copyright © 2017年 AIA. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface NotificationService : NSObject

/**
 * 创建一个新的本地通知
 */
+ (void)creatLocalNotificationWithTitle:(NSString *)title subTitle:(NSString *)subTitle body:(NSString *)body userInfo:(NSDictionary *)userInfo requestIdentifier:(NSString *)requestIdentifier dateComponents:(NSDateComponents *)components repeats:(BOOL)repeats;

/**
 * 根据标识符删除所有通知
 */
+ (void)removeNotificationWithRequestIdentifier:(NSString *)requestIdentifier;

/**
 * 删除所有通知
 */
+ (void)removeAllNotification;

@end
