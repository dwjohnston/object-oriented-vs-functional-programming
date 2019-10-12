import { ValueProvider } from "./baseTypes";

export class StaticValueProvider implements ValueProvider {

    private _value: number; 

    constructor(value: number) {
        this._value = value; 
    }

    getValue() {
        return this._value; 
    }
}