//
//  IconView.h
//  TestDemo
//
//  Created by Allen on 2017/5/22.
//  Copyright © 2017年 AIA. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface IconView : CAGradientLayer {
    int tileIndex;
}
@property (nonatomic,strong) UIPanGestureRecognizer *panRecognizer;
@property (nonatomic) int tileIndex;

- (void)draw;

- (void)appearDraggable;

- (void)appearNormal;

- (void)startWiggling;

- (void)stopWiggling;

@end
