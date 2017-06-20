//
//  WrapperConnector.h
//  iMO
//
//  Created by Allen Z. on 15-9-10.
//  Copyright (c) 2015年 AIA Information Technology (Beijing) Co. All rights reserved.
//

#import <Foundation/Foundation.h>

typedef NS_ENUM(NSInteger, WrapperSubAppType) {
    WrapperSubAppTypeWrapper,
    WrapperSubAppTypeBP,
    WrapperSubAppTypeRolePlay,
    WrapperSubAppTypeiPoS,
    WrapperSubAppTypeCS,
    WrapperSubAppTypeRC,
    WrapperSubAppTypeICARE,
    WrapperSubAppTypeSALES
};

#define IMO_REGION @"region"
#define IMO_APP_GROUP @"appGroup"
#define IMO_APP_TIMEOUT_SESSION @"appTimeoutSeconds"

@interface WrapperConnector : NSObject

/* Check iMO Wrapper has been installed or not */
+ (BOOL)isWraperExist;

/* Start up iMO Wrapper */
+ (void)startUpWrapper;

/* Initialize iMO Wrapper dynamic framework */
+ (void)initializeLicense:(NSString *)license parameters:(NSDictionary *)parameters;

/* Have user login */
+ (BOOL)haveUserLogin;

/* Have user login with current user id */
+ (BOOL)haveUserLoginWith:(NSString *)userID accessCode:(NSString *)accessCode;

/* Sub app become inactive, call this in applicationWillResignActive */
+ (void)subAppBecomesInactive;

/* Check session timeout, call this in applicationDidBecomeActive */
+ (BOOL)hasAlreadyTimeout;

/* Logout iMO by Sub APP Type */
+ (void)logoutFromSubApp:(WrapperSubAppType)subAppType;

/* Get current language */
+ (NSString *)getCurrentLanguage;

/* Check login mode is online or not */
+ (BOOL)isOnline;

/* Have user actived */
+ (BOOL)haveUserActivated;

/* Have user actived with current user id */
+ (BOOL)haveUserActivatedByUserId:(NSString *)userId;

/* Get Wrapper Information */
+ (NSDictionary *)getCurrentLoginInfo;

/* Retrieve current active agent code */
+ (NSString *)getUserID;

/* Retrieve agent profile information */
+ (NSDictionary *)getUserInformationWithUserID:(NSString *)userID;

+ (NSData *)getHashBundleId;

/* Have user actived with current user id */
+ (NSString *)getAppVersionByAppName:(NSString *)appName;

/* Save sub app version number to sharing DB */
+ (void)saveOrUpdateAppVersion:(WrapperSubAppType)subAppType version:(NSString *)version userID:(NSString *)userID;

/* Save the events comes from sub app */
/* event data structure               */
/* NSString *iPosIdentifier; //iPoS ID
 NSString *dataSource; //iPoS/Local
 NSString *dataStatus; //New/Remove/Normal/Changed
 NSString *contactName;
 NSString *courseName;
 NSString *mobileNumber;
 NSString *trainer;
 NSString *subject;
 NSString *location;
 NSString *activityType;
 NSNumber *allDaySwitch;
 NSNumber *startDate;
 NSNumber *endDate;
 NSString *reminders;
 NSString *note;
 NSString *url;
 NSString *repeate;
 */
+ (void)saveEvents: (NSArray*) events;

+ (NSError *)saveEvent: (NSMutableDictionary*) event;

+ (NSError *)saveContacts:(NSArray *)contacts;

+ (void)checkEventStoreAccessForCalendar;

+ (NSString *)getWrapperDeviceID;

@end
