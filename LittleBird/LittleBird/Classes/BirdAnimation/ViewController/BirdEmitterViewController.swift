//
//  BirdEmitterViewController.swift
//  LittleBird
//
//  Created by Allen on 2019/3/16.
//  Copyright © 2019 Allen. All rights reserved.
//

import UIKit

class BirdEmitterViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        configUI()
    }
    
    func configUI() {
        self.view.backgroundColor = UIColor.white
        
        let emitterButton = UIButton.init(type: .system)
        emitterButton.frame = CGRect.init(x: screenWidth/2-50, y: 100, width: 100, height: 40)
        emitterButton.setTitle("粒子效果", for: .normal)
        emitterButton.setTitleColor(UIColor.black, for: .normal)
        emitterButton.addTarget(self, action: #selector(beginEmitter), for: .touchUpInside)
        self.view.addSubview(emitterButton)
    }
    
    @objc func beginEmitter() {
        BirdLog("开始粒子效果演示")
        
    }
}
