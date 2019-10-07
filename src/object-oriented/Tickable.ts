import { Drawable } from "./Drawable";



export abstract class Tickable {
    public tick() : Drawable[] {
        throw new Error("tick() function not implemented"); 
    }
}