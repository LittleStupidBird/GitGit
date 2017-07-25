//
//  FrameworkViewController.m
//  TestDemo
//
//  Created by Allen on 2017/7/19.
//  Copyright © 2017年 AIA. All rights reserved.
//

#import "FrameworkViewController.h"
#import <DemoFramework/DemoInterface.h>

@interface FrameworkViewController ()

@end

@implementation FrameworkViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor = [UIColor whiteColor];
    // Do any additional setup after loading the view.
    UIViewController *vc = [DemoInterface getDemoViewController];
    [self.view addSubview:vc.view];
    [self addChildViewController:vc];
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
