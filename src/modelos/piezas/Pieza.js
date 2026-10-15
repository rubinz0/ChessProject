import { Utilidades } from "../../utilidades.js";
export class Pieza {
    id;
    img;
    color;
    casilla;
    Utilidades = new Utilidades();
    constructor(id, color, casilla) {
        this.id = id;
        this.color = color;     
        this.casilla = casilla; 
    }

    calcularMovimientos(tableroDigital, casillaInicio) {
        console.log("Este método no se usa desde Pieza. Se tiene que implementar en la pieza correspondiente")
    }

    movimientosDeslizantes(movimientos, casillaInicio, tableroDigital) {
        movimientos.forEach(movimiento => {
            const letraCasillaInicio = casillaInicio.id[0];
            const numeroCasillaInicio = parseInt(casillaInicio.id[1]);

            //Mide hasta que distancia calcula en esa direccion
            let distancia = 1;
            while (distancia < 8) {
                let columna = Utilidades.letras[Utilidades.letras.indexOf(letraCasillaInicio) - movimiento[0] * distancia];
                let fila = numeroCasillaInicio + movimiento[1] * distancia;

                if (tableroDigital[columna + fila] === "null") {
                    casillasPermitidas.push(columna + fila);
                }

                if (tableroDigital[columna + fila] != "null" && tableroDigital[columna + fila] != undefined && tableroDigital[columna + fila].split("-")[0] != piezaAgarrada.id.split("-")[0]) {
                    casillasPermitidas.push(columna + fila);
                    break
                }
                //Si no esta vacia y no hay un enemigo esque hay un aliado
                if (tableroDigital[columna + fila] != "null" && tableroDigital[columna + fila] != undefined && tableroDigital[columna + fila].split("-")[0] == piezaAgarrada.id.split("-")[0]) {
                    break
                }
                distancia++;
            }

        });
    }

    movimientosDirectos(){

    }

}