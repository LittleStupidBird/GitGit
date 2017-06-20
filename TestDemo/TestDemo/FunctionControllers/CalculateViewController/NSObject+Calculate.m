//
//  NSObject+Calculate.m
//  TestDemo
//
//  Created by Allen on 2017/3/3.
//  Copyright © 2017年 AIA. All rights reserved.
//

#import "NSObject+Calculate.h"

@implementation NSObject (Calculate)

- (int)wq_makeCalculate:(void(^)(CalculateManager *mgr))block {
    CalculateManager *calculateMgr = [[CalculateManager alloc] init];
    block(calculateMgr);
    return calculateMgr.result;
}

@end
