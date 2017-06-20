//
//  GoogleCalendarViewController.h
//  TestDemo
//
//  Created by Allen on 2017/6/13.
//  Copyright © 2017年 AIA. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <GTMAppAuth/GTMAppAuth.h>
#import "GTLRCalendar.h"

@interface GoogleCalendarViewController : UIViewController


@property (nonatomic, strong) IBOutlet UIButton *signInButton;
@property (nonatomic, strong) IBOutlet UITextView *output;
@property (nonatomic, strong) GTLRCalendarService *service;

@end
