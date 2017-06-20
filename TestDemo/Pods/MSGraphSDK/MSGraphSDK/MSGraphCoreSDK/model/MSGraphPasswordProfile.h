// Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.





#import "MSObject.h"

@interface MSGraphPasswordProfile : MSObject

	@property (nonatomic, setter=setPassword:, getter=password) NSString* password;
		@property (nonatomic, setter=setForceChangePasswordNextSignIn:, getter=forceChangePasswordNextSignIn) BOOL forceChangePasswordNextSignIn;
	
@end
