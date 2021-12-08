
import { _decorator, Component } from 'cc';
import { MapInfo } from './MapInfo';
import { matrix1 } from './Square';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = StableMirror
 * DateTime = Tue Nov 16 2021 17:41:11 GMT+0800 (中國標準時間)
 * Author = XieYe0920
 * FileBasename = StableMirror.ts
 * FileBasenameNoExtension = StableMirror
 * URL = db://assets/scripts/StableMirror.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 
@ccclass('StableMirror')
export class StableMirror extends Component {
    @property
    id:number = 0;
    @property
    dir:number = 0;
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
        this.node.setRotationFromEuler(0, 0, this.dir*45);
        matrix1[this.squarex*15 + this.squarey].id = this.id;
        matrix1[this.squarex*15 + this.squarey].mirrordir = this.dir;
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
