import { Pieza } from "./Pieza.js";
export class Dama extends Pieza {
    constructor(id, color, casilla, img) {
        super(id, color, casilla, img);
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