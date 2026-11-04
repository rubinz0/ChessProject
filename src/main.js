import { Caballo } from './modelos/piezas/Caballo.js';
import { Torre } from './modelos/piezas/Torre.js';
import { Peon } from './modelos/piezas/Peon.js';
import { Alfil } from './modelos/piezas/Alfil.js';
import { Dama } from './modelos/piezas/Dama.js';
import { Rey } from './modelos/piezas/Rey.js';

import { letras, numeroColumna, movimientos, comprobacionesEnroque } from "./utilidades.js";
import { Pieza } from './modelos/piezas/Pieza.js';
const tablero = document.getElementById("tablero");
const PGN = [];
const coordenadasArray = ["a8","b8","c8","d8","e8","f8","g8","h8","a7","b7","c7","d7","e7","f7","g7","h7","a6","b6","c6","d6","e6","f6","g6","h6","a5","b5","c5","d5","e5","f5","g5","h5","a4","b4","c4","d4","e4","f4","g4","h4","a3","b3","c3","d3","e3","f3","g3","h3","a2","b2","c2","d2","e2","f2","g2","h2","a1","b1","c1","d1","e1","f1","g1","h1"];


//Diccionario donde guardo la posicion actual del tablero (FEN)
let tableroDigital = {}
function generarTablero(){
    //Crear filas
    let posicionCoordenada = 0;
    for(let i = 0; i < 8; i++){
        const fila = document.createElement("div");
        fila.style.display = "flex";
        fila.className = "fila";
        const id = i + 1;
        fila.id = "fila" + id;
        tablero.appendChild(fila)
        
        //añadir casillas a las filas
        for(let j = 0; j < 8; j++){
            //Crear coordenadas número
            if(j == 0){
                const casillaCoordenada = document.createElement("div");
                casillaCoordenada.className = "casillaCoord";
                casillaCoordenada.style.display = "flex-start";
                const numero = ((i + 1) -9) * -1;
                casillaCoordenada.textContent = numero;
                fila.appendChild(casillaCoordenada);
            }
            const casilla = document.createElement("div");
            casilla.className = "casilla";
            casilla.id = coordenadasArray[posicionCoordenada];

            //Asignar color de las piezas dependiendo de si son pares o no 
            if((i + j)% 2 == 0){
                casilla.style.backgroundColor = "#ffffff";
            }else{
                casilla.style.backgroundColor = "#69923e";
            }
            fila.appendChild(casilla);
            posicionCoordenada++;

            
        }
    }

    //Poner coordenadas
    const fila = document.createElement("div");
    fila.style.display = "flex";
    fila.className = "fila";
    tablero.appendChild(fila)
    const coordenadas = ["","a","b","c","d","e","f","g","h"];
    for(let i = 0; i < 9; i++){
        const casilla = document.createElement("div");
        casilla.className = "casillaCoord";
        casilla.textContent = coordenadas[i];
        fila.appendChild(casilla);
    }
}

generarTablero();

