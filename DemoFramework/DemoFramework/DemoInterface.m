//
//  DemoInterface.m
//  DemoFramework
//
//  Created by Allen on 2017/7/19.
//  Copyright © 2017年 AIA. All rights reserved.
//

#import "DemoInterface.h"
#import "DemoViewController.h"

@implementation DemoInterface
+ (UIViewController *)getDemoViewController {
    DemoViewController *demoVC = [[DemoViewController alloc] initWithNibName:@"Frameworks/DemoFramework.framework/DemoViewController" bundle:nil];
    
    return demoVC;
}
@end
