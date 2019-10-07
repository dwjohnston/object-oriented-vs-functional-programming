import { Drawable } from "../object-oriented/Drawable";

export function createFanRecursive(
    t: number, 
    recursionDepth: number, 
    nChildrenPerLevel: number, 
    x: number, 
    y: number, 
    speed: number, 
    xStep: number, 
    yStep: number, 
    speedStep: number
) : Drawable[] {
    const items = [
        {
            x: x + (t * speed), 
            y: y, 
        }, 
        ...new Array(recursionDepth > 0 ? nChildrenPerLevel : 0).fill(true).flatMap((v, i) => {
            return createFanRecursive(
                t, 
                recursionDepth -1, 
                nChildrenPerLevel, 
                x + (i +1) * xStep, 
                y + yStep, 
                speed + speedStep, 
                xStep, 
                yStep, 
                speedStep
            ); 
        })
    ]

    return items; 
}


export function createFanRecursiveTickFn(
    recursionDepth: number, 
    nChildrenPerLevel: number, 
    x: number, 
    y: number, 
    speed: number, 
    xStep: number, 
    yStep: number, 
    speedStep: number
) {
    return function(t: number) {
        return createFanRecursive(
            t, 
            recursionDepth, 
            nChildrenPerLevel, 
            x, 
            y, 
            speed, 
            xStep, 
            yStep, 
            speedStep
        )
    }
}