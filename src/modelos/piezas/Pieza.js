import { letras, numeroCasilla, letraCasilla } from "../../utilidades.js";
// import * as Util from './utilidades.js';   Para cuando sean muchas constantes
//import { COORDENADAS, DIRECCIONES } from './utilidades.js'; Agruparlas por tematica
export class Pieza {
    id;
    img;
    color;
    casilla;
    seHaMovido = false;
    constructor(id, color, casilla) {
        this.id = id;
        this.color = color;     
        this.casilla = casilla; 
    }

    calcularMovimientos(tableroDigital) {
        console.log("Este método no se usa desde Pieza. Se tiene que implementar en la pieza correspondiente")
    }

    movimientosDeslizantes(movimientos, tableroDigital, casilla) {
        let movimientosPermitidos = [];
        let pieza = tableroDigital[casilla];
        movimientos.forEach(movimiento => {
            //Mide hasta que distancia calcula en esa direccion
            let distancia = 1;
            while (distancia < 8) {
                let movimientoPermitido = {}
                let columna = letras[letras.indexOf(casilla[0]) - movimiento[0] * distancia];
                let fila = parseInt(casilla[1]) + movimiento[1] * distancia;

                movimientoPermitido.casillaInicio = casilla;
                movimientoPermitido.casillaDestino = columna+fila;
                movimientoPermitido.pieza = pieza;
                movimientoPermitido.tipo = "normal";
                if (tableroDigital[columna + fila] === null) {
                    movimientoPermitido.captura = false;
                    movimientosPermitidos.push(movimientoPermitido);
                    // casillasPermitidas.push(columna + fila);
                }
                
                if (tableroDigital[columna + fila] != null && tableroDigital[columna + fila] != undefined && pieza.color != pieza.color) {
                    movimientoPermitido.captura = true;
                    movimientoPermitido.casillaCaptura = columna + fila;
                    movimientoPermitido.piezaCapturada = tableroDigital[columna+fila];
                    // casillasPermitidas.push(columna + fila);
                    movimientosPermitidos.push(movimientoPermitido);
                    break
                }
                //Si no esta vacia y no hay un enemigo esque hay un aliado
                if (tableroDigital[columna + fila] != null && tableroDigital[columna + fila] != undefined && tableroDigital[columna + fila].id[0] == pieza.id[0]) {
                    break
                }
                distancia++;
            }

        });
        return movimientosPermitidos;
    }

    movimientosDirectos(movimientosDirectos, casilla, tableroDigital){
        let movimientosPermitidos = [];
        let pieza = tableroDigital[casilla];
        let casillasPermitidas = [];
        movimientosDirectos.forEach(movimiento => {
            let movimientoPermitido = {}
            let columna = letras[letras.indexOf(casilla[0]) + movimiento[0]];
            let fila = parseInt(casilla[1]) + movimiento[1];
            movimientoPermitido.casillaInicio = casilla;
            movimientoPermitido.casillaDestino = columna+fila;
            movimientoPermitido.pieza = pieza;
            if(tableroDigital[columna+fila] === null){
                //Si un peon se mueve a una casilla nula y avanza hacia un lado es captura al paso
                if(pieza.id.split("-")[1] === "peon" && Math.abs(movimiento[0]) === 1) {
                    movimientoPermitido.tipo = "captura-paso";
                    movimientoPermitido.captura = true;
                    movimientoPermitido.casillaCaptura = columna + casilla[1];
                    movimientoPermitido.piezaCapturada = tableroDigital[columna+casilla[1]];
                }else{
                    movimientoPermitido.tipo = "normal";
                    movimientoPermitido.captura = false;
                }
                movimientosPermitidos.push(movimientoPermitido);
                // casillasPermitidas.push(columna+fila);
            }
            //Calcula si es una casilla ocupada, dentro del tablero y de una pieza rival
            if(tableroDigital[columna+fila] != null && tableroDigital[columna+fila] != undefined && tableroDigital[columna+fila].id.split("-")[0] != pieza.id.split("-")[0]){
                movimientoPermitido.tipo = "normal";
                movimientoPermitido.captura = true;
                movimientoPermitido.casillaCaptura = columna + fila;
                movimientoPermitido.piezaCapturada = tableroDigital[columna+fila];
                movimientosPermitidos.push(movimientoPermitido);
                // casillasPermitidas.push(columna+fila);
            }
        });
        return movimientosPermitidos;
    }

}