
import { _decorator, Component, director } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = SceneSwitch
 * DateTime = Sat Oct 30 2021 22:43:01 GMT+0800 (中国标准时间)
 * Author = Moonlord
 * FileBasename = SceneSwitch.ts
 * FileBasenameNoExtension = SceneSwitch
 * URL = db://assets/Scripts/SceneSwitch.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 
@ccclass('SceneSwitch')
export class SceneSwitch extends Component {
    buttoncallback(event:Event, sceneName:string){
        director.loadScene(sceneName);
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/zh/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/zh/scripting/life-cycle-callbacks.html
 */
