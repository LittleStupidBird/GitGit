//
//  AppDelegate.m
//  TestDemo
//
//  Created by Allen on 2017/2/7.
//  Copyright © 2017年 AIA. All rights reserved.
//

#import "AppDelegate.h"
#import <EventKit/EventKit.h>
#import <iMOWrapperDylibDev/WrapperConnector.h>
#import "SecurityUtil.h"
#import "GTMBase64.h"
#import "AppAuth.h"
#import "NotificationService.h"

#ifdef NSFoundationVersionNumber_iOS_9_x_Max
#import <UserNotifications/UserNotifications.h>
#endif


@interface AppDelegate () <UNUserNotificationCenterDelegate>
@property (nonatomic,strong) NSNotification *myNoti;
@end

@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    // Override point for customization after application launch.
    
    [NotificationService replyPushNotificationAuthorization:application andDelegate:self];
    
//    UICKeyChainStore *keyChainStore = [UICKeyChainStore keyChainStoreWithService:@"com.aiakh.wrapper.keychain" accessGroup:nil];
//    
//    [keyChainStore setString:@"ForTest002" forKey:@"TestKey002"];
    
//    NSString *token = keyChainStore[@"TestKey001"];
    
    // 字符串加密实验
//    NSString *enCode = [SecurityUtil encryptAESData:@"772814" app_key:@"123"];
//    
//    NSData *decodeString = [GTMBase64 decodeString:enCode];
//    
//    NSString *deCodeResult = [SecurityUtil decryptAESData:decodeString app_key:@"123"];
//    
//    NSString *token = [WrapperConnector getWrapperDeviceID];
    
    // 配置谷歌日历
    
    // 添加视图层级调试(真机才可用)
//    Class Test = NSClassFromString(@"UIDebuggingInformationOverlay");
//    [[Test class] performSelector:@selector(prepareDebuggingOverlay)];
    
    // 检查文件完整性，原理是对文件data进行sha256方式加密，然后比对加密后的字符串一致性来判断
//    [SecurityUtil checkSum];
    
    // MD5加密测试-将某个字符串进行md5加密
//    NSString *res1 = [SecurityUtil stringToMD5:@"772814"];
//    NSString *res2 = [SecurityUtil stringToMD5:@"A00020"];
//    NSString *res3 = [SecurityUtil stringToMD5:@"651511"];
//    NSString *res4 = [SecurityUtil stringToMD5:@"Wang999"];
    
    return YES;
}

#pragma -mark 注册远程推送回调
// 获得Device Token
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
    NSString *deviceString = [[deviceToken description] stringByTrimmingCharactersInSet:[NSCharacterSet characterSetWithCharactersInString:@"<>"]];
    deviceString = [deviceString stringByReplacingOccurrencesOfString:@" " withString:@""];
    NSLog(@"%@", [NSString stringWithFormat:@"设备Token: %@", deviceString]);
}

// 获得Device Token失败
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
    NSLog(@"注册远程推送(获取Token)失败: %@", error);
}

