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

export let comprobacionesEnroque = {
    "blanco-rey":false,
    "blanco-torre-1":false,
    "blanco-torre-2":false,
    "negro-rey":false,
    "negro-torre-1":false,
    "negro-torre-2":false
}

export let contadorPiezas = {
        blanco: { peon: 0, torre: 0, caballo: 0, alfil: 0, dama: 0, rey: 0 },
        negro:  { peon: 0, torre: 0, caballo: 0, alfil: 0, dama: 0, rey: 0 }
}


export function generarCoordenadas() {
        const columnas = ["a", "b", "c", "d", "e", "f", "g", "h"];
        const coordenadas = [];
        for (let fila = 8; fila >= 1; fila--) {
            for (const columna of columnas) {
                coordenadas.push(columna + fila);
            }
        }
        return coordenadas;
    }