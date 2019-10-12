export interface Position {
    x: number;
    y: number; 
}

export class Position {
    private x: number; 
}

export interface Vector {
    x:number; 
    y: number; 
}

export interface PositionMaker {
    getPosition: () => Position; 
}