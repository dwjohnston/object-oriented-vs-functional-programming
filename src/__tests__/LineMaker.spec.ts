import { LinearMultiLineMaker } from "../object-oriented/LinearMultiLineMaker";
import { FanRecursiveLineMaker } from "../object-oriented/FanRecursiveLineMaker";
import { Drawable } from "../object-oriented/Drawable";
import { createLinearMultiLineTickFn } from "../functional-approach-1__as-a-function-of-t/createLinearMultiLine";
import { createFanRecursiveTickFn } from "../functional-approach-1__as-a-function-of-t/createFanRecursive";
import { instantiateLinearMultiLine, reduceLinearMultiLine, getDrawablesFromLineInstances } from "../functional-approach-2__state-reducer/createLinearMultiLine";
import { instantiateFanRecursive, reduceFanRecursive } from "../functional-approach-2__state-reducer/createFanRecursive";
import { Mover } from "../object-oriented-v2/Mover";
import { StaticValueProvider } from "../object-oriented-v2/StaticValueProvider";
import { StaticPositionProvider } from "../object-oriented-v2/StaticPositionProvider";
import { Tickable, DrawProvider } from "../object-oriented-v2/baseTypes";
import { LinearValueProvider } from "../object-oriented-v2/LinearValueProvider";


//https://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable-string
function humanFileSize(bytes: number, si = true) {
    var thresh = si ? 1000 : 1024;
    if(Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    var units = si
        ? ['kB','MB','GB','TB','PB','EB','ZB','YB']
        : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while(Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1)+' '+units[u];
}

function printMemory(n: number) {
    console.info(`Memory used: ${humanFileSize(n)}`); 
}

function getMemory() :number {
    return process.memoryUsage().heapUsed; 
}

function defaultSort(a: Drawable, b: Drawable) {

    if (a.x < b.x) {
        return -1;
    }

    if (a.x > b.x) {
        return 1;
    }

    //xs are equal
    if (a.y < b.y) {
        return -1;
    }

    if (a.y > b.y) {
        return 1;
    }

    return 0;
}

describe("LinearMultiLineMaker, nLines: 3 x: 0, y:0, speed: 1,  xStep: 1, yStep: 2, speedStep: 1", () => {

    const expectedResult0 = [
        {
            x: 0,
            y: 0,
        },
        {
            x: 1,
            y: 2,
        },
        {
            x: 2,
            y: 4
        }

    ];

    const expectedResult1 = [
        {
            x: 1,
            y: 0
        }, {
            x: 3,
            y: 2,
        },
        {
            x: 5,
            y: 4
        }
    ];

    const expectedResult2 = [
        {
            x: 2,
            y: 0
        }, {
            x: 5,
            y: 2,
        },
        {
            x: 8,
            y: 4
        }
    ]

    it("object-oriented returns correct", () => {


        const lineMaker = new LinearMultiLineMaker(3, 1, 0, 0, 1, 2, 1);
        expect(lineMaker.tick()).toEqual(expectedResult0);
        expect(lineMaker.tick()).toEqual(expectedResult1);
        expect(lineMaker.tick()).toEqual(expectedResult2);
    });

    it("function-approach-1 returns correct", () => {
        const tickFn = createLinearMultiLineTickFn(3, 1, 0, 0, 1, 2, 1);
        expect(tickFn(0)).toEqual(expectedResult0);
        expect(tickFn(1)).toEqual(expectedResult1);
        expect(tickFn(2)).toEqual(expectedResult2);
    });

    it("functional approach-2 returns correct", () => {
        const li0 = instantiateLinearMultiLine(3, 1, 0, 0, 1, 2, 1);


        const li1 = reduceLinearMultiLine(li0, {
            nTicks: 1
        });
        const li2 = reduceLinearMultiLine(li1, {
            nTicks: 1
        });


        expect(getDrawablesFromLineInstances(li0)).toEqual(expectedResult0);
        expect(getDrawablesFromLineInstances(li1)).toEqual(expectedResult1);
        expect(getDrawablesFromLineInstances(li2)).toEqual(expectedResult2);

    });
});

describe("FanRecursiveLineMaker recursionDepth: 2, nChildrenPerLevel: 2, x: 0, y: 0, speed: 1,  xStep: 1, yStep: 2,, speedStep: 1", () => {
    const expectedResult0 = [
        {
            x: 0,
            y: 0,
        },
        {
            x: 1,
            y: 2,
        },
        {
            x: 2,
            y: 2,
        },
        {
            y: 4,
            x: 2,

        },
        {
            y: 4,
            x: 3
        },
        {
            y: 4,
            x: 3,

        },
        {
            y: 4,
            x: 4,
        }
    ];

    const expectedResult1 = [
        {
            x: 1,
            y: 0,
        },
        {
            x: 3,
            y: 2,
        },
        {
            x: 4,
            y: 2,
        },
        {
            y: 4,
            x: 5,

        },
        {
            y: 4,
            x: 6
        },
        {
            y: 4,
            x: 6,

        },
        {
            y: 4,
            x: 7,
        }
    ];

    it("object-oriented works correct ", () => {

        const lineMaker = new FanRecursiveLineMaker(2, 2, 0, 0, 1, 1, 2, 1);
        const r1 = lineMaker.tick();
        const r2 = lineMaker.tick();

        expect(r1.length).toEqual(expectedResult0.length);
        expect(r2.length).toEqual(expectedResult1.length);
        expect(r1.sort(defaultSort)).toEqual(expectedResult0.sort(defaultSort));
        expect(r2.sort(defaultSort)).toEqual(expectedResult1.sort(defaultSort));
    })

    it("function-approach-1 works correct", () => {

        const tickFn = createFanRecursiveTickFn(2, 2, 0, 0, 1, 1, 2, 1);
        const r1 = tickFn(0);
        const r2 = tickFn(1);

        expect(r1.length).toEqual(expectedResult0.length);
        expect(r2.length).toEqual(expectedResult1.length);
        expect(r1.sort(defaultSort)).toEqual(expectedResult0.sort(defaultSort));
        expect(r2.sort(defaultSort)).toEqual(expectedResult1.sort(defaultSort));

    });


    it("functional-approach-2 works correct", () => {
        const li0 = instantiateFanRecursive(2, 2, 0, 0, 1, 1, 2, 1);
        const li1 = reduceFanRecursive(li0, {
            nTicks: 0
        });

        const r1 = getDrawablesFromLineInstances(li0);
        const r2 = getDrawablesFromLineInstances(li1);

        expect(r1.length).toEqual(expectedResult0.length);
        expect(r2.length).toEqual(expectedResult1.length);
        expect(r1.sort(defaultSort)).toEqual(expectedResult0.sort(defaultSort));
        expect(r2.sort(defaultSort)).toEqual(expectedResult1.sort(defaultSort));
    });


    // it ("object-oriented performance test", () => {
    //     console.info ("Object Orient Approach Peformance Test"); 
    //     const m0 = getMemory(); 
    //     const t0 = Date.now(); 

    //     const lineMaker = new FanRecursiveLineMaker(20, 2, 0, 0, 1, 2, 1, 1);
    //     const r1 = lineMaker.tick(); 
    //     printMemory(getMemory() - m0); 
    //     console.info(`Length: ${r1.length}`); 
    //     console.info(`Time Taken: ${Date.now() - t0}ms`); 
    //     const t1 = Date.now(); 
    //     const r2 = lineMaker.tick(); 
    //     console.info(`Length: ${r2.length}`); 
    //     console.info(`Time Taken: ${Date.now() - t1}ms`); 

    // }); 

    // it("functional-approach-1 perforance test", () => {
    //     console.info("Functional Approach 1 Performance Test"); 

    //     const t0 = Date.now(); 
    //     const m0 = getMemory(); 
    //     const tickFn = createFanRecursiveTickFn(20, 2, 0, 0, 1,1, 2, 1);
    //     const r1 = tickFn(0); 
    //     printMemory(getMemory() - m0); 
    //     console.info(`Length: ${r1.length}`); 
    //     console.info(`Time Taken: ${Date.now() - t0}ms`); 
    //     const t1 = Date.now(); 
    //     const r2 = tickFn(1); 
    //     console.info(`Length: ${r2.length}`); 
    //     console.info(`Time Taken: ${Date.now() - t1}ms`); 
    // }); 

    // it("functional-approach-2 perforance test", () => {
    //     console.info("Functional Approach 2 Performance Test"); 
    //     const t0 = Date.now(); 
    //     const m0 = getMemory(); 

    //     const li0 = instantiateFanRecursive(20, 2, 0, 0, 1, 1, 2, 1);
    //     const r0 = getDrawablesFromLineInstances(li0); 
    //     printMemory(getMemory() - m0); 
    //     console.info(`Length: ${r0.length}`); 
    //     console.info(`Time Taken: ${Date.now() - t0}ms`); 
    //     const t1 = Date.now(); 
    //     const li1 = reduceFanRecursive(li0, {
    //         nTicks: 0
    //     });
    //     const r1 = getDrawablesFromLineInstances(li1); 
    //     console.info(`Length: ${r1.length}`); 
    //     console.info(`Time Taken: ${Date.now() - t1}ms`); 
    // }); 
}); 


describe("v-shape", () => {


        const expectedResult0 = [
            {
                x: 1, 
                y: 0
            }, 
            {
                x: 1, 
                y: 1, 
            },
            {
                x: 3, 
                y: -2
            }
        ]
    
        const expectedResult1 = [
            {
                x: 2, 
                y: 0
            }, 
            {
                x: 2, 
                y: 2, 
            },
            {
                x: 6, 
                y: -4
            }
        ]
        it ("Object-Oriented v2 returns correct", () => {
            

            const baseMover = new Mover(
                new StaticPositionProvider(0,0), 
                new StaticPositionProvider(1, 0), 
                new StaticValueProvider(1)
            ); 

            const moverA = new Mover(
                baseMover, 
                new StaticPositionProvider(0,1), 
                new StaticValueProvider(1)
            )

            const moverB = new Mover(
                baseMover, 
                new StaticPositionProvider(1,-1), 
                new StaticValueProvider(2)
            )

            const allTicks : (Tickable & DrawProvider)[] =  [
                baseMover, 
                moverA, 
                moverB
            ]; 
            

            allTicks.forEach(v => v.tick()); 
            const results0 = allTicks.flatMap(v => v.getDrawables());
            allTicks.forEach(v => v.tick()); 
            const results1 = allTicks.flatMap(v => v.getDrawables()); 
            expect(results0).toEqual(expectedResult0); 
            expect(results1).toEqual(expectedResult1); 

        })
    
})


describe("v-shape with dynamic base speed", () => {

    const expectedResult0 = [
        {
            x: 1, 
            y: 0
        }, 
        {
            x: 1, 
            y: 1, 
        },
        {
            x: 3, 
            y: -2
        }
    ]

    const expectedResult1 = [
        {
            x: 3, 
            y: 0
        }, 
        {
            x: 3, 
            y: 2, 
        },
        {
            x: 7, 
            y: -4
        }
    ]

    const expectedResult2 = [
        {
            x: 6, 
            y: 0
        }, 
        {
            x: 6, 
            y: 3, 
        },
        {
            x: 12, 
            y: -6
        }
    ]
    it ("object-oriented v-2 works", () => {


        const speed = new LinearValueProvider(1, 10, 1);
        const baseMover = new Mover(
            new StaticPositionProvider(0,0), 
            new StaticPositionProvider(1, 0), 
            speed, 
        ); 

        const moverA = new Mover(
            baseMover, 
            new StaticPositionProvider(0,1), 
            new StaticValueProvider(1)
        )

        const moverB = new Mover(
            baseMover, 
            new StaticPositionProvider(1,-1), 
            new StaticValueProvider(2)
        )

        const allTicks : (Tickable)[] =  [
            baseMover, 
            moverA, 
            moverB, 
            speed, 
        ]; 

        const allDraws : (DrawProvider[]) = [
            baseMover, 
            moverA, 
            moverB, 
        ]
        

        allTicks.forEach(v => v.tick()); 
        const results0 = allDraws.flatMap(v => v.getDrawables());
        allTicks.forEach(v => v.tick()); 
        const results1 = allDraws.flatMap(v => v.getDrawables()); 
        allTicks.forEach(v => v.tick()); 
        const results2 = allDraws.flatMap(v => v.getDrawables()); 
        expect(results0).toEqual(expectedResult0); 
        expect(results1).toEqual(expectedResult1); 
        expect(results2).toEqual(expectedResult2); 
    })
})

describe("v-shape with dynamic shared speed", () => {

    const expectedResult0 = [
        {
            x: 1, 
            y: 0
        }, 
        {
            x: 1, 
            y: 1, 
        },
        {
            x: 2, 
            y: -1
        }
    ]

    const expectedResult1 = [
        {
            x: 3, 
            y: 0
        }, 
        {
            x: 3, 
            y: 3, 
        },
        {
            x: 6, 
            y: -3
        }
    ]

    const expectedResult2 = [
        {
            x: 6, 
            y: 0
        }, 
        {
            x: 6, 
            y: 6, 
        },
        {
            x: 12, 
            y: -6
        }
    ]
    it ("object-oriented v-2 works", () => {


        const speed = new LinearValueProvider(1, 10, 1);
        const baseMover = new Mover(
            new StaticPositionProvider(0,0), 
            new StaticPositionProvider(1, 0), 
            speed, 
        ); 

        const moverA = new Mover(
            baseMover, 
            new StaticPositionProvider(0,1), 
            speed, 
        )

        const moverB = new Mover(
            baseMover, 
            new StaticPositionProvider(1,-1), 
            speed, 
        )

        const allTicks : (Tickable)[] =  [
            baseMover, 
            moverA, 
            moverB, 
            speed, 
        ]; 

        const allDraws : (DrawProvider[]) = [
            baseMover, 
            moverA, 
            moverB, 
        ]
        

        allTicks.forEach(v => v.tick()); 
        const results0 = allDraws.flatMap(v => v.getDrawables());
        allTicks.forEach(v => v.tick()); 
        const results1 = allDraws.flatMap(v => v.getDrawables()); 
        allTicks.forEach(v => v.tick()); 
        const results2 = allDraws.flatMap(v => v.getDrawables()); 
        expect(results0).toEqual(expectedResult0); 
        expect(results1).toEqual(expectedResult1); 
        expect(results2).toEqual(expectedResult2); 
    })
})