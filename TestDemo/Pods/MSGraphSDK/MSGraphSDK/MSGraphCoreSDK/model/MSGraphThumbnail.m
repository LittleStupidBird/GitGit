// Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.



#import "NSDate+MSSerialization.h"

#import "MSGraphModels.h"

@interface MSObject()

@property (strong, nonatomic) NSMutableDictionary *dictionary;

@end

@interface MSGraphThumbnail()
{
    int32_t _height;
    NSString* _url;
    int32_t _width;
}
@end

@implementation MSGraphThumbnail

- (int32_t) height
{
    _height = [self.dictionary[@"height"] intValue];
    return _height;
}
- (void) setHeight: (int32_t) val
{
    _height = val;
    self.dictionary[@"height"] = @(val);
}
- (NSString*) url
{
    return self.dictionary[@"url"];
}
- (void) setUrl: (NSString*) val
{
    self.dictionary[@"url"] = val;
}
- (int32_t) width
{
    _width = [self.dictionary[@"width"] intValue];
    return _width;
}
- (void) setWidth: (int32_t) val
{
    _width = val;
    self.dictionary[@"width"] = @(val);
}
@end
