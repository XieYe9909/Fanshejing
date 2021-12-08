
import { _decorator, Component, Node, Sprite, Color} from 'cc';
import { MapInfo } from './MapInfo';
import { matrix1, GetTotalColor } from './Square';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Flower
 * DateTime = Sun Oct 31 2021 17:42:46 GMT+0800 (中国标准时间)
 * Author = Moonlord
 * FileBasename = Flower.ts
 * FileBasenameNoExtension = Flower
 * URL = db://assets/Scripts/Flower.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

export let flower_array:Node[] = new Array<Node>();

@ccclass('Flower')
export class Flower extends Component {
    public id:number;
    public squarex:number = 0;
    public squarey:number = 0;
    @property
    public red:boolean = false;
    @property
    public green:boolean = false;
    @property
    public blue:boolean = false;
    public state:boolean = false;

    onLoad() {
        let x:number = this.node.getPosition().x;
        let y:number = this.node.getPosition().y;
        if(x>=MapInfo.xstart1() && x<=MapInfo.xend1() && y>=MapInfo.ystart1() && y<=MapInfo.yend1()){
            this.squarex = Math.floor((x - MapInfo.xstart1())/MapInfo.totalsize());
            this.squarey = Math.floor((y - MapInfo.ystart1())/MapInfo.totalsize());
        }
        
        this.id = 0;
        this.node.setPosition(this.squarex*MapInfo.totalsize() + MapInfo.xshift1(), this.squarey*MapInfo.totalsize() + MapInfo.yshift1(), 0);
        matrix1[this.squarex*15 + this.squarey].id = this.id;
        flower_array.push(this.node);
        this.ChangeState();
    }

    ChangeState() {
        let [r, g, b] = GetTotalColor([this.squarex, this.squarey]);
        if(r == this.red && g == this.green && b == this.blue) {
            this.state = true;
        }
        else {
            this.state = false;
        }

        let sprite = this.getComponent(Sprite);
        if(this.state) {
            this.node.setScale(1, 1);
            sprite.color = new Color(this.red ? 255 : 0, this.green ? 255 : 0, this.blue ? 255 : 0, 255);
        }
        else {
            this.node.setScale(0.9, 0.9);
            if (this.red || this.green || this.blue) {
                sprite.color = new Color(this.red ? 150 : 0, this.green ? 150 : 0, this.blue ? 150 : 0, 255);
            }
            else {
                sprite.color = new Color(80, 80, 80, 255);
            }
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
