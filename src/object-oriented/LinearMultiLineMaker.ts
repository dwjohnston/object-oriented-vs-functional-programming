import { LineMaker } from "./LineMaker";
import { Tickable } from "./Tickable";
import { Drawable } from "./Drawable";


export class LinearMultiLineMaker extends Tickable{

    private nLines: number;
    private speed: number;
    private x: number;
    private y: number;
    private xStep: number;
    private yStep: number;
    private speedStep: number;
    private children: LineMaker[]; 

    public constructor(nLines: number, speed: number, x: number, y: number,  xStep: number, yStep: number,speedStep: number) {

        super(); 

        this.nLines = nLines;
        this.speed = speed;
        this.x = x;
        this.y = y;
        this.yStep = yStep;
        this.xStep = xStep;
        this.speedStep = speedStep;

        this.children = [];
        this.update();

    }

    public update() {

        this.children = [];
        for (let i = 0; i < this.nLines; i++) {
            this.children.push(
                new LineMaker(this.x + this.xStep * i, this.y + this.yStep * i, this.speed + this.speedStep * i)
            );
        }
    }


    public tick() : Drawable[] {
        console.log(this.children); 
        return this.children.flatMap(v => v.tick());
    }
}