//
//  FolderViewController.h
//  TestDemo
//
//  Created by Allen on 2017/5/22.
//  Copyright © 2017年 AIA. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "IconView.h"
#define ICONVIEW_ROWS    6
#define ICONVIEW_COLUMNS 4
#define ICONVIEW_COUNT   (ICONVIEW_ROWS * ICONVIEW_COLUMNS)

@interface FolderViewController : UIViewController {
@private
    CGRect   tileFrame[ICONVIEW_COUNT];
    IconView *tileForFrame[ICONVIEW_COUNT];
    
    IconView *heldTile;
    int      heldFrameIndex;
    CGPoint  heldStartPosition;
    CGPoint  touchStartLocation;
}

@end
