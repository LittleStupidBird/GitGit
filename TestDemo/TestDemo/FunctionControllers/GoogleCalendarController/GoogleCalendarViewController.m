//
//  GoogleCalendarViewController.m
//  TestDemo
//
//  Created by Allen on 2017/6/13.
//  Copyright © 2017年 AIA. All rights reserved.
//

#import "GoogleCalendarViewController.h"

@interface GoogleCalendarViewController ()
@property (weak, nonatomic) IBOutlet UITextField *cateogryID;

@end

@implementation GoogleCalendarViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    // Initialize the service object.
    self.service = [[GTLRCalendarService alloc] init];
}

// Construct a query and get a list of upcoming events from the user calendar. Display the
// start dates and event summaries in the UITextView.
- (IBAction)fetchEvents:(id)sender {
    //查询primary这个category下的所有event
    NSString *calendarId = @"primary";
    if (self.cateogryID.text.length > 0) {
        calendarId = self.cateogryID.text;
    }
    GTLRCalendarQuery_EventsList *query = [GTLRCalendarQuery_EventsList queryWithCalendarId:calendarId];
    query.maxResults = 10;
    query.timeMin = [GTLRDateTime dateTimeWithDate:[NSDate date]];
    query.singleEvents = YES;
    query.orderBy = kGTLRCalendarOrderByStartTime;
    self.service.authorizer = [GTMAppAuthFetcherAuthorization authorizationFromKeychainForName:@"authorization"];
    
    [self.service executeQuery:query
                      delegate:self
             didFinishSelector:@selector(displayResultWithTicket:finishedWithObject:error:)];
}
//查询账户下所有的category
- (IBAction)fetchCategories:(id)sender {
    GTLRCalendarQuery_CalendarListList *query = [GTLRCalendarQuery_CalendarListList query];
    self.service.authorizer = [GTMAppAuthFetcherAuthorization authorizationFromKeychainForName:@"authorization"];
    
    [self.service executeQuery:query
                      delegate:self
             didFinishSelector:@selector(displayResultWithTicket:finishedWithCalendar:error:)];
}

//解析Category
- (void)displayResultWithTicket:(GTLRServiceTicket *)ticket
             finishedWithCalendar:(GTLRCalendar_Events *)categorise
                          error:(NSError *)error {
    if (error == nil) {
        NSMutableString *output = [[NSMutableString alloc] init];
        if (categorise.items.count > 0) {
            [output appendString:@"Upcoming categorise:\n"];
            for (GTLRCalendar_Event *category in categorise) {
                
                [output appendFormat:@"%@ - %@\n\n", category.summary, category.identifier];
            }
        } else {
            [output appendString:@"No upcoming cagetory found."];
        }
        self.output.text = output;
    } else {
        [self showAlert:@"Error" message:error.localizedDescription];
    }
}
//解析Event
- (void)displayResultWithTicket:(GTLRServiceTicket *)ticket
             finishedWithObject:(GTLRCalendar_Events *)events
                          error:(NSError *)error {
    if (error == nil) {
        NSMutableString *output = [[NSMutableString alloc] init];
        if (events.items.count > 0) {
            [output appendString:@"Upcoming events:\n"];
            for (GTLRCalendar_Event *event in events) {
                GTLRDateTime *start = event.start.dateTime ?: event.start.date;
                NSString *startString =
                [NSDateFormatter localizedStringFromDate:[start date]
                                               dateStyle:NSDateFormatterShortStyle
                                               timeStyle:NSDateFormatterShortStyle];
                [output appendFormat:@"%@ - %@\n", startString, event.summary];
            }
        } else {
            [output appendString:@"No upcoming events found."];
        }
        self.output.text = output;
    } else {
        [self showAlert:@"Error" message:error.localizedDescription];
    }
}


// Helper for showing an alert
- (void)showAlert:(NSString *)title message:(NSString *)message {
    UIAlertController *alert =
    [UIAlertController alertControllerWithTitle:title
                                        message:message
                                 preferredStyle:UIAlertControllerStyleAlert];
    UIAlertAction *ok =
    [UIAlertAction actionWithTitle:@"OK"
                             style:UIAlertActionStyleDefault
                           handler:^(UIAlertAction * action)
     {
         [alert dismissViewControllerAnimated:YES completion:nil];
     }];
    [alert addAction:ok];
    [self presentViewController:alert animated:YES completion:nil];
}

@end