function colocarPiezas(){
    let id = 0;
    const idPiezas = ["negro-torre-1","negro-caballo-1","negro-alfil-1","negro-dama","negro-rey","negro-alfil-2","negro-caballo-2","negro-torre-2",
        "negro-peon-1","negro-peon-2","negro-peon-3","negro-peon-4","negro-peon-5","negro-peon-6","negro-peon-7","negro-peon-8","blanco-peon-1",
        "blanco-peon-2","blanco-peon-3","blanco-peon-4","blanco-peon-5","blanco-peon-6","blanco-peon-7","blanco-peon-8","blanco-torre-1",
        "blanco-caballo-1","blanco-alfil-1","blanco-dama","blanco-rey","blanco-alfil-2","blanco-caballo-2","blanco-torre-2",
        ];
    const casillas = document.querySelectorAll(".casilla");
    for(let i = 0; i < 64; i++){
        let nombrePieza = "none";
        let color;
        let pieza;
        //Casillas negras
        if(i < 16){
            color = "negro";
        }else{
            color = "blanco";
        }
        if(i > 7 && i < 16){
            nombrePieza = "peonNegro";
            pieza = new Peon(idPiezas[id], color, coordenadasArray[i]);
        }
        if(i == 0 | i == 7){
            nombrePieza = "torreNegra";
            pieza = new Torre(idPiezas[id], color, coordenadasArray[i]);
        }
        if(i == 1 | i == 6){
            nombrePieza = "caballoNegro";
            pieza = new Caballo(idPiezas[id], color, coordenadasArray[i]);
        }
        if(i == 2 | i == 5){
            nombrePieza = "alfilNegro";
            pieza = new Alfil(idPiezas[id], color, coordenadasArray[i]);
        }
        if(i == 3){
            nombrePieza = "damaNegra";
            pieza = new Dama(idPiezas[id], color, coordenadasArray[i]);
        }
        if(i == 4){
            nombrePieza = "reyNegro";
            pieza = new Rey(idPiezas[id], color, coordenadasArray[i]);
        }

        //Casillas blancas
        if(i > 47 && i < 56){
            nombrePieza = "peonBlanco";
            pieza = new Peon(idPiezas[id], color, coordenadasArray[i]);
        }
        if(i == 56 | i == 63){
            nombrePieza = "torreBlanca";
            pieza = new Torre(idPiezas[id], color, coordenadasArray[i]);
        }
        if(i == 57 | i == 62){
            nombrePieza = "caballoBlanco";
            pieza = new Caballo(idPiezas[id], color, coordenadasArray[i]);
        }
        if(i == 58 | i == 61){
            nombrePieza = "alfilBlanco";
            pieza = new Alfil(idPiezas[id], color, coordenadasArray[i]);
        }
        if(i == 59){
            nombrePieza = "damaBlanca";
            pieza = new Dama(idPiezas[id], color, coordenadasArray[i]);
        }
        if(i == 60){
            nombrePieza = "reyBlanco";
            pieza = new Rey(idPiezas[id], color, coordenadasArray[i]);
        }
        if(pieza != undefined) pieza.img = "/img/piezas/" + nombrePieza + ".webp";
        //Colocar la imagen en la casilla seleccionada
        if(!(nombrePieza == "none")){
            tableroDigital[coordenadasArray[i]] = pieza;
            const piezaHTML = document.createElement("img");
            const src = pieza.img;
            piezaHTML.src = src;
            piezaHTML.alt = nombrePieza;
            piezaHTML.className = "pieza";
            piezaHTML.id = pieza.id;
            id++;

            //Desactiva la img de arrastrar
            piezaHTML.draggable = "false";
            piezaHTML.addEventListener("mousedown", clicarPieza);
            casillas[i].appendChild(piezaHTML);



        }else{
            // Colocar null en casillas tablero digital (Diccionario)
            tableroDigital[coordenadasArray[i]] = null;
        }
        
    }

}

colocarPiezas();


//Variables de pieza, para pasarlas entre mouseDown y mouseMove es decir que cuando mueva la pieza la funcion de clicar pieza 
// no desaparezca los datos si no que los pase a una variable local
let agarreX = 0;
let agarreY = 0;
let piezaAgarrada = null;



function clicarPieza(evento){
    let movimientosPermitidos = [];
    //Esto desactiva el comportamiento por defecto que deja arrastrar imagenes
    evento.preventDefault();
    piezaAgarrada = evento.target;
    //Pongo la pieza en la capa mas alta 
    piezaAgarrada.style.position = "absolute";
    piezaAgarrada.style.zIndex = "100";
    //Restamos la posicion del raton menos la esquina de la img para no solo anclarla al raton sino anclarla 
    // con el mismo margen sin que haya un salto hay que añadirle el scroll de la pantalla ya que mide cuanta distancia
    //hay desde el principio del documento
    agarreX = evento.clientX - piezaAgarrada.getBoundingClientRect().left;
    agarreY = evento.clientY - piezaAgarrada.getBoundingClientRect().top - window.scrollY;
    let casillaInicio = evento.target.parentElement;
    let pieza = tableroDigital[casillaInicio.id];


    // Calcula los movimientos permitidos (Segun reglas de la pieza seleccionada)
    movimientosPermitidos.push(...calcularMovimientos(pieza));
    // Comprueba que el movimiento sea valido (Si esta en el tablero, no hay una pieza aliada etc..)
    movimientosPermitidos.splice(0, movimientosPermitidos.length, ...simularMovimiento(pieza, movimientosPermitidos));

    

    //Recoge todas las casillas del tablero
    let casillasHTML = tablero.querySelectorAll(".casilla");

    //Recorre las casillas del tablero y si esta en la lista de movimientosPermitidos las añade la clase permitida
    for(let i = 0; i < casillasHTML.length; i++){
        for(let j = 0; j < movimientosPermitidos.length; j++){
            if(casillasHTML[i].id === movimientosPermitidos[j].casillaDestino){
                casillasHTML[i].classList.add("casillaPermitida");
                j = movimientosPermitidos.length;
            }
        }
    }
}

