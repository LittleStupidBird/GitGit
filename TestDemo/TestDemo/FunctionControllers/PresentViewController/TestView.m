//
//  TestView.m
//  TestDemo
//
//  Created by Allen on 2017/5/29.
//  Copyright © 2017年 AIA. All rights reserved.
//

#import "TestView.h"
#import "ReactiveObjC.h"

@implementation TestView

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

- (instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        [self initUI];
    }
    return self;
}

- (void)initUI {
    UITextField *newTextField = [[UITextField alloc] initWithFrame:CGRectMake(0, 0, 100, 40)];
    newTextField.backgroundColor = [UIColor whiteColor];
    newTextField.placeholder = @"test";
    newTextField.delegate = self;
    [[self rac_signalForSelector:@selector(textFieldShouldBeginEditing:) fromProtocol:@protocol(UITextFieldDelegate)] subscribeNext:^(NSString * _Nullable x) {
        NSMutableDictionary *dict = [NSMutableDictionary dictionary];
        dict[NSForegroundColorAttributeName] = [UIColor redColor];
        NSAttributedString *attribute = [[NSAttributedString alloc] initWithString:newTextField.placeholder attributes:dict];
        [newTextField setAttributedPlaceholder:attribute];
    }];
    
    
    [self addSubview:newTextField];
}
@end
