export class Position {
    private _x : number; 
    private _y: number; 

    public constructor(x: number, y: number) {
        this._x = x; 
        this._y =y; 
    }

    static fromPosition(position:Position) {
        return new this(position.x, position.y); 
    }

    get x() :number {
        return this._x; 
    }

    get y() : number {
        return this._y; 
    }

    addX(x: number) {
        this._x = this._x + x; 
    }

    addY(y: number) {
        this._y = this._y +y; 
    }

    add(x: number, y: number) {
        this.addX(x); 
        this.addY(y); 
    }

    addPosition(position: Position) {
        this.add(position.x, position.y); 
    }

    setPosition(position: Position) {
        this._x = position.x; 
        this._y = position.y; 
    }

    multiply(value:number) {
        this._x = this._x * value; 
        this._y = this._y * value; 
    }
}



export interface ValueProvider {
    getValue: () => number; 
}

export interface PositionProvider {
    getPosition: () => Position; 
}

export interface Tickable {
    tick: () => void; 
}

export interface Drawable {
    x: number; 
    y: number;
}



export interface DrawProvider {
    getDrawables: () => Drawable[]; 
}