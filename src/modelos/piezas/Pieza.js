import { letras, numeroCasilla, letraCasilla } from "../../utilidades.js";
// import * as Util from './utilidades.js';   Para cuando sean muchas constantes
//import { COORDENADAS, DIRECCIONES } from './utilidades.js'; Agruparlas por tematica
export class Pieza {
    id;
    img;
    color;
    casilla;
    seHaMovido = false;
    constructor(id, color, casilla, img) {
        this.id = id;
        this.color = color;     
        this.casilla = casilla; 
        this.img = img;
    }

    calcularMovimientos(tableroDigital) {
        console.log("Este método no se usa desde Pieza. Se tiene que implementar en la pieza correspondiente")
    }

    movimientosDeslizantes(movimientosDeslizantes, tableroDigital, casilla) {
        //Guarda los objetos movimiento
        let movimientosPermitidos = [];
        let pieza = tableroDigital[casilla];
        movimientosDeslizantes.forEach(movimiento => {
            //Mide hasta que distancia calcula en esa direccion
            let distancia = 1;
            
            while (distancia < 8) {
                let movimientoPermitido = {}
                let columna = letras[letras.indexOf(casilla[0]) - movimiento[0] * distancia];
                let fila = parseInt(casilla[1]) + movimiento[1] * distancia;

                //Asigna los valores de los atributos de movimientos permitido 
                movimientoPermitido.casillaInicio = casilla;
                movimientoPermitido.casillaDestino = columna+fila;
                movimientoPermitido.pieza = pieza;
                movimientoPermitido.tipo = "normal";

                //Si no hay pieza en la casillaDestino asigna false a captura
                if (tableroDigital[columna + fila] === null) {
                    movimientoPermitido.captura = false;
                    movimientosPermitidos.push(movimientoPermitido);
                }
                //Si hay una pieza y no es del mismo color que la pieza, asigna la captura, su casilla, su pieza y añade el movimiento
                if (tableroDigital[columna + fila] != null && tableroDigital[columna + fila].color !== pieza.color) {
                    movimientoPermitido.captura = true;
                    movimientoPermitido.casillaCaptura = columna + fila;
                    movimientoPermitido.piezaCapturada = tableroDigital[columna+fila];

                    movimientosPermitidos.push(movimientoPermitido);
                    break
                }
                //Si no esta vacia y no hay un enemigo esque hay un aliado
                if (tableroDigital[columna + fila] != null && tableroDigital[columna + fila].color === pieza.color) {
                    break
                }
                distancia++;
            }

        });
        return movimientosPermitidos;
    }

    movimientosDirectos(movimientosDirectos, tableroDigital, casilla){
        //Guarda los objetos movimiento
        let movimientosPermitidos = [];
        let pieza = tableroDigital[casilla];
        movimientosDirectos.forEach(movimiento => {
            let movimientoPermitido = {}
            let columna = letras[letras.indexOf(casilla[0]) + movimiento[0]];
            let fila = parseInt(casilla[1]) + movimiento[1];

            //Asigna los valores de los atributos de movimientos permitido 
            movimientoPermitido.casillaInicio = casilla;
            movimientoPermitido.casillaDestino = columna+fila;
            movimientoPermitido.pieza = pieza;

            //Si no hay pieza en la casillaDestino asigna false a captura
            if(tableroDigital[columna+fila] === null){
                //Si es peon se separa porque tiene captura al paso
                if(pieza.id.split("-")[1] === "peon"){
                    //Si un peon se mueve a una casilla nula y avanza hacia un lado es captura al paso
                    if(Math.abs(movimiento[0]) === 1) {
                        movimientoPermitido.tipo = "captura-paso";
                        movimientoPermitido.captura = true;
                        movimientoPermitido.casillaCaptura = columna + casilla[1];
                        movimientoPermitido.piezaCapturada = tableroDigital[columna+casilla[1]];
                    }else{
                        movimientoPermitido.tipo = "normal";
                        movimientoPermitido.captura = false;
                    }
                }else{
                    movimientoPermitido.tipo = "normal";
                    movimientoPermitido.captura = false;
                }
                movimientosPermitidos.push(movimientoPermitido);
            }
            //Si hay una pieza y no es del mismo color que la pieza, asigna la captura, su casilla, su pieza y añade el movimiento
            if(tableroDigital[columna+fila] != null && tableroDigital[columna+fila].color !== pieza.color){
                movimientoPermitido.tipo = "normal";
                movimientoPermitido.captura = true;
                movimientoPermitido.casillaCaptura = columna + fila;
                movimientoPermitido.piezaCapturada = tableroDigital[columna+fila];
                
                movimientosPermitidos.push(movimientoPermitido);
            }
        });
        return movimientosPermitidos;
    }

}