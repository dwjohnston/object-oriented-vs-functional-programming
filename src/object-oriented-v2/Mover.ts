import { Position, ValueProvider, PositionProvider, DrawProvider, Tickable } from "./baseTypes";


export class Mover implements Tickable, PositionProvider, DrawProvider {

    private _center: Position;
    private _vector: Position;
    private speed: ValueProvider;
    private _position: Position;
    private _accruedVector: Position;

    constructor(center: PositionProvider, vector: PositionProvider, speed: ValueProvider) {
        this._center = center.getPosition();
        this._vector = vector.getPosition();
        this._position = Position.fromPosition(center.getPosition());
        this._accruedVector = new Position(0, 0);

        this.speed = speed;
    }


    tick() {

        const speedVector = Position.fromPosition(this._vector); 
        speedVector.multiply(this.speed.getValue());
        this._accruedVector.addPosition(speedVector); 

        this._position.setPosition(Position.fromPosition(this._center)); 
        this._position.addPosition(this._accruedVector); 

    }

    getPosition() {
        return this._position; 
    }

    getDrawables() {
        return [{
            x: this._position.x, 
            y: this._position.y, 
        }]
    }

}