import { Pieza } from "./Pieza.js";
export class Alfil extends Pieza {

    constructor(id, color, casilla, img) {
        super(id, color, casilla, img);
    }

    calcularMovimientos(tableroDigital) {
        let movimientosDeslizantes = [
            [1,1],
            [1,-1],
            [-1,1],
            [-1,-1]
        ];
        return this.movimientosDeslizantes(movimientosDeslizantes, tableroDigital, this.casilla);
    }

}