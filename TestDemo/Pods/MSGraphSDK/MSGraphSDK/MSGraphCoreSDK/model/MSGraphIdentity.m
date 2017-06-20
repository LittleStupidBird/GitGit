// Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.



#import "NSDate+MSSerialization.h"

#import "MSGraphModels.h"

@interface MSObject()

@property (strong, nonatomic) NSMutableDictionary *dictionary;

@end

@interface MSGraphIdentity()
{
    NSString* _displayName;
    NSString* _identityId;
}
@end

@implementation MSGraphIdentity

- (NSString*) displayName
{
    return self.dictionary[@"displayName"];
}
- (void) setDisplayName: (NSString*) val
{
    self.dictionary[@"displayName"] = val;
}
- (NSString*) identityId
{
    return self.dictionary[@"id"];
}
- (void) setIdentityId: (NSString*) val
{
    self.dictionary[@"id"] = val;
}
@end