//La añadimos al documento porque si se añade a pieza y muevo el raton muy rapido la puede perder
document.addEventListener("mousemove", moverPieza);
function moverPieza(evento){
    //Si agarra una pieza la fija a la posicion del raton (Si la agarras por la esquina mantiene la diferencia con el centro)
    if(piezaAgarrada === null){
        return
    }if(!(piezaAgarrada === null)){
        const posX = evento.clientX - agarreX;
        const posY = evento.clientY - agarreY;
        piezaAgarrada.style.left = posX + "px";
        piezaAgarrada.style.top = posY + "px";
    }

}


document.addEventListener("mouseup", soltarClick);
function soltarClick(evento){
    let casillaInicio = evento.target.parentElement;
    let pieza = tableroDigital[casillaInicio.id];

    let casillaDestino;
    if(piezaAgarrada === null){
        return;
    }if(!(piezaAgarrada === null)){
        //Con esto hacemos que se suelte la pieza y reseteamos sus valores para que no pase por encima de otras y este en la misma capa que la casilla        piezaAgarrada.style.position = "";
        piezaAgarrada.style.zIndex = "";
        piezaAgarrada.style.left = "";
        piezaAgarrada.style.top = "";
        //Oculta la pieza para poder lanzar el "rayo" que impacta contra la casilla de debajo
        piezaAgarrada.style.visibility = "hidden"
        //Lannzo el "rayo"
        let piezaComida;
        casillaDestino = document.elementFromPoint(evento.clientX,evento.clientY);
        //Si detecta una pieza en vez de una casilla la marca como pieza comida
        if(casillaDestino.className == "pieza"){
            casillaDestino = casillaDestino.parentElement;
            piezaComida = casillaDestino.querySelector(".pieza");
        }
        
        let casillaInicio = piezaAgarrada.closest(".casilla");
        // Calcula los movimientos permitidos (Segun reglas de la pieza seleccionada)
        let movimientosPermitidos = calcularMovimientos(pieza);
        // Comprueba que el movimiento sea valido (Si esta en el tablero, no hay una pieza aliada etc..)
        movimientosPermitidos.splice(0, movimientosPermitidos.length, ...simularMovimiento(pieza, movimientosPermitidos));
        
        //Recorre los movimientos permitidos y validados
        movimientosPermitidos.forEach(movimientoPermitido => {
            //Si la casilla donde sueltas la pieza esta como casilla destino de algun movimiento ejecuta el movimiento
            if(casillaDestino.id === movimientoPermitido.casillaDestino){
                let enroque = false;
                //AL CAMBIAR CASILLA POR INSTANCIA NO HACE FALTA CASILLA COMER DIRECTAMENTE SE PONE LA CASILLA SIN #
                //
                //-------------------------------
                let casillaComer = "#"+movimientoPermitido.casillaCaptura;
                //Si el movimiento indica captura eliminamos la pieza del HTML
                if(movimientoPermitido.captura) document.querySelector(casillaComer).querySelector(".pieza").remove();

                //Comprueba que sea un enroque (calcula que un rey se mueva dos casillas en horizontal)
                if(movimientoPermitido.pieza instanceof Rey && Math.abs(letras.indexOf(movimientoPermitido.casillaInicio[0]) - letras.indexOf(movimientoPermitido.casillaDestino[0])) === 2){
                    let fila = movimientoPermitido.casillaDestino[1];
                    //Si el rey acaba en la fila g es enroque corto
                    if (movimientoPermitido.casillaDestino[0] === "g") {
                        //Busca la casilla f1 o f8 dependiendo y inserta la torre correspondiente
                        tablero.querySelector("#f" + fila).appendChild(tablero.querySelector("#"+tableroDigital["h" + fila].id));

                        //Actualiza tablero en memoria con la jugada actual
                        //Cambia la torre
                        tableroDigital["f" + fila] = tableroDigital["h" + fila];
                        //Vacia el sitio donde estaba la torre
                        tableroDigital["h" + fila] = null;
                        //Cambia la casilla dentro de la instancia de torre
                        tableroDigital["f" + fila].casilla = "f" + fila;
                        //Cambia el tipo de movimiento
                        movimientoPermitido.tipo = "enroque-corto";

                    }
                    //Si el rey acaba en la fila c es enroque largo
                    if (movimientoPermitido.casillaDestino[0] === "c") {
                        //Busca la casilla f1 o f8 dependiendo y inserta la torre correspondiente
                        tablero.querySelector("#d" + fila).appendChild(tablero.querySelector("#" + tableroDigital["a" + fila].id));
                        //Actualiza tablero en memoria con la jugada actual
                        //Cambia la torre
                        tableroDigital["d" + fila] = tableroDigital["a" + fila];
                        //Vacia el sitio donde estaba la torre
                        tableroDigital["a" + fila] = null;
                        //Cambia la casilla dentro de la instancia de torre
                        tableroDigital["d" + fila].casilla = "d" + fila;
                        //Cambia el tipo de movimiento
                        movimientoPermitido.tipo = "enroque-largo";
                    }
                } 
                //Actualiza tablero en memoria con la jugada actual
                //Vacia la casilla de inicio
                tableroDigital[casillaInicio.id] = null;
                //Mueve la pieza a su casilla destino
                tableroDigital[casillaDestino.id] = pieza;
                //Actualiza la casilla dentro de la instancia de la pieza
                pieza.casilla = casillaDestino.id;
                //Si la pieza no se habia movido la marca como pieza movida
                if(!pieza.seHaMovido) pieza.seHaMovido = true;
                
                //Guardar el movimiento en memoria
                guardarMovimiento(movimientoPermitido);

                //Añade la piezaHTML a su casillaHTML
                casillaDestino.appendChild(piezaAgarrada);
            }
        });

        piezaAgarrada.style.visibility = "visible";
        piezaAgarrada = null;


        //Reseteamos estilo de las casillas a las que podemos mover
        let casillasPermitidasHTML = document.querySelectorAll(".casillaPermitida");
        casillasPermitidasHTML.forEach(casilla => {
            casilla.classList.remove("casillaPermitida");
        });
    }

}


