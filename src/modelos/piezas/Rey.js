import { Pieza } from "./Pieza.js";
import { comprobacionesEnroque } from "../../utilidades.js";

export class Rey extends Pieza {
    constructor(id, color, casilla, img) {
        super(id, color, casilla, img);
    }

    calcularMovimientos(tableroDigital) {
        let movimientosDirectos = [
            [0,1],
            [1,1],
            [1,0],
            [1,-1],
            [0,-1],
            [-1,-1],
            [-1,0],
            [-1,1],
        ];
        //Comprueba si el rey se ha movido y si ha movido su torre si no, añade el enroque de ese lado como movimiento, 
        // ademas de comprobar que las casillas intermedias esten vacias
        if(this.color === "blanco" && !comprobacionesEnroque["blanco-rey-1"] && !comprobacionesEnroque["blanco-torre-2"] && tableroDigital["g1"] === null && tableroDigital["f1"] === null) movimientosDirectos.push([2,0]);
        if(this.color === "blanco" && !comprobacionesEnroque["blanco-rey-1"] && !comprobacionesEnroque["blanco-torre-1"] && tableroDigital["d1"] === null && tableroDigital["c1"] === null && tableroDigital["b1"] === null) movimientosDirectos.push([-2,0]);
        if(this.color === "negro" && !comprobacionesEnroque["negro-rey-1"] && !comprobacionesEnroque["negro-torre-1"] && tableroDigital["d8"] === null && tableroDigital["c8"] === null && tableroDigital["b8"] === null) movimientosDirectos.push([-2,0]);
        if(this.color === "negro" && !comprobacionesEnroque["negro-rey-1"] && !comprobacionesEnroque["negro-torre-2"] && tableroDigital["g8"] === null && tableroDigital["f8"] === null) movimientosDirectos.push([2,0]);
        return this.movimientosDirectos(movimientosDirectos, tableroDigital, this.casilla);
    }
}