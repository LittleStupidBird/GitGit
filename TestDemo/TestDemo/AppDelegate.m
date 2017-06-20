//
//  AppDelegate.m
//  TestDemo
//
//  Created by Allen on 2017/2/7.
//  Copyright © 2017年 AIA. All rights reserved.
//

#import "AppDelegate.h"
#import <EventKit/EventKit.h>
//#import "UICKeyChainStore.h"
#import <iMOWrapperDylibDev/WrapperConnector.h>
#import "SecurityUtil.h"
#import "GTMBase64.h"
#import "AppAuth.h"


@interface AppDelegate ()
@property (nonatomic,strong) NSNotification *myNoti;
@end

@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    // Override point for customization after application launch.
    
    
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
    
    //配置谷歌日历
    
    return YES;
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