function calcularMovimientos(pieza){
    console.log("Calcular movimientos");
    let movimientosPermitidos = [];
    movimientosPermitidos.push(...pieza.calcularMovimientos(tableroDigital));

    return movimientosPermitidos;
}

const contenedorPGN = document.getElementById("contenedorPGN");
//Funcion para generar el codigo PGN de la partida, cada vez que se mueve una pieza se añade el movimiento
function generarPGN(movimiento){
    //Con esto consigo cambiar las letras a ingles que es la notacion oficial sin tener que hacer bucles (tambien consigo vaciar la letra en caso de ser peon)
    const diccionario = {
        "P":"",
        "T":"R",
        "C":"N",
        "A":"B",
        "D":"Q",
        "R":"K"
    };
    let casilla = "";
    let pieza;
    //Compruebo si es un enroque corto o largo para cancelar la logica del PGN y poner 0-0 o 0-0-0
    if(!(movimiento.tipo.startsWith("enroque"))){
        pieza = diccionario[(movimiento.pieza.id.split("-")[1][0]).toUpperCase()];
        casilla = movimiento.casillaDestino; 
        if(movimiento.captura && !(pieza === "")) pieza += "x";
        //Si captura un peon añadimos su columna
        if(movimiento.captura && pieza === "") {
            pieza += movimiento.casillaInicio[0]+"x";
        }
    }else{
        if(movimiento.tipo === "enroque-corto"){
            pieza = "0-0";
        }else{
            pieza = "0-0-0";
        }
    }
    //Añade el movimiento al html
    contenedorPGN.textContent = contenedorPGN.textContent + pieza+casilla + " + ";
    
}

