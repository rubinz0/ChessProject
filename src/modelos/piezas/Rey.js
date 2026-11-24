import { Pieza } from "./Pieza.js";

export class Rey extends Pieza {
    constructor(id, color, casilla, img) {
        super(id, color, casilla, img);
    }

    calcularMovimientos(tableroDigital, comprobacionesEnroque) {
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
        //Comprueba que el rey este en su posicion original
        const casillaInicialRey = this.color === "blanco" ? "e1" : "e8";
        if(this.casilla === casillaInicialRey){
            //Comprueba si el rey se ha movido y si ha movido su torre si no, añade el enroque de ese lado como movimiento, 
            // ademas de comprobar que las casillas intermedias esten vacias
            if(this.color === "blanco" && !comprobacionesEnroque["blanco-rey-1"] && !comprobacionesEnroque["blanco-torre-2"] && tableroDigital["g1"] === null && tableroDigital["f1"] === null && tableroDigital["h1"] !== null && tableroDigital["h1"].id === "blanco-torre-2") movimientosDirectos.push([2,0]);
            if(this.color === "blanco" && !comprobacionesEnroque["blanco-rey-1"] && !comprobacionesEnroque["blanco-torre-1"] && tableroDigital["d1"] === null && tableroDigital["c1"] === null && tableroDigital["b1"] === null && tableroDigital["a1"] !== null && tableroDigital["a1"].id === "blanco-torre-1") movimientosDirectos.push([-2,0]);
            if(this.color === "negro" && !comprobacionesEnroque["negro-rey-1"] && !comprobacionesEnroque["negro-torre-1"] && tableroDigital["d8"] === null && tableroDigital["c8"] === null && tableroDigital["b8"] === null && tableroDigital["a8"] !== null && tableroDigital["a8"].id === "negro-torre-1") movimientosDirectos.push([-2,0]);
            if(this.color === "negro" && !comprobacionesEnroque["negro-rey-1"] && !comprobacionesEnroque["negro-torre-2"] && tableroDigital["g8"] === null && tableroDigital["f8"] === null && tableroDigital["h8"] !== null && tableroDigital["h8"].id === "negro-torre-2") movimientosDirectos.push([2,0]);
        }

        return this.movimientosDirectos(movimientosDirectos, tableroDigital, this.casilla);
    }
}