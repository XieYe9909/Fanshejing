
import { _decorator, Component, UITransform, Sprite, SpriteFrame, resources, Color } from 'cc';
import { MapInfo } from './MapInfo';
import { GetColor } from './Square';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = LightPiece
 * DateTime = Wed Nov 03 2021 20:14:34 GMT+0800 (中國標準時間)
 * Author = XieYe0920
 * FileBasename = LightPiece.ts
 * FileBasenameNoExtension = LightPiece
 * URL = db://assets/scripts/LightPiece.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

// const ImWidth = 36;
// const ImHeight = 2;
// const ImData = new Uint8Array(ImWidth * ImHeight * 4);
// for (let i=0; i<ImWidth*ImHeight*4; i++) {
//     ImData[i] = 255;
// }

@ccclass('LightPiece')
export class LightPiece extends Component {
    public dir:number = 0;
    public locate:number[] = [0, 0];

    SetProps(locate:number[], dir:number) {
        this.locate = locate;
        this.dir = dir;
    }

    onLoad() {
        let UI = this.getComponent(UITransform);
        UI.anchorX = 0;
        UI.anchorY = 0.5;
        
        if(this.dir % 2 == 1) {
            this.node.setScale(1.41421, 1);
        }
        else {
            this.node.setScale(1, 1);
        }

        this.node.setPosition(this.locate[0]*MapInfo.totalsize() + MapInfo.xshift1(), this.locate[1]*MapInfo.totalsize() + MapInfo.yshift1(), 0);
        this.node.setRotationFromEuler(0, 0, this.dir * 45);

        resources.load("LightPiece/spriteFrame", SpriteFrame, (_err: any, spriteFrame: SpriteFrame) => {
            this.getComponent(Sprite).spriteFrame = spriteFrame;
        });

        let [r, g, b] = GetColor(this.locate, this.dir);
        let sprite = this.getComponent(Sprite);

        if (r == false && g == false && b == false) {
            sprite.color = new Color(0, 0, 0, 0);
        }
        else {
            sprite.color = new Color((r ? 255 : 0), (g ? 255 : 0), (b ? 255 : 0), 255);
        }
    }

    update() {
        let [r, g, b] = GetColor(this.locate, this.dir);
        let sprite = this.getComponent(Sprite);

        if (r == false && g == false && b == false) {
            sprite.color = new Color(0, 0, 0, 0);
        }
        else {
            sprite.color = new Color((r ? 255 : 0), (g ? 255 : 0), (b ? 255 : 0), 255);
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
