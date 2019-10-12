import { PositionProvider, Position } from "./baseTypes";

export class StaticPositionProvider implements PositionProvider {

    private position: Position; 

    constructor(x:number, y: number) {
        this.position = new Position(x,y); 
    }

    static fromPosition(position: Position) : StaticPositionProvider {
        return new this(position.x, position.y); 
    }

    getPosition () {
        return this.position; 
    }
}