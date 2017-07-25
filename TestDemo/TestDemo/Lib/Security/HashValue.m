//
//  HashValue.m
//  Hashing
//
//  Created by Matt Gallagher on 2009/07/06.
//  Copyright 2009 Matt Gallagher. All rights reserved.
//
//  Permission is given to use this source code file, free of charge, in any
//  project, commercial or otherwise, entirely at your risk, with the condition
//  that any redistribution (in part or whole) of source code must retain
//  this copyright and permission notice. Attribution in compiled projects is
//  appreciated but not required.
//

#import "HashValue.h"

@implementation HashValue

- (id)initWithBuffer:(const void *)buffer hashValueType:(HashValueType)aType
{
	self = [super init];
	if (self != nil)
	{
		if (aType == HASH_VALUE_MD5_TYPE)
		{
			memcpy(value, buffer, sizeof(HashValueMD5Hash));
		}
		else if (aType == HASH_VALUE_SHA_TYPE)
		{
			memcpy(value, buffer, sizeof(HashValueShaHash));
		}
		type = aType;
	}
	return self;
}

//AZ - 7/30/14 - Penetration test recommends to remove MD5 APIs
//- (id)initHashValueMD5HashWithBytes:(const void *)bytes length:(NSUInteger)length
//{
//	self = [super init];
//	if (self != nil)
//	{
//		CC_MD5(bytes, length, value);
//		type = HASH_VALUE_MD5_TYPE;
//	}
//	return self;
//}

//AZ - 7/30/14 - Penetration test recommends to remove MD5 APIs
//+ (NSData *)md5HashWithData:(NSData *)data
//{
//	HashValue *hashvalue = [[[HashValue alloc]
//		initHashValueMD5HashWithBytes:[data bytes]
//		length:[data length]]
//	autorelease];
//	
//	return [NSData dataWithBytes:hashvalue.value length:CC_MD5_DIGEST_LENGTH];
//}

- (id)initSha256HashWithBytes:(const void *)bytes length:(NSUInteger)length
{
	self = [super init];
	if (self != nil)
	{
		CC_SHA256(bytes, length, value);
		type = HASH_VALUE_SHA_TYPE;
	}
	return self;
}

+ (NSData *)sha256HashWithData:(NSData *)data
{
	HashValue *hashvalue = [[[HashValue alloc]
		initSha256HashWithBytes:[data bytes]
		length:[data length]]
	autorelease];
	
	return [NSData dataWithBytes:hashvalue.value length:CC_SHA256_DIGEST_LENGTH];
}

//AZ - 7/30/14 - Penetration test recommends to remove MD5 APIs
//+ (NSData *)md5HashWithString:(NSString *)data
//{
//	NSData *d = [data dataUsingEncoding:NSUTF8StringEncoding];
//	HashValue *hashvalue = [[[HashValue alloc]
//							 initHashValueMD5HashWithBytes:[d bytes]
//							 length:[d length]]
//							autorelease];
//	
//	return [NSData dataWithBytes:hashvalue.value length:CC_MD5_DIGEST_LENGTH];
//}

+ (NSData *)sha256HashWithString:(NSString *)data
{
	NSData *d = [data dataUsingEncoding:NSUTF8StringEncoding];
	HashValue *hashvalue = [[[HashValue alloc]
							 initSha256HashWithBytes:[d bytes]
							 length:[d length]]
							autorelease];
	
	return [NSData dataWithBytes:hashvalue.value length:CC_SHA256_DIGEST_LENGTH];
}

- (NSString *)description
{
	NSInteger byteLength=0;
	if (type == HASH_VALUE_MD5_TYPE)
	{
		byteLength = sizeof(HashValueMD5Hash);
	}
	else if (type == HASH_VALUE_SHA_TYPE)
	{
		byteLength = sizeof(HashValueShaHash);
	}

	NSMutableString *stringValue =
		[NSMutableString stringWithCapacity:byteLength * 2];
	NSInteger i;
	for (i = 0; i < byteLength; i++)
	{
		[stringValue appendFormat:@"%02x", value[i]];
	}
	
	return stringValue;
}

- (NSUInteger)hash
{
	return *((NSUInteger *)value);
}

- (const void *)value
{
	return value;
}

- (HashValueType)type
{
	return type;
}

- (BOOL)isEqual:(id)other
{
	if ([other isKindOfClass:[HashValue class]] &&
		((HashValue *)other)->type == type &&
		memcmp(((HashValue *)other)->value, value, HASH_VALUE_STORAGE_SIZE) == 0)
	{
		return YES;
	}
	
	return NO;
}

- (id)copyWithZone:(NSZone *)zone
{
	return [[[self class] allocWithZone:zone] initWithBuffer:value hashValueType:type];
}

- (id)initWithCoder:(NSCoder *)aCoder
{
	self = [super init];
	if (self != nil)
	{
		NSData *valueData = [aCoder decodeObjectForKey:@"value"];
		memcpy(value, [valueData bytes], [valueData length]);
		[valueData self];
		
		type = [aCoder decodeIntForKey:@"type"];
	}
	return self;
}

- (void)encodeWithCoder:(NSCoder *)encoder
{
	[encoder
		encodeObject:[NSData dataWithBytes:value length:HASH_VALUE_STORAGE_SIZE]
		forKey:@"value"];
	[encoder encodeInt:type forKey:@"type"];
}

@end
