
import { _decorator, Component, sys } from 'cc';
const { ccclass } = _decorator;

/**
 * Predefined variables
 * Name = FirstPage
 * DateTime = Tue Nov 16 2021 15:47:03 GMT+0800 (中國標準時間)
 * Author = XieYe0920
 * FileBasename = FirstPage.ts
 * FileBasenameNoExtension = FirstPage
 * URL = db://assets/scripts/FirstPage.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

let TotalLevel = 100;

@ccclass('FirstPage')
export class FirstPage extends Component {
    onLoad() {
        let str = sys.localStorage.getItem('LevelState');
        if(str == '' || str == null) {
            let LevelState = new Array<boolean>(TotalLevel);
            for(let i=0; i<TotalLevel; i++) {
                LevelState[i] = false;
            }
            sys.localStorage.setItem('LevelState', JSON.stringify(LevelState));
        }
        else{
            let LevelState:boolean[] = JSON.parse(str);
            if(LevelState.length < TotalLevel) {
                let nLevelState = new Array<boolean>(TotalLevel);
                for(let i=0; i<TotalLevel; i++) {
                    if(i < LevelState.length) nLevelState[i] = LevelState[i];
                    else nLevelState[i] = false;
                }
                sys.localStorage.setItem('LevelState', JSON.stringify(nLevelState));
            }
        }
    }

    ClearData() {
        sys.localStorage.removeItem('LevelState');
        let LevelState = new Array<boolean>(TotalLevel);
        for(let i=0; i<TotalLevel; i++) {
            LevelState[i] = false;
            let scene_name = 'Level'+(i + 1);
            sys.localStorage.removeItem(scene_name);
        }
        sys.localStorage.setItem('LevelState', JSON.stringify(LevelState));
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
