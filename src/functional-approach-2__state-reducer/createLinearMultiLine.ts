import { LineInstance, Action } from "./types";


export function getDrawablesFromLineInstances(lines: LineInstance[]) {
    return lines.map(v => ({
        x: v.x, 
        y: v.y, 
    }))
}

 
export function instantiateLinearMultiLine(
    nLines: number, 
    speed: number, 
    x: number, 
    y: number, 
    xStep: number, 
    yStep: number, 
    speedStep: number
) : LineInstance[] {
    return new Array(nLines).fill(true).map((v,i) => {
        return {
            x: x + i * xStep, 
            y: y + i * yStep, 
            speed: speed + i * speedStep
        }
    }); 
}

export function reduceLinearMultiLine(state : LineInstance[], action: Action)  : LineInstance[]{
    return state.map(v => ({
        x: v.x + v.speed * action.nTicks, 
        y: v.y, 
        speed: v.speed, 
    })); 
}

