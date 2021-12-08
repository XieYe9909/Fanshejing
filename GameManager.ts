
import { _decorator, Component, game, director } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = GameManager
 * DateTime = Fri Oct 29 2021 10:05:56 GMT+0800 (中国标准时间)
 * Author = Moonlord
 * FileBasename = GameManager.ts
 * FileBasenameNoExtension = GameManager
 * URL = db://assets/Scripts/GameManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
enum gameState{MAIN_THEME, LEVEL_SELECT, PLAYING} 

@ccclass('GameManager')
export class GameManager extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    public curLevel:number = 1;
    public state:gameState = gameState.MAIN_THEME;

    start () {
        game.addPersistRootNode(this.node);
        this.node.on('toLevelSelect', this.toLevelSelect, this);
    }
    
    toMainTheme() {
        this.node.off('toMainTheme', this.toMainTheme, this);
        this.node.on('toLevelSelect', this.toLevelSelect, this);
        this.node.off('toPlaying', this.toPlaying, this);
        this.state = gameState.MAIN_THEME;
        director.loadScene("MainTheme");
    }

    toLevelSelect() {
        this.node.on('toMainTheme', this.toMainTheme, this);
        this.node.off('toLevelSelect', this.toLevelSelect, this);
        this.node.on('toPlaying', this.toPlaying, this);
        this.state = gameState.LEVEL_SELECT;
        director.loadScene("LevelSelect");
    }

    toPlaying() {
        this.node.off('toMainTheme', this.toMainTheme, this);
        this.node.on('toLevelSelect', this.toLevelSelect, this);
        this.node.on('toPlaying', this.toPlaying, this);
        this.state = gameState.PLAYING;
        director.loadScene("Playing");
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
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
