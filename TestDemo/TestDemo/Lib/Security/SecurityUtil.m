//
//  SecurityUtil.h
//  Smile
//
//  Created by 蒲晓涛 on 12-11-24.
//  Copyright (c) 2012年 BOX. All rights reserved.
//

// 版权属于原作者
// http://code4app.com (cn) http://code4app.net (en)
// 发布代码于最专业的源码分享网站: Code4App.com

#import "SecurityUtil.h"
#import "GTMBase64.h"
#import "NSData+AES.h"
#import "HashValue.h"

#define FORMAT(format, ...) [NSString stringWithFormat:(format), ##__VA_ARGS__]

@implementation SecurityUtil

#pragma mark - base64
+ (NSString*)encodeBase64String:(NSString * )input { 
    NSData *data = [input dataUsingEncoding:NSUTF8StringEncoding allowLossyConversion:YES]; 
    data = [GTMBase64 encodeData:data]; 
    NSString *base64String = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
	return base64String;
}

+ (NSString*)decodeBase64String:(NSString * )input { 
    NSData *data = [input dataUsingEncoding:NSUTF8StringEncoding allowLossyConversion:YES]; 
    data = [GTMBase64 decodeData:data]; 
    NSString *base64String = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
	return base64String;
} 

+ (NSString*)encodeBase64Data:(NSData *)data {
	data = [GTMBase64 encodeData:data]; 
    NSString *base64String = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
	return base64String;
}

+ (NSString*)decodeBase64Data:(NSData *)data {
	data = [GTMBase64 decodeData:data]; 
    NSString *base64String = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
	return base64String;
}

+ (NSString *)stringToMD5:(NSString *)str {
    //1.首先将字符串转换成UTF-8编码, 因为MD5加密是基于C语言的,所以要先把字符串转化成C语言的字符串
    const char *fooData = [str UTF8String];
    
    //2.然后创建一个字符串数组,接收MD5的值
    unsigned char result[CC_MD5_DIGEST_LENGTH];
    
    //3.计算MD5的值, 这是官方封装好的加密方法:把我们输入的字符串转换成16进制的32位数,然后存储到result中
    CC_MD5(fooData, (CC_LONG)strlen(fooData), result);
    // CC_MD5(fooData, (unsigned int)strlen(fooData), result);
    /**
     第一个参数:要加密的字符串
     第二个参数: 获取要加密字符串的长度
     第三个参数: 接收结果的数组
     */
    
    //4.创建一个字符串保存加密结果
    NSMutableString *saveResult = [NSMutableString string];
    
    //5.从result 数组中获取加密结果并放到 saveResult中
    for (int i = 0; i < CC_MD5_DIGEST_LENGTH; i++) {
        [saveResult appendFormat:@"%02x", result[i]];
    }
    /*
     x表示十六进制，%02X  意思是不足两位将用0补齐，如果多余两位则不影响
     NSLog("%02X", 0x888);  //888
     NSLog("%02X", 0x4); //04
     x大写或小写，输出也会相应转成大写或小写
     */
    return saveResult;
}

#pragma mark - AES加密
//将string转成带密码的data
+(NSString*)encryptAESData:(NSString*)string app_key:(NSString*)key
{
    //将nsstring转化为nsdata
    NSData *data = [string dataUsingEncoding:NSUTF8StringEncoding];
    //使用密码对nsdata进行加密
    NSData *encryptedData = [data AES128EncryptWithKey:key];
    return [encryptedData base64Encoding];
}

#pragma mark - AES解密
//将带密码的data转成string
+(NSString*)decryptAESData:(NSData*)data  app_key:(NSString*)key
{
    //使用密码对data进行解密
    NSData *decryData = [data AES128DecryptWithKey:key];
    //将解了密码的nsdata转化为nsstring
    NSString *str = [[NSString alloc] initWithData:decryData encoding:NSUTF8StringEncoding];
    return str;
}

+ (void)checkSum {
    //    NSString *checkSum = @"bR8djDYi+0tJf5crsDKkn7naxtgyQnsZ0DchO1ihjAo=";//For Prod
    NSString *checkSum = @"/Xz8V60FGYYBVjN/GoZRNoPJXpo0tuXxLkQVfaPuGDU=";//For Training Prod
    
    NSMutableData *mutableData = [NSMutableData data];
    
    [mutableData appendData:[SecurityUtil dataForResourcesOfType:@".css"]];
    [mutableData appendData:[SecurityUtil dataForResourcesOfType:@".map"]];
    [mutableData appendData:[SecurityUtil dataForResourcesOfType:@".js"]];
    [mutableData appendData:[SecurityUtil dataForResourcesOfType:@"html"]];
    
    NSData *data = [HashValue sha256HashWithData:mutableData];
    NSString *hashString = [data base64EncodedStringWithOptions:0];
    NSLog(@"hashString:%@", hashString);
    
    if (checkSum.length == 0 || hashString.length == 0 || ![checkSum isEqualToString:hashString]) {
        @throw [NSException exceptionWithName:@"check MD5 failed" reason:FORMAT(@"hashString:%@", hashString) userInfo:nil];
    }
}

+ (NSMutableData *)dataForResourcesOfType:(NSString *)type {
    NSMutableData *mutableData = [NSMutableData data];
    
    NSArray *pathsArray = [[NSBundle mainBundle] pathsForResourcesOfType:type inDirectory:nil];
    
    [pathsArray enumerateObjectsUsingBlock:^(id obj, NSUInteger idx, BOOL *stop) {
        [mutableData appendData:[NSData dataWithContentsOfFile:obj]];
    }];
    
    return mutableData;
}

@end
