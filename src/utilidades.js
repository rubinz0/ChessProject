export const letras = [null,"a","b", "c", "d", "e", "f", "g","h"];

export function numeroCasilla(casilla){
    return parseInt(casilla.id[1]);
}

export function letraCasilla(casilla){
    return casilla.id[0];
}

export const numeroColumna = {
    a : 1,
    b : 2,
    c : 3,
    d : 4,
    e : 5,
    f : 6,
    g : 7,
    h : 8
}

export let movimientos = [];

export let casillasPermitidas = [];