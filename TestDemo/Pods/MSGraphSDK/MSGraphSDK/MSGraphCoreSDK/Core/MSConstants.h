// Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.

#import <Foundation/Foundation.h>

#ifndef MSConstants_h
#define MSConstants_h

typedef NS_ENUM(NSInteger, MSClientErrorCode){
    MSClientErrorCodeBadRequest                  = 400,
    MSClientErrorCodeUnauthorized                = 401,
    MSClientErrorCodeForbidden                   = 403,
    MSClientErrorCodeNotFound                    = 404,
    MSClientErrorCodeMethodNotAllowed            = 405,
    MSClientErrorCodeUNACCEPTABLE                = 406,
    MSClientErrorCodeConflict                    = 409,
    MSClientErrorCodeLengthRequired              = 411,
    MSClientErrorCodePreconditionFailed          = 412,
    MSClientErrorCodeRequestEntityTooLarge       = 413,
    MSClientErrorCodeUnsupportedMediaType        = 415,
    MSClientErrorCodeRequestRangeNotSatisfiable  = 416,
    MSClientErrorCodeUnprocessableEntity         = 422,
    MSClientErrorCodeTooManyRequests             = 429,
    MSClientErrorCodeInternalServerError         = 500,
    MSClientErrorCodeNotImplemented              = 501,
    MSClientErrorCodeServiceUnavailable          = 503,
    MSClientErrorCodeInsufficientStorage         = 507,
    MSClientErrorCodeUnknownError                 = 999,
};

typedef NS_ENUM(NSInteger, MSExpectedResponseCodes){
    MSExpectedResponseCodesOK = 200,
    MSExpectedResponseCodesCreated = 201,
    MSExpectedResponseCodesAccepted = 202,
    MSExpectedResponseCodesNotModified = 304,
};

extern NSString *const MSErrorDomain;
extern NSString *const MSErrorKey;
extern NSString *const MSHttpFailingResponseKey;
extern NSString *const MSODataNextContext;
extern NSString *const MSCollectionValueKey;


extern NSString *const MSHeaderLocation;
extern NSString *const MSHeaderPrefer;
extern NSString *const MSHeaderContentType;
extern NSString *const MSHeaderApplicationJson;
extern NSString *const MSHeaderRespondAsync;
extern NSString *const MSHeaderSdkVersion;

extern NSString *const MSGraphApiEndpoint;
extern NSString *const MSGraphApiVersion;
extern NSString *const MSGraphSdkVersionHeaderPrefix;

#endif
