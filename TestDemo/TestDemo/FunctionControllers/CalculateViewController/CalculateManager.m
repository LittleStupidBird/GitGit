//
//  CalculateManager.m
//  TestDemo
//
//  Created by Allen on 2017/3/3.
//  Copyright © 2017年 AIA. All rights reserved.
//

#import "CalculateManager.h"

@interface CalculateManager ()
@end

@implementation CalculateManager

- (CalculateManager *)add:(int)value {
    _result += value;
    return self; 
}

- (CalculateManager *(^)(int))add {
    return ^(int value) {
        _result += value;
        return self;
    };
}

@end