#pragma -mark UNUserNotificationCenterDelegate
// The method will be called on the delegate only if the application is in the foreground. If the method is not implemented or the handler is not called in a timely manner then the notification will not be presented. The application can choose to have the notification presented as a sound, badge, alert and/or in the notification list. This decision should be based on whether the information in the notification is otherwise visible to the user.
// 程序在前台时接收到通知会调用此方法
- (void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler {
    NSDictionary * userInfo = notification.request.content.userInfo;
    UNNotificationRequest *request = notification.request;
    
    // 收到推送的请求
    UNNotificationContent *content = request.content;
    // 收到推送的消息内容
    NSNumber *badge = content.badge;
    // 推送消息的角标
    NSString *body = content.body;
    // 推送消息体
    UNNotificationSound *sound = content.sound;
    // 推送消息的声音
    NSString *subtitle = content.subtitle;
    // 推送消息的副标题
    NSString *title = content.title;
    // 推送消息的标题
    if([notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
        NSLog(@"iOS10 前台收到远程通知:%@",userInfo);
    } else {
        // 判断为本地通知
        NSLog(@"iOS10 前台收到本地通知:{\\\\nbody:%@，\\\\ntitle:%@,\\\\nsubtitle:%@,\\\\nbadge：%@，\\\\nsound：%@，\\\\nuserInfo：%@\\\\n}",body,title,subtitle,badge,sound,userInfo);
    }
    // 需要执行这个方法，选择是否提醒用户，有Badge、Sound、Alert三种类型可以设置
    completionHandler(UNNotificationPresentationOptionBadge|UNNotificationPresentationOptionSound|UNNotificationPresentationOptionAlert);
}

// 用户在点击通知后会调用此方法
// The method will be called on the delegate when the user responded to the notification by opening the application, dismissing the notification or choosing a UNNotificationAction. The delegate must be set before the application returns from application:didFinishLaunchingWithOptions:.
- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(nonnull UNNotificationResponse *)response withCompletionHandler:(nonnull void (^)(void))completionHandler {
    NSDictionary * userInfo = response.notification.request.content.userInfo;
    UNNotificationRequest *request = response.notification.request;
    // 收到推送的请求
    UNNotificationContent *content = request.content;
    // 收到推送的消息内容
    NSNumber *badge = content.badge;
    // 推送消息的角标
    NSString *body = content.body;
    // 推送消息体
    UNNotificationSound *sound = content.sound;
    // 推送消息的声音
    NSString *subtitle = content.subtitle;
    // 推送消息的副标题
    NSString *title = content.title;
    // 推送消息的标题
    if([response.notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
        NSLog(@"iOS10 收到远程通知:%@", userInfo);
    } else {
        // 判断为本地通知
        NSLog(@"iOS10 收到本地通知:{\\\\nbody:%@，\\\\ntitle:%@,\\\\nsubtitle:%@,\\\\nbadge：%@，\\\\nsound：%@，\\\\nuserInfo：%@\\\\n}",body,title,subtitle,badge,sound,userInfo);
    }
    completionHandler(); // 系统要求执行这个方法
}

// iOS7~9接收通知的方法，以下两个方法二选一，优先走这个
//- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
//    NSLog(@"iOS7及以上系统，收到远程通知:%@", userInfo); completionHandler(UIBackgroundFetchResultNewData);
//    //此处省略一万行需求代码。。。。。。
//
//}

// 这个方法与上边的方法二选一，优先走上边的
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
    NSLog(@"iOS7及以上系统，收到本地通知:%@", userInfo);
    //此处省略一万行需求代码。。。。。。
}

- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification {
    NSLog(@"iOS7及以上系统，收到本地通知:%@", notification.userInfo);
    //此处省略一万行需求代码。。。。。。
}

- (BOOL)application:(UIApplication *)app
            openURL:(NSURL *)url
            options:(NSDictionary<NSString *, id> *)options {
    
//    return [[GIDSignIn sharedInstance] handleURL:url
//                               sourceApplication:[options objectForKey:UIApplicationOpenURLOptionsSourceApplicationKey]
//                                      annotation:[options objectForKey:UIApplicationOpenURLOptionsAnnotationKey]];

    
    // Sends the URL to the current authorization flow (if any) which will process it if it relates to
    // an authorization response.
    if ([_currentAuthorizationFlow resumeAuthorizationFlowWithURL:url]) {
        _currentAuthorizationFlow = nil;
        return YES;
    }
    
    // Your additional URL handling (if any) goes here.
    
    return NO;
}

- (void)applicationWillResignActive:(UIApplication *)application {
    // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
    // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
}


- (void)applicationDidEnterBackground:(UIApplication *)application {
    // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
    // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(storeChanged:) name:EKEventStoreChangedNotification object:nil];

}

- (void)storeChanged:(NSNotification *)noti {
    NSLog(@"--%@",noti);
    _myNoti = noti;
}


- (void)applicationWillEnterForeground:(UIApplication *)application {
    // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
}


- (void)applicationDidBecomeActive:(UIApplication *)application {
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
    
//    NSLog(@"1235");
//    
//    //1.主队列,不是自己创建的,是从系统获得,是一个特殊的串行队列,一定对应主线程
//    
//    dispatch_queue_t mainQueue = dispatch_get_main_queue();
//    
//    for (int i = 0; i<20; i++) {
//        
//        dispatch_async(mainQueue, ^{
//            
//            NSLog(@"%d->%@",i,[NSThread currentThread]);
//            
//        });
//        
//    }
//    
//    NSLog(@"呵呵");
}


- (void)applicationWillTerminate:(UIApplication *)application {
    // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
}


@end
