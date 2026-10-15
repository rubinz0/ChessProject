import { Pieza } from "./pieza.js";
export class Torre extends Pieza {
    seHaMovido;
    constructor(id, color, casilla) {
        super(id, color, casilla);
        this.seHaMovido = false;
    }
    obtenerMovimientos(tableroDigital) {
        
    }
}