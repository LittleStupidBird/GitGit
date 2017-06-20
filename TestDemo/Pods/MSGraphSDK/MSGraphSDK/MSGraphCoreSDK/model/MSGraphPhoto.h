// Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.



#import <UIKit/UiKit.h>


#import "MSObject.h"

@interface MSGraphPhoto : MSObject

	@property (nonatomic, setter=setCameraMake:, getter=cameraMake) NSString* cameraMake;
		@property (nonatomic, setter=setCameraModel:, getter=cameraModel) NSString* cameraModel;
		@property (nonatomic, setter=setExposureDenominator:, getter=exposureDenominator) CGFloat exposureDenominator;
		@property (nonatomic, setter=setExposureNumerator:, getter=exposureNumerator) CGFloat exposureNumerator;
		@property (nonatomic, setter=setFocalLength:, getter=focalLength) CGFloat focalLength;
		@property (nonatomic, setter=setFNumber:, getter=fNumber) CGFloat fNumber;
		@property (nonatomic, setter=setTakenDateTime:, getter=takenDateTime) NSDate* takenDateTime;
		@property (nonatomic, setter=setIso:, getter=iso) int32_t iso;
	
@end
