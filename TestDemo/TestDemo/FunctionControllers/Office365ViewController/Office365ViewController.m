//
//  Office365ViewController.m
//  TestDemo
//
//  Created by Allen on 2017/6/15.
//  Copyright © 2017年 AIA. All rights reserved.
//

#import "Office365ViewController.h"
#import <MSGraphSDK/MSGraphSDK.h>


@interface Office365ViewController ()
@property (weak, nonatomic) IBOutlet UITextView *contentTextView;
@property (strong, nonatomic) MSGraphClient *graphClient;
@property (strong, nonatomic) NXOAuth2AuthenticationProvider *authProvider;

@end

@implementation Office365ViewController

/* Configurations */
//NSString * AUTHORITY_URL = @"https://login.microsoftonline.com/common"; //COMMON OR YOUR TENANT ID
//NSString * CLIENT_ID = @"6988ba50-5106-4d5c-8d8c-dbd710ccb170"; //REPLACE WITH YOUR CLIENT ID
//NSString * REDIRECT_URI = @"AIA.TestDemo://AIA.TestDemo"; //REPLACE WITH YOUR REDIRECT URL

NSString * const kClientId    = @"6988ba50-5106-4d5c-8d8c-dbd710ccb170";
NSString * const kScopes = @"User.ReadBasic.All, User.Read, User.ReadWrite, Calendars.Read";

///AIA.TestDemo://AIA.TestDemo
- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.
    
}

- (IBAction)loginButtonClicked:(id)sender {
    
    NSArray *scopes = [kScopes componentsSeparatedByString:@","];
    [self connectToGraphWithClientId:kClientId scopes:scopes completion:^(NSError *error) {
        if (!error) {
            //成功后显示用户详细信息
            [self getUserInfo];
            NSLog(@"Authentication successful.");
        }
        else{
            NSLog(NSLocalizedString(@"CHECK_LOG_ERROR", error.localizedDescription));
        };
    }];
}

//解除登录
- (IBAction)logoutButtonClicked:(id)sender {
    [self disconnect];
}

//获取日历类别
- (IBAction)getCalendarButtonClicked:(id)sender {
    [[[[self.graphClient me] calendars] request] getWithCompletion:^(MSCollection *response, MSGraphUserCalendarsCollectionRequest *nextRequest, NSError *error) {
        if (!error) {
            dispatch_async(dispatch_get_main_queue(), ^{
                NSMutableString *result = [NSMutableString string];
                for (NSDictionary *categoryDict in response.arrayFromItem) {
                    NSString *name = [categoryDict objectForKey:@"name"];
                    NSString *keyid = [categoryDict objectForKey:@"id"];
                    NSString *color = [categoryDict objectForKey:@"color"];
                    NSString *changeKey = [categoryDict objectForKey:@"changeKey"];
                    
                    [result appendFormat:@"名称===%@\nID===%@\n颜色===%@\nChangeKey===%@\n\n",name,keyid,color,changeKey];
                }
                self.contentTextView.text = result;
            });
        } else {
            dispatch_async(dispatch_get_main_queue(), ^{
                self.contentTextView.text = error.description;
            });
        }
        
    }];
}

//获取事件Event
- (IBAction)getEventButtonClicked:(id)sender {
    [[[[self.graphClient me] events] request] getWithCompletion:^(MSCollection *response, MSGraphUserEventsCollectionRequest *nextRequest, NSError *error) {
        if (!error) {
            dispatch_async(dispatch_get_main_queue(), ^{
                NSMutableString *result = [NSMutableString string];
                for (NSDictionary *eventDict in response.arrayFromItem) {
                    
                    MSGraphEvent *event = [[MSGraphEvent alloc] initWithDictionary:eventDict];
                    [result appendFormat:@"事件===%@\n地址===%@\n开始时间===%@\n结束时间===%@\n\n",event.subject,event.location.displayName,event.start.dateTime,event.end.dateTime];
                }
                self.contentTextView.text = result;
            });
        } else {
            dispatch_async(dispatch_get_main_queue(), ^{
                self.contentTextView.text = error.description;
            });
        }
    }];
}

//Retrieve the logged in user's display name and email address
- (void)getUserInfo {
    //先给请求授权
    [MSGraphClient setAuthenticationProvider:self.authProvider];
    self.graphClient = [MSGraphClient client];
    
    [[[self.graphClient me]request]getWithCompletion:^(MSGraphUser *response, NSError *error) {
        if(!error){
            dispatch_async(dispatch_get_main_queue(), ^{
                self.contentTextView.text = response.description;
            });
        }
        else{
            dispatch_async(dispatch_get_main_queue(), ^{
                self.contentTextView.text = error.description;
            });
        }
    }];
}

- (NXOAuth2AuthenticationProvider *)authProvider {
    return [NXOAuth2AuthenticationProvider sharedAuthProvider];
}


-(void)connectToGraphWithClientId:(NSString *)clientId scopes:(NSArray *)scopes completion:(void (^)(NSError *))completion{
    [NXOAuth2AuthenticationProvider setClientId:kClientId
                                         scopes:scopes];
    
    
    /**
     Obtains access token by performing login with UI, where viewController specifies the parent view controller.
     @param viewController The view controller to present the UI on.
     @param completionHandler The completion handler to be called when the authentication has completed.
     error should be non nil if there was no error, and should contain any error(s) that occurred.
     */
    if ([[NXOAuth2AuthenticationProvider sharedAuthProvider] loginSilent]) {
        completion(nil);
    }
    else{
        [[NXOAuth2AuthenticationProvider sharedAuthProvider] loginWithViewController:nil completion:^(NSError *error) {
            if (!error) {
                NSLog(@"Authentication sucessful.");
                completion(nil);
            }
            else{
                NSLog(@"Authentication failed - %@", error.localizedDescription);
                completion(error);
            }
        }];
    }
    
}

/**
 Signs out the current AuthProvider, completely removing all tokens and cookies.
 @param completionHandler The completion handler to be called when sign out has completed.
 error should be non nil if there was no error, and should contain any error(s) that occurred.
 */
-(void) disconnect{
    [self.authProvider logout];
}
@end
