import { Pieza } from "./Pieza.js";
export class Dama extends Pieza {
    constructor(id, color, casilla) {
        super(id, color, casilla);
    }

    calcularMovimientos(tableroDigital) {
        let movimientosDeslizantes = [
            [1,1],
            [1,-1],
            [-1,1],
            [-1,-1],
            [1,0],
            [-1,0],
            [0,1],
            [0,-1]
        ];
        return this.movimientosDeslizantes(movimientosDeslizantes, tableroDigital, this.casilla);
    }
}