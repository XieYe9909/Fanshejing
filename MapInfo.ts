
import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = MapInfo
 * DateTime = Sun Oct 31 2021 16:36:39 GMT+0800 (中国标准时间)
 * Author = Moonlord
 * FileBasename = MapInfo.ts
 * FileBasenameNoExtension = MapInfo
 * URL = db://assets/Scripts/MapInfo.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 
@ccclass('MapInfo')
export class MapInfo extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    public static xstart1():number {return -541.5;}
    public static ystart1():number {return -264;}
    public static squaresize():number {return 70;}
    public static framesize():number {return 2;}
    public static xshift1():number {return MapInfo.xstart1() + MapInfo.squaresize()/2 + MapInfo.framesize();}
    public static yshift1():number {return MapInfo.ystart1() + MapInfo.squaresize()/2 + MapInfo.framesize();}
    public static totalsize():number {return MapInfo.squaresize() + MapInfo.framesize();}
    public static squarenum():number {return 15;}
    public static xend1():number {return MapInfo.xstart1() + MapInfo.squarenum() * MapInfo.totalsize();}
    public static yend1():number {return MapInfo.ystart1() + MapInfo.squarenum() * MapInfo.totalsize();}

    public static xstart2():number {return -550.5;}
    public static ystart2():number {return -582;}
    public static squaresize2():number {return 70;}
    public static framesize2x():number {return 20;}
    public static framesize2y():number {return 30;}
    public static xshift2():number {return MapInfo.xstart2() + MapInfo.squaresize2()/2 + MapInfo.framesize2x();}
    public static yshift2():number {return MapInfo.ystart2() + MapInfo.squaresize2()/2 + MapInfo.framesize2y();}
    public static totalsize2x():number {return MapInfo.squaresize2() + MapInfo.framesize2x();}
    public static totalsize2y():number {return MapInfo.squaresize2() + MapInfo.framesize2y();}
    public static squarenum2x():number {return 12;}
    public static squarenum2y():number {return 2;}
    public static xend2():number {return MapInfo.xstart2() + MapInfo.squarenum2x() * MapInfo.totalsize2x();}
    public static yend2():number {return MapInfo.ystart2() + MapInfo.squarenum2y() * MapInfo.totalsize2y();}

    start () {
        // [3]
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
