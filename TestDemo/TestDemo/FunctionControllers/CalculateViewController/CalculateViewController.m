//
//  CalculateViewController.m
//  TestDemo
//
//  Created by Allen on 2017/3/2.
//  Copyright © 2017年 AIA. All rights reserved.
//

#import "CalculateViewController.h"
#import "NSObject+Calculate.h"

@interface CalculateViewController ()

@end

@implementation CalculateViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    self.navigationItem.title = @"123";
    
    int sum = [self wq_makeCalculate:^(CalculateManager *mgr) {
        [[mgr add:5] add:4];
        mgr.add(5).add(4); 
    }];
    NSLog(@"和为:%d",sum);
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
