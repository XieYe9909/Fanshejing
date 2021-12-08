
import { _decorator, Node, EventTouch, Component, director, sys } from 'cc';
import { MapInfo } from './MapInfo';
import { GetTotalColor, matrix1, matrix2 } from './Square';
import { LS_array } from './Light';
import { Flower, flower_array } from './Flower';
import { LightSource, LightTravel, FanseType, NewFanseArray, FanseDetect, FanseDraw } from './LightSource';
import { MainTheme, FS_locate } from './MainTheme';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Mirror
 * DateTime = Fri Oct 29 2021 12:54:14 GMT+0800 (中国标准时间)
 * Author = Moonlord
 * FileBasename = Mirror.ts
 * FileBasenameNoExtension = Mirror
 * URL = db://assets/scripts/Mirror.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

export function ChangeMirror() {
    let i:number, j:number;
    for(i=0; i<15*15; i++) {
        for(j=0; j<8*9; j++) {
            matrix1[i].lightdir[j] = false;
        }
    }

    let L_array:LightSource[] = new Array<LightSource>(LS_array.length);
    for(let i=0; i<LS_array.length; i++) L_array[i] = LS_array[i];

    let FS_array = NewFanseArray();
    FS_locate[0] = -1;
    FS_locate[1] = -1;
    LightTravel(L_array, FS_array, FanseType.Collect);
    if(FS_locate[0] >= 0) {
        FanseDetect(FS_locate, FS_array);
        FanseDraw(FS_locate, FS_array);
    }

    for(i=0; i<flower_array.length; i++) {
        let flower = flower_array[i].getComponent(Flower);
        flower.ChangeState();
    }
}

export let mirror_array = new Array<Mirror>();

export class MirrorState {
    public dir:number;
    public area:number;
    public locate:number[];

    constructor(dir:number, area:number, locate:number[]) {
        this.dir = dir;
        this.area = area;
        this.locate = locate;
    }
}

@ccclass('Mirror')
export class Mirror extends Component {
    @property
    public id:number = 0;
    @property
    public rotatable:boolean = true;
    public dir:number;
    public area:number;
    public squarex:number;
    public squarey:number;
    private isClick:boolean = true;

    onLoad() {
        mirror_array.push(this);
    }

    start () {
        this.node.on(Node.EventType.TOUCH_START, this.touchStart, this);
    }

    GetMirrorIndex(): number {
        for(let i=0; i<mirror_array.length; i++) {
            if(!this._id.localeCompare(mirror_array[i]._id)) return i;
        }
        return null;
    }

    SetMirror(mirror_state:MirrorState) {
        this.dir = mirror_state.dir
        this.area = mirror_state.area;
        this.squarex = mirror_state.locate[0];
        this.squarey = mirror_state.locate[1];

        if(this.area == 1){
            this.node.setPosition(this.squarex*MapInfo.totalsize() + MapInfo.xshift1(), this.squarey*MapInfo.totalsize() + MapInfo.yshift1(), 0);
            if(this.rotatable) this.node.setRotationFromEuler(0, 0, this.dir*45);
            if(this.squarex*15 + this.squarey < 15*15){
                matrix1[this.squarex*15 + this.squarey].id = this.id;
                matrix1[this.squarex*15 + this.squarey].mirrordir = this.dir;
            }
        }
        else if(this.area == 2) {
            this.node.setPosition(this.squarex*MapInfo.totalsize2x() + MapInfo.xshift2(), this.squarey*MapInfo.totalsize2y() + MapInfo.yshift2(), 0);
            if(this.rotatable) this.node.setRotationFromEuler(0, 0, this.dir*45);
            if(this.squarex*2 + this.squarey < 2*12){
                matrix2[this.squarex*2 + this.squarey] = true;
            }
        }
    }

    ChangeMirrorState(index:number) {
        let scene_name = director.getScene().name;
        let MS_array:MirrorState[] = JSON.parse(sys.localStorage.getItem(scene_name));
        MS_array[index].dir = this.dir;
        MS_array[index].area = this.area;
        MS_array[index].locate = [this.squarex, this.squarey];
        sys.localStorage.setItem(scene_name, JSON.stringify(MS_array));
    }

