//
//  AnimationViewController.swift
//  LittleBird
//
//  Created by Allen on 2019/3/16.
//  Copyright © 2019 Allen. All rights reserved.
//

import UIKit

class AnimationViewController: UITableViewController {
    var cellModel = [BirdVCModel]()

    override func viewDidLoad() {
        super.viewDidLoad()
        tableView.register(UITableViewCell.self, forCellReuseIdentifier: "AnimationCell")
        tableView.tableFooterView = UIView()
        
        addCellCase()
    }
    
    func addCellCase() {
        let one = BirdVCModel.init(vcName: "粒子效果", vcClassName: "\(BirdEmitterViewController.self)")
        cellModel.append(one)
//        cellModel.append("拖拽效果")
    }
}

extension AnimationViewController {
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "AnimationCell")
        cell?.textLabel?.text = cellModel[indexPath.row].vcName
        cell?.accessoryType = .disclosureIndicator
        return cell!
    }
    
    override func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 40
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return cellModel.count
    }
    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        
        let birdVCName = cellModel[indexPath.row].vcClassName
        guard let nameSpace = Bundle.main.infoDictionary!["CFBundleExecutable"] else {
            BirdLog("命名空间不存在")
            return
        }
        
        let birdVC = NSClassFromString(nameSpace as! String + "." + birdVCName)
        guard let classType = birdVC as? UIViewController.Type else {
            BirdLog("无法转换为UIViewController")
            return
        }
        let childVC = classType.init()
        childVC.navigationItem.title = "设置"
        navigationController?.pushViewController(childVC, animated: true)
    }
}
