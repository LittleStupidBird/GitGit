// Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.



#import "NSDate+MSSerialization.h"

#import "MSGraphModels.h"

@interface MSObject()

@property (strong, nonatomic) NSMutableDictionary *dictionary;

@end

@interface MSGraphPackage()
{
    NSString* _type;
}
@end

@implementation MSGraphPackage

- (NSString*) type
{
    return self.dictionary[@"type"];
}
- (void) setType: (NSString*) val
{
    self.dictionary[@"type"] = val;
}
@end
