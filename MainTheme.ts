
import { _decorator, Component, Node, Sprite, Label, director, sys } from 'cc';
import { LS_array } from './Light';
import { Flower, flower_array } from './Flower';
import { LightPiece } from './LightPiece';
import { LightSource, LightTravel, FanseType, NewFanseArray, FanseDetect, FanseDraw } from './LightSource';
import { ClearMatrix, matrix1, matrix2 } from './Square';
import { MirrorState, mirror_array, ChangeMirror } from './Mirror';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = MainTheme
 * DateTime = Thu Nov 04 2021 16:21:57 GMT+0800 (中國標準時間)
 * Author = XieYe0920
 * FileBasename = MainTheme.ts
 * FileBasenameNoExtension = MainTheme
 * URL = db://assets/scripts/MainTheme.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

export let success = false;
export let FS_locate:number[] = [-1, -1];

function GenerateLocate(i:number): number[] {
    let x:number, y:number;
    if(i < 12) {
        x = i;
        y = 1;
    }
    else {
        x = i - 12;
        y = 0;
    }
    return [x, y];
}

function InArray(key:number, arr:number[]) {
    for(let i=0; i<arr.length; i++) {
        if(arr[i] == key) return true;
    }
    return false;
}

@ccclass('MainTheme')
export class MainTheme extends Component {
    str:string;
    @property
    public success_str:string = '';

    onLoad() {
        ClearMatrix();
        while(LS_array.length > 0) LS_array.pop();
        while(flower_array.length > 0) flower_array.pop();
        while(mirror_array.length > 0) mirror_array.pop();
        
        let i:number, j:number, dir:number;
        for(i=0; i<15; i++) {
            for(j=0; j<15; j++){
                for(dir=0; dir<8; dir++){
                    let node = new Node('LP_node');
                    node.layer = 33554432;
                    node.addComponent(Sprite);
                    let LP = node.addComponent(LightPiece);
                    LP.SetProps([i, j], dir);
                    this.node.addChild(node);
                }
            }
        }

        let discribe = this.node.parent.getChildByName('levelDescribe');
        let label = discribe.getComponent(Label);
        this.str = label.string;
    }

    start() {
        let scene_name = director.getScene().name;
        let str = sys.localStorage.getItem(scene_name);
        let MS_array:MirrorState[];
        if(str == '' || str == null) {
            MS_array = new Array<MirrorState>();
            for(let i=0; i<mirror_array.length; i++) {
                let mirror_state = new MirrorState(0, 2, GenerateLocate(i));
                MS_array.push(mirror_state);
            }
            sys.localStorage.setItem(scene_name, JSON.stringify(MS_array));
        }
        else {
            MS_array = JSON.parse(str);
            if(MS_array.length != mirror_array.length) {
                while(MS_array.length>0) MS_array.pop();
                for(let i=0; i<mirror_array.length; i++) {
                    let mirror_state = new MirrorState(0, 2, GenerateLocate(i));
                    MS_array.push(mirror_state);
                }
                sys.localStorage.setItem(scene_name, JSON.stringify(MS_array));
            }
        }

        for(let i=0; i<mirror_array.length; i++) {
            mirror_array[i].SetMirror(MS_array[i]);
        }

        let L_array:LightSource[] = new Array<LightSource>(LS_array.length);
        for(let i=0; i<LS_array.length; i++) L_array[i] = LS_array[i];

        let FS_array = NewFanseArray();
        LightTravel(L_array, FS_array, FanseType.Collect);
        if(FS_locate[0] >= 0) {
            FanseDetect(FS_locate, FS_array);
            FanseDraw(FS_locate, FS_array);
        }
        

        let i:number;
        for(i=0; i<flower_array.length; i++) {
            let flower = flower_array[i].getComponent(Flower);
            flower.ChangeState();
        }

        this.Success();
    }

    GetSceneIndex(): number {
        let scene_name = director.getScene().name;
        let scene_index = scene_name.slice(5, scene_name.length);
        let index = Number(scene_index);
        return(index - 1);
    }

