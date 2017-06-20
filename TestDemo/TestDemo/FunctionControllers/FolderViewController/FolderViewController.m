//
//  FolderViewController.m
//  TestDemo
//
//  Created by Allen on 2017/5/22.
//  Copyright © 2017年 AIA. All rights reserved.
//

#import "FolderViewController.h"
#import "FolderView.h"
#import "ReactiveObjC.h"
#import "CALayer+Additions.h"
@interface FolderViewController ()
- (void)createTiles;
- (void)drawLayer:(CALayer *)layer inContext:(CGContextRef)ctx;
- (CALayer *)layerForTouch:(UITouch *)touch;
- (int)frameIndexForTileIndex:(int)tileIndex;
- (int)indexOfClosestFrameToPoint:(CGPoint)point;
- (void)moveHeldTileToPoint:(CGPoint)location;
- (void)moveUnheldTilesAwayFromPoint:(CGPoint)location;
- (void)startTilesWiggling;
- (void)stopTilesWiggling;
@end

@implementation FolderViewController

#define ICONVIEW_WIDTH  57
#define ICONVIEW_HEIGHT 57
#define ICONVIEW_MARGIN 25

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    self.view.backgroundColor = [UIColor whiteColor];
    
    
    [self createTiles];
    
//    for (int i = 0; i<2; i++) {
//        IconView *iconView = [[IconView alloc] init];
//        iconView.backgroundColor = [UIColor blueColor];
//        iconView.frame = CGRectMake(150*i, 150, 100, 100);
//        
//        [[iconView.panRecognizer rac_gestureSignal] subscribeNext:^(__kindof UIGestureRecognizer * _Nullable rec) {
//            CGPoint point = [rec translationInView:self.view];
//            NSLog(@"point = %f,%f",point.x,point.y);
//            NSLog(@"position = %f,%f",rec.view.frame.origin.x,rec.view.frame.origin.y);
//            rec.view.center = CGPointMake(rec.view.center.x + point.x, rec.view.center.y + point.y);
//            [rec setTranslation:CGPointMake(0, 0) inView:self.view];
//        }];
//        
//        [RACObserve(iconView, center) subscribeNext:^(id  _Nullable x) {
//            NSLog(@"x= %@",x);
//        }];
//        [self.view addSubview:iconView];
//    }
}

- (void)createTiles {
    UIColor *tileColors[] = {
        [UIColor blueColor],
        [UIColor brownColor],
        [UIColor grayColor],
        [UIColor greenColor],
        [UIColor orangeColor],
        [UIColor purpleColor],
        [UIColor redColor],
    };
    int tileColorCount = sizeof(tileColors) / sizeof(tileColors[0]);
    
    for (int row = 0; row < ICONVIEW_ROWS; ++row) {
        for (int col = 0; col < ICONVIEW_COLUMNS; ++col) {
            int index = (row * ICONVIEW_COLUMNS) + col;
            
            CGRect frame = CGRectMake(ICONVIEW_MARGIN + col * (ICONVIEW_MARGIN + ICONVIEW_WIDTH),
                                      64 + ICONVIEW_MARGIN + row * (ICONVIEW_MARGIN + ICONVIEW_HEIGHT),
                                      ICONVIEW_WIDTH, ICONVIEW_HEIGHT);
            tileFrame[index] = frame;
            
            IconView *iconView = [[IconView alloc] init];
            iconView.tileIndex = index;
            tileForFrame[index] = iconView;
            iconView.frame = frame;
            iconView.backgroundColor = tileColors[index % tileColorCount].CGColor;
            iconView.cornerRadius = 8;
            iconView.delegate = self;
            [self.view.layer addSublayer:iconView];
            [iconView setNeedsDisplay];
        }
    }
}

- (void)drawLayer:(CALayer *)layer inContext:(CGContextRef)ctx {
    UIGraphicsPushContext(ctx);
    
    IconView *iconView = (IconView *)layer;
    [iconView draw];
    
    UIGraphicsPopContext();
}

// 点击屏幕
- (void)touchesBegan:(NSSet *)touches withEvent:(UIEvent *)event {
    CALayer *hitLayer = [self layerForTouch:[touches anyObject]];
    if ([hitLayer isKindOfClass:[IconView class]]) {
        IconView *iconView = (IconView*)hitLayer;
        heldTile = iconView;
        
        touchStartLocation = [[touches anyObject] locationInView:self.view];
        heldStartPosition = iconView.position;
        heldFrameIndex = [self frameIndexForTileIndex:iconView.tileIndex];
        
        [iconView moveToFront];
        [iconView appearDraggable];
        [self startTilesWiggling];
    }
}

