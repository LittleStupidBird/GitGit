// Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.



#import "NSDate+MSSerialization.h"

#import "MSGraphModels.h"

@interface MSObject()

@property (strong, nonatomic) NSMutableDictionary *dictionary;

@end

@interface MSGraphEntity()
{
    NSString* _entityId;
}
@end

@implementation MSGraphEntity

- (NSString*) oDataType
{
    return self.dictionary[@"@odata.type"];
}
- (void) setODataType: (NSString*) val
{
    self.dictionary[@"@odata.type"] = val;
}
- (NSString*) entityId
{
    return self.dictionary[@"id"];
}
- (void) setEntityId: (NSString*) val
{
    self.dictionary[@"id"] = val;
}

@end
