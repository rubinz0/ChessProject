import { Pieza } from "./Pieza.js";
export class Caballo extends Pieza {

    constructor(id, color, casilla) {
        super(id, color, casilla);
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