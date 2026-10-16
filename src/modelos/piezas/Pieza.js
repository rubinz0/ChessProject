import { letras, numeroCasilla, letraCasilla } from "../../utilidades.js";
// import * as Util from './utilidades.js';   Para cuando sean muchas constantes
//import { COORDENADAS, DIRECCIONES } from './utilidades.js'; Agruparlas por tematica
export class Pieza {
    id;
    img;
    color;
    casilla;
    constructor(id, color, casilla) {
        this.id = id;
        this.color = color;     
        this.casilla = casilla; 
    }

    calcularMovimientos(tableroDigital, casillaInicio) {
        console.log("Este método no se usa desde Pieza. Se tiene que implementar en la pieza correspondiente")
    }

    movimientosDeslizantes(movimientos, casillaInicio, tableroDigital) {
        let casillasPermitidas = [];
        let piezaAgarrada = tableroDigital[casillaInicio.id];
        console.log(piezaAgarrada)
        movimientos.forEach(movimiento => {
            //Mide hasta que distancia calcula en esa direccion
            let distancia = 1;
            while (distancia < 8) {
                let columna = letras[letras.indexOf(letraCasilla(casillaInicio)) - movimiento[0] * distancia];
                let fila = numeroCasilla(casillaInicio) + movimiento[1] * distancia;

                if (tableroDigital[columna + fila] === null) {
                    casillasPermitidas.push(columna + fila);
                }
                
                if (tableroDigital[columna + fila] != null && tableroDigital[columna + fila] != undefined && piezaAgarrada.id[0] != piezaAgarrada.id[0]) {
                    casillasPermitidas.push(columna + fila);
                    break
                }
                //Si no esta vacia y no hay un enemigo esque hay un aliado
                if (tableroDigital[columna + fila] != null && tableroDigital[columna + fila] != undefined && tableroDigital[columna + fila].id[0] == piezaAgarrada.id[0]) {
                    break
                }
                distancia++;
            }

        });
        return casillasPermitidas;
    }

    movimientosDirectos(movimientosDirectos, casilla, tableroDigital){
        let casillasPermitidas = [];
        movimientosDirectos.forEach(movimiento => {
            let columna = letras[letras.indexOf(letraCasilla(casilla)) + movimiento[0]];
            let fila = numeroCasilla(casilla) + movimiento[1];
            if(tableroDigital[columna+fila] === null){
                casillasPermitidas.push(columna+fila);
            }
            //Calcula si es una casilla ocupada, dentro del tablero y de una pieza rival
            if(tableroDigital[columna+fila] != null && tableroDigital[columna+fila] != undefined && tableroDigital[columna+fila].id.split("-")[0] != piezaAgarrada.id.split("-")[0]){
                casillasPermitidas.push(columna+fila);
            }
        });
        return casillasPermitidas;
    }

}