// Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.



#import "NSDate+MSSerialization.h"

#import "MSGraphModels.h"

@interface MSObject()

@property (strong, nonatomic) NSMutableDictionary *dictionary;

@end

@interface MSGraphDeleted()
{
    NSString* _state;
}
@end

@implementation MSGraphDeleted

- (NSString*) state
{
    return self.dictionary[@"state"];
}
- (void) setState: (NSString*) val
{
    self.dictionary[@"state"] = val;
}
@end
