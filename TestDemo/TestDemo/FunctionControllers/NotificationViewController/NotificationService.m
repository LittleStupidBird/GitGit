//
//  NotificationService.m
//  TestDemo
//
//  Created by Allen on 2017/7/25.
//  Copyright © 2017年 AIA. All rights reserved.
//

#import "NotificationService.h"
#import <UserNotifications/UserNotifications.h>

#define IOS10_OR_LATER ([[[UIDevice currentDevice] systemVersion] floatValue] >= 10.0)
#define IOS9_OR_LATER ([[[UIDevice currentDevice] systemVersion] floatValue] >= 9.0)
#define IOS8_OR_LATER ([[[UIDevice currentDevice] systemVersion] floatValue] >= 8.0)
#define IOS7_OR_LATER ([[[UIDevice currentDevice] systemVersion] floatValue] >= 7.0)

@implementation NotificationService

+ (void)replyPushNotificationAuthorization:(UIApplication *)application andDelegate:(id)delegate {
    // iOS推送测试
    if (IOS10_OR_LATER) {
        // iOS10以后
        UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
        center.delegate = delegate;
        [center requestAuthorizationWithOptions:(UNAuthorizationOptionBadge | UNAuthorizationOptionSound | UNAuthorizationOptionAlert) completionHandler:^(BOOL granted, NSError * _Nullable error) {
            if (granted) {
                NSLog(@"注册推送成功");
                // 获取注册详情
                [center getNotificationSettingsWithCompletionHandler:^(UNNotificationSettings * _Nonnull settings) {
                    NSLog(@"注册详情-%@", settings);
                }];
            } else {
                NSLog(@"注册推送失败");
                if (error) {
                    NSLog(@"失败详情-%@",error.description);
                }
            }
        }];
    } else if (IOS8_OR_LATER) {
        // iOS8以后
        UIUserNotificationSettings *settings = [UIUserNotificationSettings settingsForTypes:UIUserNotificationTypeAlert | UIUserNotificationTypeBadge | UIUserNotificationTypeSound categories:nil];
        [application registerUserNotificationSettings:settings];
    }
    
    
    // 注册获得device Token
    [application registerForRemoteNotifications];
}

// iOS10基于时间间隔，创建一个本地通知
+ (void)creatLocalNotificationWithTitle:(NSString *)title subTitle:(NSString *)subTitle body:(NSString *)body userInfo:(NSDictionary *)userInfo requestIdentifier:(NSString *)requestIdentifier afterTimeInterval:(NSTimeInterval)timeInterval repeats:(BOOL)repeats {
    // 设置触发条件 UNTimeIntervalNotificationTrigger
    UNTimeIntervalNotificationTrigger *timeTrigger = [UNTimeIntervalNotificationTrigger triggerWithTimeInterval:timeInterval repeats:repeats];
    
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

/**
 * 关于NSDateComponents类型
 * components.month = 7; 表示7月
 * components.weekOfMonth = 4; 表示7月第四周(标准从周日~周六是一周)
 * components.weekday = 2; 表示每周第二天
 * components.hour = 13; 表示下午1点
 * components.minute = 52; 表示52分钟
 * 设置repeats=YES时，系统会按照如上规则进行重复提醒，缺省值忽略
 */
// iOS基于日历时间，创建一个本地通知
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

// iOS10以前创建一个本地通知
+ (void)creatLocalNotificationWithTitle:(NSString *)title subTitle:(NSString *)subTitle body:(NSString *)body userInfo:(NSDictionary *)userInfo fireDate:(NSDate *)fireDate repeatInterval:(NSCalendarUnit)repeatInterval {
    UILocalNotification *notification = [[UILocalNotification alloc] init];
    // 设置触发通知的时间
    notification.fireDate = fireDate;
    // 时区
    notification.timeZone = [NSTimeZone defaultTimeZone];
    // 设置重复的间隔 iOS10以下无法基于自定义的时间重复，只能根据有限的枚举进行重复NSCalendarUnit
    notification.repeatInterval = repeatInterval;
    // 通知内容
    notification.alertBody = body;
    notification.applicationIconBadgeNumber = 1;
    // 通知被触发时播放的声音
    notification.soundName = UILocalNotificationDefaultSoundName;
    // 通知参数
    notification.userInfo = userInfo;
    // 执行通知注册
    [[UIApplication sharedApplication] scheduleLocalNotification:notification];
}

// 删除一个本地推送通知
+ (void)removeNotificationWithRequestIdentifier:(NSString *)requestIdentifier {
    if (IOS10_OR_LATER) {
        UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
        [center removePendingNotificationRequestsWithIdentifiers:@[requestIdentifier]];
        [center removeDeliveredNotificationsWithIdentifiers:@[requestIdentifier]];
    } else if (IOS8_OR_LATER) {
        // 获取所有通知
        NSArray *notificaitons = [[UIApplication sharedApplication] scheduledLocalNotifications];
        if (!notificaitons || notificaitons.count <= 0) {
            return;
        }
        for (UILocalNotification *notify in notificaitons) {
            if ([[notify.userInfo objectForKey:@"requestIdentifier"] isEqualToString:requestIdentifier]) {
                // 取消一个特定的通知
                [[UIApplication sharedApplication] cancelLocalNotification:notify];
                break;
            }
        }
    }
}

+ (void)removeAllNotification {
    if (IOS10_OR_LATER) {
        UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
        // 删除所有未推送的通知
        [center removeAllPendingNotificationRequests];
        // 删除所有已经推送的通知
        [center removeAllDeliveredNotifications];
    } else if (IOS8_OR_LATER) {
        [[UIApplication sharedApplication] cancelAllLocalNotifications];
    }
}

+ (void)addNotificationCategory {
    UNNotificationAction *enterAction = [UNNotificationAction actionWithIdentifier:@"enterApp" title:@"进入应用" options:UNNotificationActionOptionForeground];
    UNNotificationAction *ingnoreAction = [UNNotificationAction actionWithIdentifier:@"ignore" title:@"忽略" options:UNNotificationActionOptionDestructive];
    UNNotificationCategory *category = [UNNotificationCategory categoryWithIdentifier:@"helloIdentifier" actions:@[enterAction,ingnoreAction] intentIdentifiers:@[] options:UNNotificationCategoryOptionNone];
//    [UNNotificationCategory categoryWithIdentifier:@"helloIdentifier" actions:@[enterAction,ingnoreAction] intentIdentifiers:@[] hiddenPreviewsBodyPlaceholder:@"wangqing" options:UNNotificationCategoryOptionNone];
    
    [[UNUserNotificationCenter currentNotificationCenter] setNotificationCategories:[NSSet setWithObjects:category, nil]];
}

@end
