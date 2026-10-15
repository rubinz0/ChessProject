import { Pieza } from "./pieza.js";
export class Rey extends Pieza {
    seHaMovido;
    constructor(id, color, casilla) {
        super(id, color, casilla);
        this.seHaMovido = false;
    }
    obtenerMovimientos(tableroDigital) {
        
    }
}