    touchStart (event:EventTouch) {
        this.isClick = true;
        this.node.on(Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.scheduleOnce(function(){
            this.isClick = false;
        }, 0.1)
    }

    touchEnd (event:EventTouch) {
        let index = this.GetMirrorIndex();
        if(this.isClick){
            if(this.rotatable){
                this.dir = (this.dir + 1) % 8;
                this.node.setRotationFromEuler(0, 0, this.dir * 45);
                this.ChangeMirrorState(index);
            }
            if(this.area == 1){
                this.node.setPosition(this.squarex*MapInfo.totalsize() + MapInfo.xshift1(), this.squarey*MapInfo.totalsize() + MapInfo.yshift1(), 0);
                matrix1[this.squarex*15 + this.squarey].mirrordir = this.dir;
                ChangeMirror();
                let maintheme = this.node.parent.getComponent(MainTheme);
                maintheme.Success();
            }
            else{
                this.node.setPosition(this.squarex*MapInfo.totalsize2x() + MapInfo.xshift2(), this.squarey*MapInfo.totalsize2y() + MapInfo.yshift2(), 0);
            }
        }
        else{
            let x:number = event.getUILocation().x - 562.5;
            let y:number = event.getUILocation().y - 1218;
            let new_x:number;
            let new_y:number;
            if(x>=MapInfo.xstart1() && x<=MapInfo.xend1() && y>=MapInfo.ystart1() && y<=MapInfo.yend1()){
                new_x = Math.floor((x - MapInfo.xstart1())/MapInfo.totalsize());
                new_y = Math.floor((y - MapInfo.ystart1())/MapInfo.totalsize());
                if(matrix1[new_x*15 + new_y].id == -1){
                    let [r0, g0, b0] = [false, false, false];
                    if(this.area == 1){
                        matrix1[this.squarex*15 + this.squarey].id = -1;
                        [r0, g0, b0] = GetTotalColor([this.squarex, this.squarey])
                    }
                    else{
                        matrix2[this.squarex*2 + this.squarey] = false;
                    }
                    this.area = 1;
                    matrix1[new_x*15 + new_y].id = this.id;
                    matrix1[new_x*15 + new_y].mirrordir = this.dir;
                    this.squarex = new_x;
                    this.squarey = new_y;
                    this.node.setPosition(this.squarex*MapInfo.totalsize() + MapInfo.xshift1(), this.squarey*MapInfo.totalsize() + MapInfo.yshift1(), 0);
                    ChangeMirror();
                    let maintheme = this.node.parent.getComponent(MainTheme);
                    maintheme.Success();
                    this.ChangeMirrorState(index);
                }
                else{
                    if(this.area == 1){
                        this.node.setPosition(this.squarex*MapInfo.totalsize() + MapInfo.xshift1(), this.squarey*MapInfo.totalsize() + MapInfo.yshift1(), 0);
                    }
                    else{
                        this.node.setPosition(this.squarex*MapInfo.totalsize2x() + MapInfo.xshift2(), this.squarey*MapInfo.totalsize2y() + MapInfo.yshift2(), 0);
                    }
                }
            }
            else if(x>=MapInfo.xstart2() && x<=MapInfo.xend2() && y>=MapInfo.ystart2() && y<=MapInfo.yend2()){
                new_x = Math.floor((x - MapInfo.xstart2())/MapInfo.totalsize2x());
                new_y = Math.floor((y - MapInfo.ystart2())/MapInfo.totalsize2y());
                if(matrix2[new_x*2 + new_y] == false){
                    if(this.area == 1){
                        matrix1[this.squarex*15 + this.squarey].id = -1;
                        ChangeMirror();
                        let maintheme = this.node.parent.getComponent(MainTheme);
                        maintheme.Success();
                    }
                    else{
                        matrix2[this.squarex*2 + this.squarey] = false;
                    }
                    this.area = 2;
                    matrix2[new_x*2 + new_y] = true;
                    this.squarex = new_x;
                    this.squarey = new_y;
                    this.node.setPosition(this.squarex*MapInfo.totalsize2x() + MapInfo.xshift2(), this.squarey*MapInfo.totalsize2y() + MapInfo.yshift2(), 0);
                    this.ChangeMirrorState(index);
                }
                else{
                    if(this.area == 1){
                        this.node.setPosition(this.squarex*MapInfo.totalsize() + MapInfo.xshift1(), this.squarey*MapInfo.totalsize() + MapInfo.yshift1(), 0);
                    }
                    else{
                        this.node.setPosition(this.squarex*MapInfo.totalsize2x() + MapInfo.xshift2(), this.squarey*MapInfo.totalsize2y() + MapInfo.yshift2(), 0);
                    }
                }
            }
            else{
                if(this.area == 1){
                    this.node.setPosition(this.squarex*MapInfo.totalsize() + MapInfo.xshift1(), this.squarey*MapInfo.totalsize() + MapInfo.yshift1(), 0);
                }
                else{
                    this.node.setPosition(this.squarex*MapInfo.totalsize2x() + MapInfo.xshift2(), this.squarey*MapInfo.totalsize2y() + MapInfo.yshift2(), 0);
                }
            }
        }
    }

    touchMove (event:EventTouch) {
        this.node.setPosition(this.node.getPosition().x + event.getUIDelta().x, this.node.getPosition().y + event.getUIDelta().y, 0);
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
