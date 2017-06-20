// Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.



#import "NSDate+MSSerialization.h"

#import "MSGraphModels.h"

@interface MSObject()

@property (strong, nonatomic) NSMutableDictionary *dictionary;

@end

@interface MSGraphAlternativeSecurityId()
{
    int32_t _type;
    NSString* _identityProvider;
    NSString* _key;
}
@end

@implementation MSGraphAlternativeSecurityId

- (int32_t) type
{
    _type = [self.dictionary[@"type"] intValue];
    return _type;
}
- (void) setType: (int32_t) val
{
    _type = val;
    self.dictionary[@"type"] = @(val);
}
- (NSString*) identityProvider
{
    return self.dictionary[@"identityProvider"];
}
- (void) setIdentityProvider: (NSString*) val
{
    self.dictionary[@"identityProvider"] = val;
}
- (NSString*) key
{
    return self.dictionary[@"key"];
}
- (void) setKey: (NSString*) val
{
    self.dictionary[@"key"] = val;
}
@end
