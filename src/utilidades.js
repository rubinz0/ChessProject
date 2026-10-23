export const letras = [null,"a","b", "c", "d", "e", "f", "g","h"];

export function numeroCasilla(pieza){
    return parseInt(pieza.casilla[1]);
}

export function letraCasilla(casilla){
    return casilla.id[0];
}

// export function numeroCasilla(casilla){
//     return parseInt(casilla.id[1]);
// }

// export function letraCasilla(casilla){
//     return casilla.id[0];
// }


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

export function juntarListas(lista1, lista2){
    lista1.forEach(element => {
        lista2.forEach(element2 => {
            if(element === element2) lista1.push(element2);
        });
        
    });
    return lista1;
}