function guardarMovimiento(movimientoPermitido){
    //Volvemos a calcular movimientos posibles pero desde la casilla que aterriza simulando que en el siguiente turno podriamos comer el rey
    const posiblesJaques = calcularMovimientos(movimientoPermitido.pieza);
    let jaque = false;
    //Comprobamos que en esa casilla halla una pieza y que sea el rey
    posiblesJaques.forEach(movimiento => {
        if(tablero.querySelector("#"+movimiento.casillaDestino).querySelector(".pieza") != null && tablero.querySelector("#"+movimiento.casillaDestino).querySelector(".pieza").id.split("-")[1] === "rey") jaque = true;
    });
    //Si movemos algun rey o torre lo guardamos para saber si podemos enrocar
    if(movimientoPermitido.pieza.id === "blanco-rey") comprobacionesEnroque["blanco-rey"] = true;
    if(movimientoPermitido.pieza.id === "blanco-torre-1") comprobacionesEnroque["blanco-torre-1"] = true;
    if(movimientoPermitido.pieza.id === "blanco-torre-2") comprobacionesEnroque["blanco-torre-2"] = true;
    if(movimientoPermitido.pieza.id === "negro-rey") comprobacionesEnroque ["negro-rey"]= true;
    if(movimientoPermitido.pieza.id === "negro-torre-1") comprobacionesEnroque["negro-torre-1"] = true;
    if(movimientoPermitido.pieza.id === "negro-torre-2") comprobacionesEnroque["negro-torre-2"] = true;

    //Añade a movimiento el jaque y que piezas del enroque se han movido en ese instante 
    let movimiento = movimientoPermitido;
    movimiento.jaque = jaque;
    movimiento.fotografiaEnroque = {...comprobacionesEnroque}

    movimientos.push(movimiento);
    generarPGN(movimiento);
}



//Calcula que casillas pueden comer las piezas del color distinto al tuyo
function calcularCasillasAmenazadas(color){
    console.log("Calcular casillas amenazadas")

    //Reseteamos estilo de las casillas amenazadas
    let casillasPermitidasHTML = document.querySelectorAll(".casillaAmenazada");
    casillasPermitidasHTML.forEach(casilla => {
        casilla.classList.remove("casillaAmenazada");
    });

    let casillasAmenazadas = [];
    let casillasEliminar = [];
    
    //Recorre tablero digital obteniendo la casilla HTML y la instancia de la pieza
    for (const [casilla, pieza] of Object.entries(tableroDigital)) {
        
        //Comprueba que haya pieza y que la pieza sea de color contrario
        if(pieza !== null && pieza.color !== color){
            //Si hay pieza rival calcula sus movimientos (Si es un peon coge la diagonal porque devuelve movimientos hacia delante que no son amenazas)
            if(pieza.id.split("-")[1][0] === "p"){
                let fila = parseInt(casilla[1]);
                //Nos sirve para diferenciar entre peon negro y blanco ya que mueven hacia arriba o abajo (si es negro es que mueve el blanco +1)
                let direccion = -1;
                if(color === "negro") direccion = 1;
                //Calcula que la diagonal exista y no se salga del tablero
                if(tableroDigital[letras[numeroColumna[casilla[0]] - 1]+(fila+direccion)] !== undefined) casillasAmenazadas.push(letras[numeroColumna[casilla[0]] - 1]+(fila+direccion));
                if(tableroDigital[letras[numeroColumna[casilla[0]] + 1]+(fila+direccion)] !== undefined) casillasAmenazadas.push(letras[numeroColumna[casilla[0]] + 1]+(fila+direccion));
            }else{
                let movimientosPermitidos = calcularMovimientos(pieza, casilla)
                movimientosPermitidos.forEach(movimientoPermitido => {
                    if(tableroDigital[movimientoPermitido.casillaDestino] !== undefined) casillasAmenazadas.push(movimientoPermitido.casillaDestino);
                });
            }
            //Evita que si ninguna pieza amenaza haga un for each de casillas amenazadas = undefined
            if(casillasAmenazadas.length > 0){
                //Recorre las casillas donde puede mover el rival
                casillasAmenazadas.forEach(casillaAmenazada => {
                    //Evita meter una casilla varias veces si la atacan diferentes piezas
                    if(!(casillasEliminar.includes(casillaAmenazada))) casillasEliminar.push(casillaAmenazada);
                });

            }


        }
    }
    //Añade la clase amenazada para marcar las casillas amenazadas por el rival
    // for(let i = 0; i < casillasHTML.length; i++){
    //     for(let j = 0; j < casillasAmenazadas.length; j++){
    //         if(casillasHTML[i].id === casillasAmenazadas[j]){
    //             casillasHTML[i].classList.add("casillaAmenazada");
    //         }
    //     }
    // }    
    return casillasEliminar;
}

