import { LineInstance, Action } from "./types";

export function instantiateFanRecursive(
    recursionDepth: number,
    nChildrenPerLevel: number,
    x: number,
    y: number,
    speed: number,
    xStep: number,
    yStep: number,
    speedStep: number
): LineInstance[] {


    return [
        {
            x, y, speed,
        },
        ...new Array(recursionDepth > 0 ? nChildrenPerLevel : 0).fill(true).flatMap((v, i) => instantiateFanRecursive(
            recursionDepth - 1,
            nChildrenPerLevel,
            x + (i + 1) * xStep,
            y + yStep,
            speed + speedStep, 
            xStep, 
            yStep, 
            speedStep))
    ]
}

export function reduceFanRecursive(state: LineInstance[], action: Action) {
    return state.map(v => ({
        x: v.x + v.speed, 
        y: v.y, 
        speed: v.speed, 
    }))
}