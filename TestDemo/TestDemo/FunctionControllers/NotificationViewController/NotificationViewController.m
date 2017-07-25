//
//  NotificationViewController.m
//  TestDemo
//
//  Created by Allen on 2017/7/21.
//  Copyright © 2017年 AIA. All rights reserved.
//

#import "NotificationViewController.h"
#import "NotificationService.h"

#ifdef NSFoundationVersionNumber_iOS_9_x_Max
#import <UserNotifications/UserNotifications.h>
#endif

@interface NotificationViewController ()

@end

@implementation NotificationViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.
    
}

// 创建一个本地推送通知
- (IBAction)creatLocalNotification:(id)sender {
//    UNNotificationAction *action = [UNNotificationAction actionWithIdentifier:@"reply" title:@"Reply" options:UNNotificationActionOptionNone];
    
    // 设置触发条件 UNNotificationTrigger
//    UNTimeIntervalNotificationTrigger *timeTrigger = [UNTimeIntervalNotificationTrigger triggerWithTimeInterval:120.0f repeats:NO];
    
    NSDateComponents *components = [[NSDateComponents alloc] init];
    components.month = 7;
    components.weekOfMonth = 4;
    components.weekday = 2;
    components.hour = 13;
    components.minute = 52;
    
    NSCalendar *aCalendar = [NSCalendar autoupdatingCurrentCalendar];
    NSDate *startDate = [aCalendar dateFromComponents:components];
    NSLog(@"date = %@",startDate);
    UNCalendarNotificationTrigger *timeTrigger = [UNCalendarNotificationTrigger triggerWithDateMatchingComponents:components repeats:YES];
    
    // 创建通知内容 UNMutableNotificationContent, 注意不是 UNNotificationContent ,此对象为不可变对象。
    UNMutableNotificationContent *content = [[UNMutableNotificationContent alloc] init];
    content.title = @"Dely 时间提醒 - title";
    content.subtitle = [NSString stringWithFormat:@"Dely 测试本地通知 - subtitle"];
    content.body = @"Dely 测试本地通知，欢迎你测试！希望成功 - body";
    content.badge = @1;
    content.sound = [UNNotificationSound defaultSound];
    content.userInfo = @{@"key1":@"value1",@"key2":@"value2"};
    
    
    // 创建通知标示
    NSString *requestIdentifier = @"Dely.X.time";
    // 创建通知请求 UNNotificationRequest 将触发条件和通知内容添加到请求中
    UNNotificationRequest *request = [UNNotificationRequest requestWithIdentifier:requestIdentifier content:content trigger:timeTrigger];
    UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
    // 将通知请求 add 到 UNUserNotificationCenter
    [center addNotificationRequest:request withCompletionHandler:^(NSError * _Nullable error) { if (!error) {
        NSLog(@"推送已添加成功 %@", requestIdentifier);
        //你自己的需求例如下面：
        UIAlertController *alert = [UIAlertController alertControllerWithTitle:@"本地通知" message:@"成功添加推送" preferredStyle:UIAlertControllerStyleAlert];
        UIAlertAction *cancelAction = [UIAlertAction actionWithTitle:@"取消" style:UIAlertActionStyleCancel handler:nil];
        [alert addAction:cancelAction];
        [[UIApplication sharedApplication].keyWindow.rootViewController presentViewController:alert animated:YES completion:nil];
        //此处省略一万行需求。。。。
        
    } }];
}

// 清除所有本地通知
- (IBAction)removeAllLocalNotification:(id)sender {
    [NotificationService removeAllNotification];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
