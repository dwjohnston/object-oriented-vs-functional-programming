import { Tickable } from "./Tickable";
import { Drawable } from "./Drawable";

export class LineMaker extends Tickable {

    private x: number; 
    private y: number; 
    private speed: number; 
    private children: Tickable[];  

    public constructor(x :number, y : number, speed :number, children?:  LineMaker[]) {
        super(); 
        this.x = x; 
        this.y =y; 
        this.speed = speed; 
        this.children = children || []; 
    }
    

    public tick() : Drawable[] {
        const items = [
            {
                x: this.x, 
                y: this.y, 
            }, 
            ...this.children.flatMap(v => v.tick())
        ]
       
        this.x = this.x + this.speed; 
        return items; 
    }
}