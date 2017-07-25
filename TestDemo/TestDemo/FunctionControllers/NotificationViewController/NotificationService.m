//
//  NotificationService.m
//  TestDemo
//
//  Created by Allen on 2017/7/25.
//  Copyright © 2017年 AIA. All rights reserved.
//

#import "NotificationService.h"
#import <UserNotifications/UserNotifications.h>

@implementation NotificationService
/**
 * 关于NSDateComponents类型
 * components.month = 7; 表示7月
 * components.weekOfMonth = 4; 表示7月第四周(标准从周日~周六是一周)
 * components.weekday = 2; 表示每周第二天
 * components.hour = 13; 表示下午1点
 * components.minute = 52; 表示52分钟
 * 设置repeats=YES时，系统会按照如上规则进行重复提醒，缺省值忽略
 */
// 创建一个本地推送通知
+ (void)creatLocalNotificationWithTitle:(NSString *)title subTitle:(NSString *)subTitle body:(NSString *)body userInfo:(NSDictionary *)userInfo requestIdentifier:(NSString *)requestIdentifier dateComponents:(NSDateComponents *)components repeats:(BOOL)repeats {
    // 设置触发条件 UNNotificationTrigger
    UNCalendarNotificationTrigger *timeTrigger = [UNCalendarNotificationTrigger triggerWithDateMatchingComponents:components repeats:repeats];
    
    // 创建通知内容 UNMutableNotificationContent, 注意不是 UNNotificationContent ,此对象为不可变对象。
    UNMutableNotificationContent *content = [[UNMutableNotificationContent alloc] init];
    content.title = title;
    content.subtitle = subTitle;
    content.body = body;
    content.badge = @1;
    content.sound = [UNNotificationSound defaultSound];
    content.userInfo = userInfo;
    
    // 创建通知请求 UNNotificationRequest 将触发条件和通知内容添加到请求中
    UNNotificationRequest *request = [UNNotificationRequest requestWithIdentifier:requestIdentifier content:content trigger:timeTrigger];
    UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
    // 将通知请求 add 到 UNUserNotificationCenter
    [center addNotificationRequest:request withCompletionHandler:^(NSError * _Nullable error) {
        if (!error) {
            NSLog(@"推送已添加成功 %@", requestIdentifier);
        }
    }];
}

// 删除一个本地推送通知
+ (void)removeNotificationWithRequestIdentifier:(NSString *)requestIdentifier {
    UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
    [center removePendingNotificationRequestsWithIdentifiers:@[requestIdentifier]];
    [center removeDeliveredNotificationsWithIdentifiers:@[requestIdentifier]];
}

+ (void)removeAllNotification {
    UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
    // 删除所有未推送的通知
    [center removeAllPendingNotificationRequests];
    // 删除所有已经推送的通知
    [center removeAllDeliveredNotifications];
}

@end
