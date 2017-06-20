//
//  ReactiveCocoaViewController.m
//  TestDemo
//
//  Created by Allen on 2017/3/6.
//  Copyright © 2017年 AIA. All rights reserved.
//

#import "ReactiveCocoaViewController.h"
#import "ReactiveObjC.h"

@interface ReactiveCocoaViewController ()
//订阅者
@property (weak, nonatomic) IBOutlet UITextField *textField;
@property (nonnull,strong) id<RACSubscriber> subscriber;
@property (nonatomic,strong) RACSignal *signal;
@end

@implementation ReactiveCocoaViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.
    [self racMicro];
}

-(void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event {
//    [self racLiftSelector];
    [self demo6];
}

#pragma -mark RAC的宏定义
- (void)racMicro {
    RAC(self,title) = _textField.rac_textSignal;
    
    // weakify()和strongify()配对使用，解决循环引用问题
    @weakify(self);
    
    [RACObserve(self, title) subscribeNext:^(id  _Nullable x) {
        
        @strongify(self);
        
        NSLog(@"title改为了%@",x);
        NSLog(@"强引用%@",self);
    }];
    
    // 抓取长度的方法
    // 方法一：监听长度
    [RACObserve(self, title.length) subscribeNext:^(id  _Nullable x) {
        
        NSLog(@"Observe长度改为了%@",x);
    }];
    
    // 方法二：用信号映射出长度
    [[_textField.rac_textSignal map:^id _Nullable(NSString * _Nullable value) {
        return @(value.length);
    }] subscribeNext:^(id  _Nullable x) {
        NSLog(@"Map长度改为了:%@",x);
    }];
    
    // 元组宏
    RACTuple *tuple = RACTuplePack(@1,@2);
    NSLog(@"tuple = %@",tuple[0]);
}

#pragma -mark RACLift使用，这个可以在某些任务都执行完成之后，再调用某方法
- (void)racLiftSelector {
    // 当数组中的信号都发送了数据，才会调用方法
    RACSignal *firstSignal = [RACSignal createSignal:^RACDisposable * _Nullable(id<RACSubscriber>  _Nonnull subscriber) {
        
        dispatch_async(dispatch_get_global_queue(0, 0), ^{
            for (int i = 0; i<100; i++) {
                NSLog(@"请求第一个信号数据1%%%d",i);
            }
            [subscriber sendNext:@"我是第一个数据1"];
            
            for (int i = 0; i<100; i++) {
                NSLog(@"请求第一个信号数据2%%%d",i);
            }
            [subscriber sendNext:@"我是第一个数据2"];
        });
        
        return nil;
    }];
    
    RACSignal *secondSignal = [RACSignal createSignal:^RACDisposable * _Nullable(id<RACSubscriber>  _Nonnull subscriber) {
        
        dispatch_async(dispatch_get_global_queue(0, 0), ^{
            for (int i = 0; i<100; i++) {
                NSLog(@"请求第二个信号数据%%%d",i);
            }
            [subscriber sendNext:@"我是第二个数据"];
        });
        
        return nil;
    }];
    
    [self rac_liftSelector:@selector(tapWithFirst:andSecond:) withSignalsFromArray:@[firstSignal,secondSignal]];
}

#pragma -mark 用来监听某个方法是否被调用
- (void)signalForSelector {
    //把控制器的某个方法转换为信号，从而监听某个方法有没有被调用
    [[self rac_signalForSelector:@selector(tap)] subscribeNext:^(id  _Nullable x) {
        NSLog(@"调用了tap方法");
    }];
    
    [self tap];
}
- (void)tap {
    NSLog(@"taptap");
}

- (void)tapWithFirst:(NSString *)firstData andSecond:(NSString *)secondData {
    NSLog(@"taptap==%@\n%@",firstData,secondData);
}

#pragma -mark RAC的集合，元组
- (void)racSequence {
    //字典
    NSDictionary *dataDict = [NSDictionary dictionaryWithObjectsAndKeys:@123,@"k1",@"nihao",@"k2", nil];
    //RAC集合
    RACSequence *sequence = dataDict.rac_sequence;
    
    //高级用法——映射
    NSArray *dataDD = [[sequence map:^id _Nullable(id  _Nullable value) {
        //value 集合中元素
        return value;//这里的返回值可以写成自己的类，这样dataDD中的元素就是自己的类型了
    }] array];
    
    NSLog(@"%@",dataDD);
}

- (void)racSequenctDict {
    //字典
    NSDictionary *dataDict = [NSDictionary dictionaryWithObjectsAndKeys:@123,@"k1",@"nihao",@"k2", nil];
    //RAC集合
    RACSequence *sequence = dataDict.rac_sequence;
    //把集合转换成信号
    RACSignal *signal = sequence.signal;
    //订阅集合信号，内部会自动遍历所有的元素发出信号
    [signal subscribeNext:^(RACTuple *_Nullable x) {
        //RACTupleUnpack用来解析元组
        RACTupleUnpack(NSString *a,NSString *b) = x;
        NSLog(@"%@--%@",a,b);
    }];
    
//    [dataDict.rac_sequence.signal subscribeNext:^(id  _Nullable x) {
//        NSLog(@"%@",x);
//    }];
}

- (void)racSequenctArray {
    //数组
    NSArray *dataArray = @[@"123",@555,@"456"];
    //RAC集合
    RACSequence *sequence = dataArray.rac_sequence;
    //把集合转换成信号
    RACSignal *signal = sequence.signal;
    //订阅集合信号，内部会自动遍历所有的元素发出信号
    [signal subscribeNext:^(id  _Nullable x) {
        NSLog(@"%@",x);
    }];
    
    //    [dataArray.rac_sequence.signal subscribeNext:^(id  _Nullable x) {
    //        NSLog(@"%@",x);
    //    }];
}

- (void)racTuple {
    //元组
    RACTuple *tuple = [RACTuple tupleWithObjects:@"123",@"456",@555, nil];
    NSLog(@"%@",tuple[0]);
}

#pragma -mark 创建RAC信号的几种方式
// 注意：使用RACSignal发送数据有个问题，就是每次添加订阅者都会去执行Block中的代码，而不仅仅是获取执行完毕的数据

- (void)demo1 {
    //1.创建信号(冷信号)
    self.signal = [RACSignal createSignal:^RACDisposable * _Nullable(id<RACSubscriber>  _Nonnull subscriber) {
        _subscriber = subscriber;
        //3.发送信号
        [subscriber sendNext:@"1"];
        [subscriber sendNext:@"2"];
        
//        [subscriber sendCompleted];
        return [RACDisposable disposableWithBlock:^{
            //只要信号取消订阅，就会来到这个Block
            //默认一个信号发送完毕，就会主动取消订阅,只要订阅者在，就不会自动取消
            NSLog(@"信号被取消了");
        }];
    }];
    
    //2.订阅信号(热信号)
    RACDisposable *disposable = [self.signal subscribeNext:^(id  _Nullable x) {
        // x:信号发送的内容
        NSLog(@"我发送的是%@",x);
    }];
    
    //取消订阅
    [disposable dispose];
}

- (void)demo2 {
    //1.创建信号(冷信号)
    RACSubject *subject = [RACSubject subject];
    
    //2.订阅信号(热信号)——保存订阅者
    [subject subscribeNext:^(id  _Nullable x) {
        NSLog(@"我发送的是%@",x);
    }];
    
    //3.发送信号——遍历底层保存的所有订阅者
    [subject sendNext:@1];
    
    //取消订阅
}

- (void)demo3 {
    //1.创建信号(冷信号)——可以先发送数据，再订阅信号
    RACReplaySubject *subject = [RACReplaySubject subject];
    
    //3.发送信号——保存值
    [subject sendNext:@1];
    [subject sendNext:@2];
    
    //2.订阅信号(热信号)——保存订阅者
    //遍历所有的值，遍历所有订阅者去发送数据
    [subject subscribeNext:^(id  _Nullable x) {
        NSLog(@"我发送的是%@",x);
    }];
    
    //3.发送信号
    //[subject sendNext:@1];
    //RACReplaySubject发送数据：——保存数据——>遍历所有订阅者发送数据
    
    //取消订阅
}

// 注意：使用RACMulticastConnection发送数据，添加订阅者的时候就只会执行一次Block中的代码，之后就是直接返回结果
- (void)demo4 {
    RACSignal *signal = [RACSignal createSignal:^RACDisposable * _Nullable(id<RACSubscriber>  _Nonnull subscriber) {
        NSLog(@"我在请求数据");
        
        [subscriber sendNext:@"Hello"];
        
        return nil;
    }];
    
    // 方式1：
//    RACMulticastConnection *multicaseConnection = [signal publish];
    
    // 方式2：
    RACMulticastConnection *multicaseConnection = [signal multicast:[RACReplaySubject subject]];
    [multicaseConnection connect];

    [multicaseConnection.signal subscribeNext:^(id  _Nullable x) {
        NSLog(@"请求到的数据是1%@",x);
    }];

    [multicaseConnection.signal subscribeNext:^(id  _Nullable x) {
        NSLog(@"请求到的数据是2%@",x);
    }];

}

- (void)demo5 {
    // RACCommand处理事件
    // 不能反返回空的信号
    // 1.创建命令
    RACCommand *command = [[RACCommand alloc] initWithSignalBlock:^RACSignal * _Nonnull(id  _Nullable input) {
        // input 执行命令传入的参数
        NSLog(@"command = %@",input);
        
        RACSignal *signal = [RACSignal createSignal:^RACDisposable * _Nullable(id<RACSubscriber>  _Nonnull subscriber) {
            
            [subscriber sendNext:input];
            return nil;
        }];
        
        return signal;
    }];
    
    // 2.执行命令
    RACSignal *signal = [command execute:@"command"];
    // 3.订阅信号
    [signal subscribeNext:^(id  _Nullable x) {
        NSLog(@"ss = %@",x);
    }];
}

- (void)demo6 {
    // RACCommand处理事件
    // 不能反返回空的信号
    // 1.创建命令
    RACCommand *command = [[RACCommand alloc] initWithSignalBlock:^RACSignal * _Nonnull(id  _Nullable input) {
        // input 执行命令传入的参数
        NSLog(@"command = %@",input);
        
        RACSignal *signal = [RACSignal createSignal:^RACDisposable * _Nullable(id<RACSubscriber>  _Nonnull subscriber) {
            
            [subscriber sendNext:input];
            // 主动调用发送完成(这个很重要，可以结合下边的状态判断，来控制某按钮多次点击只触发一次响应操作)
            [subscriber sendCompleted];
            return nil;
        }];
        
        return signal;
    }];
    
    // 2.订阅信号（需要先订阅，后执行命令）
    // executionSignals信号源，信号中的信号
    // 方式1
//    [command.executionSignals subscribeNext:^(id  _Nullable x) {
//        NSLog(@"%@",x);
//        
//        [x subscribeNext:^(id  _Nullable x) {
//            NSLog(@"ss = %@",x);
//        }];
//    }];
    
    // 方式2
    // switchToLatest 获取最新发出的信号 signalOfSiganls
    [command.executionSignals.switchToLatest subscribeNext:^(id  _Nullable x) {
        NSLog(@"ss = %@",x);
    }];
    
    [command.executing subscribeNext:^(NSNumber * _Nullable x) {
        if ([x boolValue] == YES) { // 表示当前正在执行
            NSLog(@"正在执行");
        } else {
            // 表示没有执行/执行完成
            NSLog(@"表示没有执行/执行完成");
        }
    }];
    
    // 3.执行命令
    [command execute:@"command"];
}

@end
