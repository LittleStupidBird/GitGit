// Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.



#import "NSDate+MSSerialization.h"

#import "MSGraphModels.h"

@interface MSObject()

@property (strong, nonatomic) NSMutableDictionary *dictionary;

@end

@interface MSGraphFileAttachment()
{
    NSString* _contentId;
    NSString* _contentLocation;
    NSString* _contentBytes;
}
@end

@implementation MSGraphFileAttachment

- (id) init
{
    if (self = [super init]) {
        self.oDataType = @"#microsoft.graph.fileAttachment";
    }
    return self;
}
- (NSString*) contentId
{
    return self.dictionary[@"contentId"];
}
- (void) setContentId: (NSString*) val
{
    self.dictionary[@"contentId"] = val;
}
- (NSString*) contentLocation
{
    return self.dictionary[@"contentLocation"];
}
- (void) setContentLocation: (NSString*) val
{
    self.dictionary[@"contentLocation"] = val;
}
- (NSString*) contentBytes
{
    return self.dictionary[@"contentBytes"];
}
- (void) setContentBytes: (NSString*) val
{
    self.dictionary[@"contentBytes"] = val;
}

@end
