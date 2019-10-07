export function createLinearMultiLine(
    t: number,
    nLines: number,
    speed: number,
    x: number,
    y: number,
    xStep: number,
    yStep: number,
    speedStep: number
) {
    return new Array(nLines).fill(true).map((v, i) => {
        return {
            x: x + (i * xStep) + (t * ((i * speedStep) + speed)),
            y: y + (i * yStep)
        }
    });

}

export function createLinearMultiLineTickFn(
    nLines: number,
    speed: number,
    x: number,
    y: number,
    xStep: number,
    yStep: number,
    speedStep: number) {

    return function (t: number) {
        return createLinearMultiLine(
            t, nLines, speed, x, y, xStep, yStep, speedStep
        )
    }
}