//Simula el movimiento de la pieza para comprobar si deja al rey en jaque
function simularMovimiento(pieza, casillasPermitidas){
    console.log("Simular movimiento")
    let casillasEliminar = [];

    //Recorre casillas permitidas
    casillasPermitidas.forEach(casillaPermitida => {
        //Excepcion del rey ya que hay que comprobar que si se enroca no pase por una casilla amenazada
        let jaque = avanzarPieza(pieza, casillaPermitida.casillaDestino);
        //Si hay jaque en esa jugada y no esta añadida a casillas eliminar la añade para eliminarla como casilla posible
        if(jaque && !(casillasEliminar.includes(casillaPermitida))) casillasEliminar.push(casillaPermitida);
    });

    //Filtra las casillas permitidas para quitar las que coinciden con casillaEliminar
    let casillasPermitidasFiltradas = casillasPermitidas.filter(casillaPermitida => !(casillasEliminar.includes(casillaPermitida)));
    //Vacia las casillas permitidas
    casillasPermitidas.splice(0, casillasPermitidas.length);
    //Añade las casillasFiltradas (sin jaques)
    casillasPermitidas.push(...casillasPermitidasFiltradas);

    return casillasPermitidas;
}

//Sirve para comprobar que no halla un jaque al terminar una jugada ya que seria dejar al rey en jaque y mover o mover un rey a una casilla en jaque
function avanzarPieza(pieza, casillaPermitida){
    let jaque = false;
    //Guarda la pieza que hay en la casilla a la que nos movemos
    let piezaAnterior = tableroDigital[casillaPermitida];

    //Vacia la casilla donde estaba la pieza
    tableroDigital[pieza.casilla] = null;

    //Avanza la pieza a la casilla permitida
    tableroDigital[casillaPermitida] = pieza;

    //Calcula las casillas amenazadas al mover
    let casillasAmenazadas = calcularCasillasAmenazadas(pieza.color);
    //Calcula si al haber movido el rey está amenazado. Si lo esta marca jaque como true
    casillasAmenazadas.forEach(casillaAmenazada => {
        if (tableroDigital[casillaAmenazada] instanceof Rey && tableroDigital[casillaAmenazada].color === pieza.color) jaque = true;
    });

    //Comprueba si la pieza que se mueve es un rey para comprobar si enroca y que no halla jaque en casillas intermedias
    if (pieza instanceof Rey && !jaque) {
        //Calcula si mueve mas de dos casillas (enroque)
        if (Math.abs(numeroColumna[pieza.casilla[0]] - numeroColumna[casillaPermitida[0]]) === 2) {
            //Si la casilla destino es mayor que la inicio el enroque es a la derecha (enroque corto)
            if (numeroColumna[casillaPermitida[0]] > numeroColumna[pieza.casilla[0]]) {
                //Si es enroque corto comprobamos la casilla destino y la de la izquierda
                if (casillasAmenazadas.includes(letras[numeroColumna[pieza.casilla[0]] + 1] + pieza.casilla[1]) || casillasAmenazadas.includes(letras[numeroColumna[pieza.casilla[0]] + 2] + pieza.casilla[1])) jaque = true;
            } else {
                //Si es enroque largo comprobamos la casilla destino y la de la derecha
                if (casillasAmenazadas.includes(letras[numeroColumna[pieza.casilla[0]] - 1] + pieza.casilla[1]) || casillasAmenazadas.includes(letras[numeroColumna[pieza.casilla[0]] - 2] + pieza.casilla[1])) jaque = true;
            }
        }
    }

    //Devuelve la pieza a su inicio
    tableroDigital[pieza.casilla] = pieza;
    //Devuelve la pieza que habia en esa posicion
    tableroDigital[casillaPermitida] = piezaAnterior;
    return jaque;
}