
import { _decorator, Component } from 'cc';
import { MapInfo } from './MapInfo';
import { matrix1 } from './Square';
import { LightSource } from './LightSource';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = LightSource
 * DateTime = Sun Oct 31 2021 15:32:37 GMT+0800 (中国标准时间)
 * Author = Moonlord
 * FileBasename = LightSource.ts
 * FileBasenameNoExtension = LightSource
 * URL = db://assets/Scripts/LightSource.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

export let LS_array:LightSource[] = new Array<LightSource>();
 
@ccclass('Light')
export class Light extends Component {
    id:number = 101;
    @property
    dir:number = 0;
    public squarex:number = 0;
    public squarey:number = 0;
    @property
    red:boolean = true;
    @property
    green:boolean = false;
    @property
    blue:boolean = false;

    onLoad() {
        let x:number = this.node.getPosition().x;
        let y:number = this.node.getPosition().y;
        if(x>=MapInfo.xstart1() && x<=MapInfo.xend1() && y>=MapInfo.ystart1() && y<=MapInfo.yend1()){
            this.squarex = Math.floor((x - MapInfo.xstart1())/MapInfo.totalsize());
            this.squarey = Math.floor((y - MapInfo.ystart1())/MapInfo.totalsize());
        }
        
        this.node.setRotationFromEuler(0, 0, this.dir * 45);
        this.node.setPosition(this.squarex*MapInfo.totalsize() + MapInfo.xshift1(), this.squarey*MapInfo.totalsize() + MapInfo.yshift1(), 0);
        matrix1[this.squarex*15 + this.squarey].id = this.id;
        let LS = new LightSource([this.squarex, this.squarey], this.dir, [this.red, this.green, this.blue]);
        LS_array.push(LS);
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
