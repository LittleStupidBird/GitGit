//
//  CalculateManager.h
//  TestDemo
//
//  Created by Allen on 2017/3/3.
//  Copyright © 2017年 AIA. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface CalculateManager : NSObject
@property (nonatomic,assign) int result;

- (CalculateManager *)add:(int)value;

- (CalculateManager *(^)(int))add;
@end
