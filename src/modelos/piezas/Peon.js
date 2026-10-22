import { letras, numeroCasilla, letraCasilla, numeroColumna, movimientos } from "../../utilidades.js";
import { Pieza } from "./pieza.js";
export class Peon extends Pieza {

    seHaMovido;

    constructor(id, color, casilla) {
        super(id, color, casilla);
        this.seHaMovido = false;
    }


    calcularMovimientos(tableroDigital) {
        let casilla = this.casilla;
        let piezaAgarrada = tableroDigital[casilla].id;
        let avance = 1;
        if(piezaAgarrada.split("-")[0] === "negro"){
            avance = -1;
        }
        let movimientosDirectos = [

        ]

        let color = piezaAgarrada[0];
        //Calcula si puede mover doble y la casilla donde puede haber una pieza ej: f4  f + 4-1  f3(Si hay una pieza no dejamos mover)
        if (this.seHaMovido === false && tableroDigital[casilla[0] + (parseInt(casilla[1]) + avance)] === null && tableroDigital[casilla[0] + (parseInt(casilla[1]) + 2 * avance)] === null) {
            movimientosDirectos.push([0, 2*avance]);
        }
        //Avanza hacia delante
        if (tableroDigital[casilla[0] + (parseInt(casilla[1]) + avance)] === null) {
            movimientosDirectos.push([0, avance]);
        }

        //Calcula la fila izquierda y derecha y comprueba que no se salga del tablero y de error (Al poner null tambien hace != undefinded, el !== no compara con undefined)
        if (tableroDigital[letras[(numeroColumna[casilla[0]] - 1 )] + (parseInt(casilla[1]) + avance)] != null) {
            //Comprueba que la casilla diagonal este ocupada por una pieza de distinto color
            if (tableroDigital[letras[numeroColumna[casilla[0]] + avance] + (parseInt(casilla[1]) + avance)].id[0] !== piezaAgarrada[0]) {
                movimientosDirectos.push([avance, avance]);
            }
        }
        

        let ultimoMovimiento = movimientos[movimientos.length - 1];
        console.log(piezaAgarrada)

        //Calcula que en el ultimo movimiento se moviese un peon de diferente color
        if (movimientos.length > 0 && ultimoMovimiento.pieza.split("-")[1] === "peon" && ultimoMovimiento.pieza.split("-")[0] !== piezaAgarrada.split("-")[0]) {
            //Comprueba que se mueva 2 casillas restando la posicion final e inicial del ultimo movimiento, tambien comprueba que el peon que quieres mover este a la misma altura que el peon que ha movido doble 
            if (Math.abs(ultimoMovimiento.casilla[1] - ultimoMovimiento.casillaDestino[1]) === 2 && casilla.id[1] === ultimoMovimiento.casillaDestino[1]) {
                //Guardo las columnas para simplificar
                let colActual = numeroColumna[casilla.id[0]];
                let colRival = numeroColumna[ultimoMovimiento.casillaDestino[0]];
                //Comprueba que este en una casilla de su lado y dependiendo del lado en el que este añade una diagonal o otra a las casillas permitidas
                if (colActual === colRival + 1) movimientosDirectos.push([-1, avance]);
                if (colActual === colRival - 1) movimientosDirectos.push([1, avance]);
            }
        } 
        //Casillas permitidas
        return this.movimientosDirectos(movimientosDirectos, casilla, tableroDigital);
    }
}