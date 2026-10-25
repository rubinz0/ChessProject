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

    set Casilla(casilla) {
        this.casilla = casilla;
    }

    get Casilla() {
        return casilla;
    }

    calcularMovimientos(tableroDigital) {
        console.log("Este método no se usa desde Pieza. Se tiene que implementar en la pieza correspondiente")
    }

    movimientosDeslizantes(movimientos, tableroDigital) {
        let casillasPermitidas = [];
        let piezaAgarrada = tableroDigital[this.casilla];
        movimientos.forEach(movimiento => {
            //Mide hasta que distancia calcula en esa direccion
            let distancia = 1;
            while (distancia < 8) {
                let columna = letras[letras.indexOf(this.casilla[0]) - movimiento[0] * distancia];
                let fila = parseInt(this.casilla[1]) + movimiento[1] * distancia;

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
        let pieza = tableroDigital[casilla];
        let casillasPermitidas = [];
        movimientosDirectos.forEach(movimiento => {
            let columna = letras[letras.indexOf(casilla[0]) + movimiento[0]];
            let fila = parseInt(casilla[1]) + movimiento[1];
            if(tableroDigital[columna+fila] === null){
                casillasPermitidas.push(columna+fila);
            }
            //Calcula si es una casilla ocupada, dentro del tablero y de una pieza rival
            if(tableroDigital[columna+fila] != null && tableroDigital[columna+fila] != undefined && tableroDigital[columna+fila].id.split("-")[0] != pieza.id.split("-")[0]){
                casillasPermitidas.push(columna+fila);
            }
        });
        return casillasPermitidas;
    }

}