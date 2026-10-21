import { Pieza } from "./pieza.js";
export class Torre extends Pieza {
    img = this.id
    seHaMovido;
    constructor(id, color, casilla) {
        super(id, color, casilla);
        this.seHaMovido = false;
    }

    calcularMovimientos(tableroDigital) {
        let movimientosDeslizantes = [
            [1,0],
            [-1,0],
            [0,1],
            [0,-1]
        ];
        return this.movimientosDeslizantes(movimientosDeslizantes, tableroDigital);
    }


}