import { ValueProvider, Tickable } from "./baseTypes";

export class LinearValueProvider implements ValueProvider, Tickable {
    
    private min: number; 
    private max: number; 
    private step: number; 
    private value: number;
    
    constructor(min: number, max: number, step: number) {
        this.min = min; 
        this.max = max; 
        this.step = step; 

        this.value = min; 
    }


    tick() {
        let newValue = this.value + this.step; 
        if (newValue> this.max) {
            newValue = newValue - this.max + this.min; 
        }

        this.value =newValue; 
    }

    getValue() {
        return this.value; 
    }
}