    SetUserState(scenen_index:number, success:boolean) {
        let LevelState = JSON.parse(sys.localStorage.getItem('LevelState'));
        let node = this.node.getChildByName('UserState');
        let label = node.getComponent(Label);

        if(LevelState[scenen_index]) {
            label.string = '已过关';
        }
        else {
            if(success) {
                LevelState[scenen_index] = true;
                label.string = '已过关';
                sys.localStorage.setItem('LevelState', JSON.stringify(LevelState));
            }
            else {
                label.string = '未过关';
            }
        }
    }

    Reset() {
        let scene_name = director.getScene().name;
        let MS_array:MirrorState[] = JSON.parse(sys.localStorage.getItem(scene_name));
        for(let i=0; i<MS_array.length; i++) {
            MS_array[i].dir = 0;
            MS_array[i].area = 2;
            MS_array[i].locate = GenerateLocate(i);
            if(mirror_array[i].area == 1) {
                matrix1[mirror_array[i].squarex*15 + mirror_array[i].squarey].id = -1;
            }
            mirror_array[i].SetMirror(MS_array[i]);
        }

        for(let i=0; i<12*2; i++) {
            let [x, y] = GenerateLocate(i);
            if(i < MS_array.length) matrix2[x*2 + y] = true;
            else matrix2[x*2 + y] = false;
        }

        ChangeMirror();
        this.Success();
        sys.localStorage.setItem(scene_name, JSON.stringify(MS_array));
    }

    Hint(event:Event, hint_str:string) {
        if(hint_str == '' || hint_str == null) return;

        let scene_name = director.getScene().name;
        let MS_array:MirrorState[] = JSON.parse(sys.localStorage.getItem(scene_name));
        let hint_num = hint_str.length / 7;
        let other_num = MS_array.length - hint_num;
        let hint_index = new Array<number>(hint_num);

        for(let i=0; i<MS_array.length; i++) {
            MS_array[i].dir = 0;
            MS_array[i].area = 2;
            MS_array[i].locate = GenerateLocate(i);
            if(mirror_array[i].area == 1) {
                matrix1[mirror_array[i].squarex*15 + mirror_array[i].squarey].id = -1;
            }
            mirror_array[i].SetMirror(MS_array[i]);
        }

        for(let i=0; i<hint_num; i++) {
            let str = hint_str.slice(i*7, (i + 1)*7);
            let index = +str.slice(0, 2);

            if(MS_array[index].area == 1) {
                let [x, y] = MS_array[index].locate;
                matrix1[x*15 + y].id = -1;
            }

            MS_array[index].area = 1;
            MS_array[index].dir = +str[2];
            MS_array[index].locate[0] = +str.slice(3, 5);
            MS_array[index].locate[1] = +str.slice(5, 7);
            mirror_array[index].SetMirror(MS_array[index]);
            hint_index[i] = index;
        }

        let k = 0;
        for(let i=0; i<MS_array.length; i++) {
            if(!InArray(i, hint_index)) {
                if(MS_array[i].area == 1) {
                    let [x, y] = MS_array[i].locate;
                    matrix1[x*15 + y].id = -1;
                }

                MS_array[i].area = 2;
                MS_array[i].dir = 0;
                MS_array[i].locate = GenerateLocate(k++);
                mirror_array[i].SetMirror(MS_array[i]);
            }
        }

        for(let i=0; i<12*2; i++) {
            let [x, y] = GenerateLocate(i);
            if(i < other_num) matrix2[x*2 + y] = true;
            else matrix2[x*2 + y] = false;
        }

        ChangeMirror();
        this.Success();
        sys.localStorage.setItem(scene_name, JSON.stringify(MS_array));
    }

    Success() {
        let success:boolean = true;
        let i:number;
        for(i=0; i<flower_array.length; i++) {
            let flower = flower_array[i].getComponent(Flower);
            success &&= flower.state;
        }

        let discribe = this.node.parent.getChildByName('levelDescribe');
        let label = discribe.getComponent(Label);
        let scenen_index = this.GetSceneIndex();

        if(success) {
            label.string = this.success_str;
            this.SetUserState(scenen_index, true);
        }
        else {
            label.string = this.str;
            this.SetUserState(scenen_index, false);
        }
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
