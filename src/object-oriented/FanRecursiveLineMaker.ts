import { LineMaker } from "./LineMaker";
import { Tickable } from "./Tickable";
import { Drawable } from "./Drawable";


export class FanRecursiveLineMaker extends Tickable {


    private recursionDepth: number;
    private nChildrenPerLevel: number;
    private x: number;
    private y: number;
    private speed: number;
    private yStep: number;
    private xStep: number;
    private speedStep: number;
    private children: FanRecursiveLineMaker[];


    public constructor(
        recursionDepth: number,
        nChildrenPerLevel: number,
        x: number,
        y: number,
        speed: number,
        xStep: number,
        yStep: number,
        speedStep: number) {
        super();

        this.recursionDepth = recursionDepth;
        this.nChildrenPerLevel = nChildrenPerLevel;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.yStep = yStep;
        this.xStep = xStep;
        this.speedStep = speedStep;

        this.children = [];
        this.update();

    }

    public update() {

        this.children = [];
        for (let i = 0; i < this.nChildrenPerLevel && this.recursionDepth > 0; i++) {
            this.children.push(
                new FanRecursiveLineMaker(this.recursionDepth - 1, this.nChildrenPerLevel, this.x + ((i + 1) * this.xStep), this.y + this.yStep, this.speed + this.speedStep, this.xStep, this.yStep, this.speedStep)
            );
        }
    }


    public tick(): Drawable[] {
        const items = [
            {
                x: this.x,
                y: this.y,
            },
            ...this.children.flatMap(v => v.tick())
        ];

        this.x = this.x + this.speed;
        return items;
    }
}