//
//  MacroDefinitionViewController.m
//  TestDemo
//
//  Created by Allen on 2017/3/2.
//  Copyright © 2017年 AIA. All rights reserved.
//

#import "MacroDefinitionViewController.h"

#define DEF_VAR(type,name) type type##_##name
DEF_VAR(int,a) = 5;

#define NAME_1 @"Allen"
#define NAME_2 @"Bill"
#define NAME_3 @"Casso"

#define NAME_WITH(i) NAME_##i
//##__VA_ARGS__时，若无参数，会吞前边的','逗号
#define MY_LOG(str,...) NSLog(@"【"__FILE__":%d】"str,__LINE__,##__VA_ARGS__)

#define TRUE_AND_LOG(condition)   \
do {                          \
if(condition) {           \
NSLog(@"Your condition '"#condition"' is true");\
}\
}while(0)

#define TYPE_FLAG_LIST(_)\
_(TYPE_A)\
_(TYPE_B)\
_(TYPE_C)\
_(TYPE_D)

#define ENUM_ELEMENT(FLAG) FLAG,

typedef enum: NSInteger {
    TYPE_FLAG_LIST(ENUM_ELEMENT)
    TYPE_TOTAL
}EnumTypeNum;

#define FLAG_VALUE(FLAG) FLAG##_FLAG

#define ENUM_ELEMENT2(FLAG)   \
FLAG_VALUE(FLAG) = 1 << FLAG,
//TYPE_A_FLAG = 1 << TYPE_A

typedef enum: NSInteger {
    TYPE_FLAG_LIST(ENUM_ELEMENT2)
    TYPE_0_FLAG = 0
}EnumType;

#define CHECK_NUIT(FLAG) \
if(unit_value & FLAG_VALUE(FLAG)) {  \
NSLog(@"unit_value = %lu Has " #FLAG "_FLAG",unit_value);   \
}

void check_unit_value(NSUInteger unit_value) {
    TYPE_FLAG_LIST(CHECK_NUIT)
}

//Mantle三方库使用，JSONKeyPathsByPropertyKey，可以进行提醒
#define KEY_PATH(CLASS,PATH)        \
(((void)(NO && ((void)[CLASS new].PATH,NO)), @# PATH))

//ARG_AT用来从所传数据中选取INDEX位置的值
//例：ARG_AT(1,@"你好",@"哈哈",@"真棒")  -->  @“结果是=哈哈”
#define ARG_AT(INDEX,...) _ARG_AT##INDEX(__VA_ARGS__)
#define _ARG_AT0(_0,...) _0
#define _ARG_AT1(_0,_1,...) _1
#define _ARG_AT2(_0,_1,_2,...) _2
#define _ARG_AT3(_0,_1,_2,_3,...) _3
#define _ARG_AT4(_0,_1,_2,_3,_4,...) _4
#define _ARG_AT5(_0,_1,_2,_3,_4,_5,...) _5

//参数要小于5个，就可以对所传参数数量统计
//例：ARG_COUNT(1,2,3);  -->   @“结果是=3”
#define ARG_COUNT(...)\
ARG_AT(5,##__VA_ARGS__,5,4,3,2,1,0)

//CHECK_NUIT(TYPE_A)
//unit_value & TYPE_A_FLAG

@interface MacroDefinitionViewController ()
@property (nonatomic,strong) NSString *name;
@property (nonatomic,strong) NSBlockOperation *op1;
@property (nonatomic,strong) NSThread *myThread;
@end

@implementation MacroDefinitionViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}

- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event {
    
    //宏定义高级使用
    //    NSLog(@"%d",int_a);
    //
    //    NSLog(@"%@",NAME_WITH(1));
    //
    //    NSLog(@"%s\n%d\n%s\n%s\n%s\n%s\n%s",__FILE__,__LINE__,__DATE__,__TIME__,__TIMESTAMP__,__FUNCTION__,__func__);
    //
    //    MY_LOG(@"%d,%d,%d",1,2,3);
    //    MY_LOG("no parameters");
    //
    //    TRUE_AND_LOG(1+1==2);
    
    for (int i = 0; i < 4; i++) {
        check_unit_value(i);
        
    }
}

- (void)nsoperationQueueTest {
    //使用NSOperationQueue
    /*
     NSOperationQueue *queue = [[NSOperationQueue alloc] init];
     queue.maxConcurrentOperationCount = 1;
     
     _op1 = [NSBlockOperation blockOperationWithBlock:^{
     NSLog(@"touch-----%@",[NSThread currentThread]);
     [self download];
     }];
     
     NSBlockOperation *op2 = [NSBlockOperation blockOperationWithBlock:^{
     NSLog(@"result-----%@",[NSThread currentThread]);
     NSLog(@"结果是:%@",self.name);
     }];
     
     [op2 addDependency:_op1];
     
     [queue addOperation:_op1];
     [queue addOperation:op2];
     
     _op1.completionBlock = ^{
     NSLog(@"下载完成!");
     };
     
     [self download];
     NSLog(@"结果是:%@",self.name);
     
     dispatch_async(dispatch_queue_create("download", DISPATCH_QUEUE_CONCURRENT), ^{
     NSLog(@"touch-----%@",[NSThread currentThread]);
     [self download];
     NSLog(@"结果是:%@",self.name);
     });
     */
}

- (void)runloopTest {
    //线程加RunLoop
    /*
     _myThread = [[NSThread alloc] initWithBlock:^{
     NSLog(@"nihao");
     
     [[NSRunLoop currentRunLoop] addPort:[NSPort port] forMode:NSRunLoopCommonModes];
     [[NSRunLoop currentRunLoop] run];
     }];
     
     [_myThread start];
     */
}

- (void)download {
    
    dispatch_async(dispatch_get_global_queue(0, 0), ^{
        for (int i = 0 ; i<1000; i++) {
            NSLog(@"download---%zd---%@",i,[NSThread currentThread]);
        }
        self.name = @"王晴";
    });
    
    //    NSBlockOperation *op3 = [NSBlockOperation blockOperationWithBlock:^{
    //        for (int i = 0 ; i<1000; i++) {
    //            NSLog(@"download---%zd---%@",i,[NSThread currentThread]);
    //        }
    //        self.name = @"王晴";
    //    }];
    //
    //    [op3 start];
}

- (IBAction)test:(id)sender {
    
    [self performSelector:@selector(test) onThread:_myThread withObject:nil waitUntilDone:YES];
}

- (void)test {
    NSLog(@"test--%@",[NSThread currentThread]);
}

@end
