
import { _decorator, Component } from 'cc';
import { MapInfo } from './MapInfo';
import { matrix1 } from './Square';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Obstacle
 * DateTime = Tue Nov 09 2021 21:56:38 GMT+0800 (中國標準時間)
 * Author = XieYe0920
 * FileBasename = Obstacle.ts
 * FileBasenameNoExtension = Obstacle
 * URL = db://assets/scripts/Obstacle.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 
@ccclass('Obstacle')
export class Obstacle extends Component {
    public id:number = 102;
    public squarex:number;
    public squarey:number;

    onLoad() {
        let x:number = this.node.getPosition().x;
        let y:number = this.node.getPosition().y;
        if(x>=MapInfo.xstart1() && x<=MapInfo.xend1() && y>=MapInfo.ystart1() && y<=MapInfo.yend1()){
            this.squarex = Math.floor((x - MapInfo.xstart1())/MapInfo.totalsize());
            this.squarey = Math.floor((y - MapInfo.ystart1())/MapInfo.totalsize());
        }
        
        this.node.setPosition(this.squarex*MapInfo.totalsize() + MapInfo.xshift1(), this.squarey*MapInfo.totalsize() + MapInfo.yshift1(), 0);
        matrix1[this.squarex*15 + this.squarey].id = this.id;
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
