// Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.



#import "NSDate+MSSerialization.h"

#import "MSGraphModels.h"

@interface MSObject()

@property (strong, nonatomic) NSMutableDictionary *dictionary;

@end

@interface MSGraphSearchResult()
{
    NSString* _onClickTelemetryUrl;
}
@end

@implementation MSGraphSearchResult

- (NSString*) onClickTelemetryUrl
{
    return self.dictionary[@"onClickTelemetryUrl"];
}
- (void) setOnClickTelemetryUrl: (NSString*) val
{
    self.dictionary[@"onClickTelemetryUrl"] = val;
}
@end
