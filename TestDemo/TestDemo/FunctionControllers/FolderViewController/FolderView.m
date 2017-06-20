//
//  FolderView.m
//  TestDemo
//
//  Created by Allen on 2017/5/22.
//  Copyright © 2017年 AIA. All rights reserved.
//

#import "FolderView.h"

@implementation FolderView

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

- (NSMutableArray *)iconList {
    if (_iconList) {
        _iconList = [[NSMutableArray alloc] init];
    }
    
    return _iconList;
}

@end
