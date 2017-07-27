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
@property (weak, nonatomic) IBOutlet UISegmentedControl *periodSegment;
@property (weak, nonatomic) IBOutlet UIDatePicker *datePicker;
@property (weak, nonatomic) IBOutlet UISwitch *repeatSwitch;

@end

@implementation NotificationViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.
    
}

// 创建一个本地推送通知
- (IBAction)creatLocalNotification:(UIButton *)sender {
    if (sender.tag == 10) {
        [NotificationService creatLocalNotificationWithTitle:@"Dely 时间提醒 - title" subTitle:@"Dely 测试本地通知 - subtitle" body:@"Dely 测试本地通知，欢迎你测试！希望成功 - body" userInfo:@{@"userName":@"Allen",@"userCode":@"772814"} requestIdentifier:@"request-001" afterTimeInterval:10.0f repeats:NO];
    } else if (sender.tag == 11) {
        NSCalendar *systemCalendar = [NSCalendar autoupdatingCurrentCalendar];
        
        NSCalendarUnit unitOfCalendar = NSCalendarUnitYear | NSCalendarUnitMonth | NSCalendarUnitDay | NSCalendarUnitHour | NSCalendarUnitMinute;
        
        if (self.repeatSwitch.isOn) {
            switch (self.periodSegment.selectedSegmentIndex) {
                case 0:
                    // 每天
                    if (IOS10_OR_LATER) {
                        unitOfCalendar = NSCalendarUnitHour | NSCalendarUnitMinute;
                    } else if (IOS8_OR_LATER) {
                        unitOfCalendar = NSCalendarUnitDay;
                    }
                    break;
                case 1:
                    // 每周的某天
                    if (IOS10_OR_LATER) {
                        unitOfCalendar = NSCalendarUnitWeekday | NSCalendarUnitHour | NSCalendarUnitMinute;
                    } else if (IOS8_OR_LATER) {
                        unitOfCalendar = NSCalendarUnitWeekOfYear;
                    }
                    break;
                case 2:
                    // 每月的某天
                    if (IOS10_OR_LATER) {
                        unitOfCalendar = NSCalendarUnitDay | NSCalendarUnitHour | NSCalendarUnitMinute;
                    } else if (IOS8_OR_LATER) {
                        unitOfCalendar = NSCalendarUnitMonth;
                    }
                    break;
                case 3:
                    // 每年的某天
                    if (IOS10_OR_LATER) {
                        unitOfCalendar = NSCalendarUnitMonth | NSCalendarUnitDay | NSCalendarUnitHour | NSCalendarUnitMinute;
                    } else if (IOS8_OR_LATER) {
                        unitOfCalendar = NSCalendarUnitYear;
                    }
                    break;
                    
                default:
                    break;
            }
        }
        
        NSDateComponents *components = [systemCalendar components:unitOfCalendar fromDate:self.datePicker.date];
        
        NSLog(@"dataComponents = %@",components);
        if (IOS10_OR_LATER) {
            [NotificationService creatLocalNotificationWithTitle:@"Dely 时间提醒 - title" subTitle:@"Dely 测试本地通知 - subtitle" body:@"Dely 测试本地通知，欢迎你测试！希望成功 - body" userInfo:@{@"userName":@"Allen",@"userCode":@"772814"} requestIdentifier:@"request-002" dateComponents:components repeats:self.repeatSwitch.isOn];
        } else if (IOS8_OR_LATER) {
            [NotificationService creatLocalNotificationWithTitle:@"iOS10以前的本地推送" subTitle:@"测试推送周期" body:@"测试推送周期，希望成功" userInfo:@{@"userName":@"Allen",@"userCode":@"772814",@"requestIdentifier":@"request-003"} fireDate:self.datePicker.date repeatInterval:unitOfCalendar];
        }
        
    }
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
