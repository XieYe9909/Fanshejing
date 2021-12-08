
import { _decorator, Component, sys, Sprite, Color } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = LevelSelect
 * DateTime = Tue Nov 16 2021 16:19:38 GMT+0800 (中國標準時間)
 * Author = XieYe0920
 * FileBasename = LevelSelect.ts
 * FileBasenameNoExtension = LevelSelect
 * URL = db://assets/scripts/LevelSelect.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 
@ccclass('LevelSelect')
export class LevelSelect extends Component {
    onLoad() {
        let LevelState = JSON.parse(sys.localStorage.getItem("LevelState"));
        let index = this.GetLevelIndex();
        let sprite = this.node.getComponent(Sprite);

        if(LevelState[index]) {
            sprite.color = new Color(100, 200, 0, 255);
        }
        else {
            sprite.color = new Color(255, 255, 255, 255);
        }
    }

    GetLevelIndex(): number {
        let name = this.node.name;
        let level_index = name.slice(5, name.length);
        let index = Number(level_index);
        return(index - 1);
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