// 手在屏幕上滑动
- (void)touchesMoved:(NSSet *)touches withEvent:(UIEvent *)event {
    if (heldTile) {
        UITouch *touch = [touches anyObject];
        UIView *view = self.view;
        CGPoint location = [touch locationInView:view];
        NSLog(@"touchLocation = x=%.2f,y=%.2f",location.x,location.y);
        [self moveHeldTileToPoint:location];
        NSLog(@"touchIconViewCenter = x=%.2f,y=%.2f",heldTile.position.x,heldTile.position.y);
        [self moveUnheldTilesAwayFromPoint:heldTile.position];
    }
}

// 将选中的iconView挪至手指位置
- (void)moveHeldTileToPoint:(CGPoint)location {
    float dx = location.x - touchStartLocation.x;
    float dy = location.y - touchStartLocation.y;
    CGPoint newPosition = CGPointMake(heldStartPosition.x + dx, heldStartPosition.y + dy);
    
    [CATransaction begin];
    [CATransaction setDisableActions:TRUE];
    heldTile.position = newPosition;
    [CATransaction commit];
}

// 将未选中的iconView平移
- (void)moveUnheldTilesAwayFromPoint:(CGPoint)location {
    int frameIndex = [self indexOfClosestFrameToPoint:location];
    NSLog(@"frameIndex = %d",frameIndex);
    if (frameIndex != heldFrameIndex) {
        [CATransaction begin];
        
        if (frameIndex < heldFrameIndex) {
            for (int i = heldFrameIndex; i > frameIndex; --i) {
                IconView *movingIconView = tileForFrame[i-1];
                movingIconView.frame = tileFrame[i];
                tileForFrame[i] = movingIconView;
            }
        }
        else if (heldFrameIndex < frameIndex) {
            for (int i = heldFrameIndex; i < frameIndex; ++i) {
                IconView *movingIconView = tileForFrame[i+1];
                movingIconView.frame = tileFrame[i];
                tileForFrame[i] = movingIconView;
            }
        }
        heldFrameIndex = frameIndex;
        tileForFrame[heldFrameIndex] = heldTile;
        
        [CATransaction commit];
    }
}

// 手离开屏幕，结束点击
- (void)touchesEnded:(NSSet *)touches withEvent:(UIEvent *)event {
    if (heldTile) {
        [heldTile appearNormal];
        heldTile.frame = tileFrame[heldFrameIndex];
        heldTile = nil;
    }
    [self stopTilesWiggling];
}


- (void)touchesCancelled:(NSSet *)touches withEvent:(UIEvent *)event {
    [self touchesEnded:touches withEvent:event];
}


- (CALayer *)layerForTouch:(UITouch *)touch {
    UIView *view = self.view;
    
    CGPoint location = [touch locationInView:view];
    location = [view convertPoint:location toView:nil];
    
    CALayer *hitPresentationLayer = [view.layer.presentationLayer hitTest:location];
    if (hitPresentationLayer) {
        return hitPresentationLayer.modelLayer;
    }
    
    return nil;
}


- (int)frameIndexForTileIndex:(int)tileIndex {
    for (int i = 0; i < ICONVIEW_COUNT; ++i) {
        if (tileForFrame[i].tileIndex == tileIndex) {
            return i;
        }
    }
    return 0;
}

// 计算当前挪动的iconView所处位置，这里应该做判断，两个iconView重叠时，创建文件夹
- (int)indexOfClosestFrameToPoint:(CGPoint)point {
    int index = heldFrameIndex;
    float minDist = 40;
//    float minDist = 5;
    for (int i = 0; i < ICONVIEW_COUNT; ++i) {
        //titleFrame中保存的是iconView的Position，而不是中心点位置
        CGRect frame = tileFrame[i];
        
        frame = ({
            frame.origin.x += ICONVIEW_WIDTH/2;
            frame.origin.y += ICONVIEW_HEIGHT/2;
            frame;
        });
        
//        NSLog(@"pointX = %f,pointY = %f",frame.origin.x,frame.origin.y);
        float dx = point.x - CGRectGetMidX(frame);
        float dy = point.y - CGRectGetMidY(frame);
        
        float dist = (dx * dx) + (dy * dy);
        float distResult = sqrtf(dist);
//        if (i==7) {
//            NSLog(@"i=%d,pointX=%f,pointY=%f/n  iconViewFrameX=%f,iconViewFrameY=%f\n  distResult=%f",i,point.x,point.y,frame.origin.x,frame.origin.y,distResult);
//
//        }
        NSLog(@"dist = %f,distResult=%f",dist,distResult);
        if (distResult < minDist) {
            index = i;
            minDist = distResult;
        }
    }
    return index;
}


- (void)startTilesWiggling {
    for (int i = 0; i < ICONVIEW_COUNT; ++i) {
        IconView *iconView = tileForFrame[i];
        if (iconView != heldTile) {
            [iconView startWiggling];
        }
    }
}


- (void)stopTilesWiggling {
    for (int i = 0; i < ICONVIEW_COUNT; ++i) {
        IconView *iconView = tileForFrame[i];
        [iconView stopWiggling];
    }
}

@end
