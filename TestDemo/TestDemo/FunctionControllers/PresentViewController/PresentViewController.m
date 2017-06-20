//
//  PresentViewController.m
//  TestDemo
//
//  Created by Allen on 2017/4/12.
//  Copyright © 2017年 AIA. All rights reserved.
//

#import "PresentViewController.h"
#import "TestView.h"

@interface PresentViewController ()

@end

@implementation PresentViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    [self initUI];
}

- (void)initUI {
    self.view.backgroundColor = [UIColor whiteColor];
    
    TestView *testView = [[TestView alloc] initWithFrame:CGRectMake(10, 200, 200, 200)];
    testView.backgroundColor = [UIColor redColor];
    [self.view addSubview:testView];
    
//    //配置按钮
//    UIButton *presentBtn = [[UIButton alloc] initWithFrame:CGRectMake(100, 100, 100, 30)];
//    [presentBtn setTitleColor:[UIColor blackColor] forState:UIControlStateNormal];
//    [presentBtn setTitle:@"Present" forState:UIControlStateNormal];
//    [presentBtn addTarget:self action:@selector(presentClicked) forControlEvents:UIControlEventTouchUpInside];
//    
//    UIButton *dismissBtn = [[UIButton alloc] initWithFrame:CGRectMake(100, 300, 100, 30)];
//    [dismissBtn setTitleColor:[UIColor blackColor] forState:UIControlStateNormal];
//    [dismissBtn setTitle:@"Dismiss" forState:UIControlStateNormal];
//    [dismissBtn addTarget:self action:@selector(dismissClicked) forControlEvents:UIControlEventTouchUpInside];
//    
//    [self.view addSubview:presentBtn];
//    [self.view addSubview:dismissBtn];
}


- (void)presentClicked {
    UIViewController *presentedVC = [[UIViewController alloc] init];
    presentedVC.view.backgroundColor = [UIColor redColor];
    presentedVC.view.frame = CGRectMake(200, 200, 200, 200);
    __weak __typeof(&*self)weakSelf = self;
    [self presentViewController:presentedVC animated:YES completion:^{
        [weakSelf performSelector:@selector(backToMainTable) withObject:nil afterDelay:5];
    }];
}

- (void)backToMainTable {
    [self.navigationController.presentationController.presentedViewController dismissViewControllerAnimated:NO completion:nil];
    [self.navigationController popToRootViewControllerAnimated:YES];
}

-(void)viewWillDisappear:(BOOL)animated {
    
}
- (void)dealloc {
    
}

- (void)dismissClicked {
    
    [self dismissViewControllerAnimated:YES completion:^{
        
    }];
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
