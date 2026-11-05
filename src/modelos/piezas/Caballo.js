import { Pieza } from "./Pieza.js";
export class Caballo extends Pieza {

    constructor(id, color, casilla, img) {
        super(id, color, casilla, img);
    }

    calcularMovimientos(tableroDigital) {
        let movimientosDirectos = [
            [-1,2],
            [1,2],
            [2,1],
            [2,-1],
            [1,-2],
            [-1,-2],
            [-2,-1],
            [-2,1]
        ];
        return this.movimientosDirectos(movimientosDirectos, tableroDigital, this.casilla);
    }
}