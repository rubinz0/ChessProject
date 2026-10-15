import { Pieza } from "./pieza.js";
export class Peon extends Pieza {
    movDoble;
    constructor(id, color, casilla) {
        super(id, color, casilla);
    }
    calcularMovimientos(tableroDigital) {
        let avance = 1;
        if(pieza[0] === "negro"){
            avance = -1;
        }
        let color = pieza[0];
        //Calcula si puede mover doble y la casilla donde puede haber una pieza ej: f4  f + 4-1  f3(Si hay una pieza no dejamos mover)
        if ((numeroCasillaInicio === 2 || numeroCasillaInicio === 7) && tableroDigital[letraCasillaInicio + (numeroCasillaInicio + avance)] === "null" && tableroDigital[letraCasillaInicio + (numeroCasillaInicio + 2 * avance)] === "null") {
            movimientosDirectos.push([0, 2*avance]);
        }
        //Avanza hacia delante
        if (tableroDigital[letraCasillaInicio + (numeroCasillaInicio + avance)] === "null") {
            movimientosDirectos.push([0, avance]);
        }
        //Calcula la fila izquierda y derecha y calcula si hay una fila a la derecha o la izquierda para que no se salga del tablero y de error
        if (!(letraCasillaInicio === "h") && !(tableroDigital[letras[numeroColumna[letraCasillaInicio] + 1] + (numeroCasillaInicio + avance)] === "null")) {
            if (tableroDigital[letras[numeroColumna[letraCasillaInicio] + 1] + (numeroCasillaInicio + avance)][0] !== pieza[0]) {
                movimientosDirectos.push([1, avance]);
            }
        }
        if (!(letraCasillaInicio === "a") && !(tableroDigital[letras[numeroColumna[letraCasillaInicio] - 1] + (numeroCasillaInicio + avance)] === "null")) {
            if (tableroDigital[letras[numeroColumna[letraCasillaInicio] - 1] + (numeroCasillaInicio + avance)][0] !== pieza[0]) {
                movimientosDirectos.push([-1, avance]);
            }
        }
        let ultimoMovimiento = movimientos[movimientos.length - 1];
        //Calcula que en el ultimo movimiento se moviese un peon de diferente color
        if (movimientos.length > 0 && ultimoMovimiento.pieza.split("-")[1] === "peon" && ultimoMovimiento.pieza.split("-")[0] !== piezaAgarrada.id.split("-")[0]) {
            //Comprueba que se mueva 2 casillas restando la posicion final e inicial del ultimo movimiento, tambien comprueba que el peon que quieres mover este a la misma altura que el peon que ha movido doble 
            if (Math.abs(ultimoMovimiento.casillaInicio[1] - ultimoMovimiento.casillaDestino[1]) === 2 && casillaInicio.id[1] === ultimoMovimiento.casillaDestino[1]) {
                //Guardo las columnas para simplificar
                let colActual = numeroColumna[casillaInicio.id[0]];
                let colRival = numeroColumna[ultimoMovimiento.casillaDestino[0]];
                //Comprueba que este en una casilla de su lado y dependiendo del lado en el que este añade una diagonal o otra a las casillas permitidas
                if (colActual === colRival + 1) movimientosDirectos.push([-1, avance]);
                if (colActual === colRival - 1) movimientosDirectos.push([1, avance]);
            }
        } 
    }
}