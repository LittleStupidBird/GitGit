//
//  NSObject+Calculate.h
//  TestDemo
//
//  Created by Allen on 2017/3/3.
//  Copyright © 2017年 AIA. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "CalculateManager.h"

@interface NSObject (Calculate)
- (int)wq_makeCalculate:(void(^)(CalculateManager *mgr))block;
@end
