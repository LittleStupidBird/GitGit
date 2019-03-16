//
//  BirdTabBarController.swift
//  LittleBird
//
//  Created by Allen on 2019/3/16.
//  Copyright © 2019 Allen. All rights reserved.
//

import UIKit

class BirdTabBarController: UITabBarController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        tabBar.tintColor = UIColor(red: 245/255.0, green: 90/255.0, blue: 93/255.0, alpha: 1.0)
        addChildViewControllers()
    }
    
    /// 添加子控制器
    private func addChildViewControllers() {
        setChildViewController(AnimationViewController(), title: "动画", imageName: "home")
//        setChildViewController(VideoViewController(), title: "视频", imageName: "video")
//        setChildViewController(HuoShanViewController(), title: "小视频", imageName: "huoshan")
//        setChildViewController(MineViewController(), title: "未登录", imageName: "no_login")
        
        // tabBar 是 readonly 属性，不能直接修改，利用 KVC 把 readonly 属性的权限改过来
//        setValue(MyTabBar(), forKey: "tabBar")
    }
    
    /// 初始化子控制器
    private func setChildViewController(_ childController: UIViewController, title: String, imageName: String) {
        
        // 设置文字和图片
        childController.title = title
        // 添加导航控制器为 TabBarController 的子控制器
        let navVc = BirdNavigationController(rootViewController: childController)
        addChild(navVc)
    }

}
