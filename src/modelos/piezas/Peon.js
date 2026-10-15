import { Pieza } from "./pieza.js";
export class Peon extends Pieza {
    movDoble;
    constructor(id, color, casilla) {
        super(id, color, casilla);
    }
    obtenerMovimientos(tableroDigital) {
        
    }
}