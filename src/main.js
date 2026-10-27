import { Caballo } from './modelos/piezas/Caballo.js';
import { Torre } from './modelos/piezas/Torre.js';
import { Peon } from './modelos/piezas/Peon.js';
import { Alfil } from './modelos/piezas/Alfil.js';
import { Dama } from './modelos/piezas/Dama.js';
import { Rey } from './modelos/piezas/Rey.js';

import { letras, numeroColumna, movimientos } from "./utilidades.js";
const tablero = document.getElementById("tablero");
const PGN = [];
const coordenadasArray = ["a8","b8","c8","d8","e8","f8","g8","h8","a7","b7","c7","d7","e7","f7","g7","h7","a6","b6","c6","d6","e6","f6","g6","h6","a5","b5","c5","d5","e5","f5","g5","h5","a4","b4","c4","d4","e4","f4","g4","h4","a3","b3","c3","d3","e3","f3","g3","h3","a2","b2","c2","d2","e2","f2","g2","h2","a1","b1","c1","d1","e1","f1","g1","h1"];

let comprobacionesEnroque = {
    "blanco-rey":false,
    "blanco-torre-1":false,
    "blanco-torre-2":false,
    "negro-rey":false,
    "negro-torre-1":false,
    "negro-torre-2":false
}
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

            //Colocar piezas en tablero digital (Diccionario)
            

            // tableroDigital[coordenadasArray[i]] = idPiezas[id];
            //aSdasdasdasdasdasdasda
            //asdasd
            id++;

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
console.log("Al clicar:", JSON.parse(JSON.stringify(tableroDigital)));
    let casillasPermitidas = [];
    //Esto desactiva el comportamiento por defecto que deja arrastrar imagenes
    evento.preventDefault();
    piezaAgarrada = evento.target;
    piezaAgarrada.style.position = "absolute";
    piezaAgarrada.style.zIndex = "100";
    //Restamos la posicion del raton menos la esquina de la img para no solo anclarla al raton sino anclarla 
    // con el mismo margen sin que haya un salto hay que añadirle el scroll de la pantalla ya que mide cuanta distancia
    //hay desde el principio del documento
    agarreX = evento.clientX - piezaAgarrada.getBoundingClientRect().left;
    agarreY = evento.clientY - piezaAgarrada.getBoundingClientRect().top - window.scrollY;
    let casillaInicio = evento.target.parentElement;
    let pieza = tableroDigital[casillaInicio.id];
    
    //Vaciamos las casillas de la pieza anterior
    // casillasPermitidas.splice(0, casillasPermitidas.length);

    // casillasPermitidas = calcularMovimientos(piezaAgarrada, casillaInicio);
    casillasPermitidas.push(...calcularMovimientos(pieza));

    // casillasPermitidas = simularMovimiento(casillasPermitidas, piezaAgarrada, casillaInicio);
    casillasPermitidas.splice(0, casillasPermitidas.length, ...simularMovimiento(pieza, casillasPermitidas));

    

    //Recoge todas las casillas del tablero
    let casillasHTML = document.querySelectorAll(".casilla");
    const casillasPintar = [];

    //Recorre las casillas del tablero y si esta en la lista de permitidas las añade la clasePermitida
    for(let i = 0; i < casillasHTML.length; i++){
        for(let j = 0; j < casillasPermitidas.length; j++){
            if(casillasHTML[i].id === casillasPermitidas[j]){
                casillasPintar.push(casillasHTML[i]);
                j = casillasPermitidas.length;
            }
        }
    }

    casillasPintar.forEach(casilla => {
        casilla.classList.add("casillaPermitida");
    });
}

//La añadimos al documento porque si se añade a pieza y muevo el raton muy rapido la puede perder
document.addEventListener("mousemove", moverPieza);
function moverPieza(evento){

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
        //Oculto la pieza para poder lanzar el "rayo" que impacta contra la casilla de debajo
        piezaAgarrada.style.visibility = "hidden"
        //Lannzo el "rayo"
        let piezaComida;
        casillaDestino = document.elementFromPoint(evento.clientX,evento.clientY);
        if(casillaDestino.className == "pieza"){
            casillaDestino = casillaDestino.parentElement;
            piezaComida = casillaDestino.querySelector(".pieza");
        }
        
        let casillaInicio = piezaAgarrada.closest(".casilla");
        let casillasPermitidas = calcularMovimientos(pieza);
        //Comprobamos que la casilla destino está en casillas permitidas y no deja al rey en jaque y si es un enroque mueve las dos piezas (llama funcion guardarMovimiento)
        // validarMovimiento(piezaComida, piezaAgarrada, casillaDestino, casillasPermitidas, casillaInicio);
        casillasPermitidas.splice(0, casillasPermitidas.length, ...simularMovimiento(pieza, casillasPermitidas));
        
        casillasPermitidas.forEach(casillasPermitida => {
            if(casillaDestino.id === casillasPermitida){
                let enroque = false;
                //Comprueba que sea un enroque
                if(piezaAgarrada.id.split("-")[1] === "rey" && Math.abs(letras[casillaInicio.id[0]] - letras[casillaDestino.id[0]]) === 2) console.log("Enroque: " + enroque)
                //Actualiza tablero en memoria con la jugada actual
                tableroDigital[casillaInicio.id] = null;
                tableroDigital[casillaDestino.id] = pieza;
                pieza.casilla = casillaDestino.id;
                if(!pieza.seHaMovido) pieza.seHaMovido = true;
                //Guardar el movimiento en memoria
                guardarMovimiento(pieza, casillaInicio.id, piezaComida, enroque);

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
    let casillasPermitidas = [];
    let casillaInicio = pieza.casilla;
    let piezaId = pieza.id.split("-");
    let valido = false;
    // let pieza = piezaAgarrada.id;
    // let pieza = pieza2.id.split("-");
    //Esto resetea las casillas y permite calcular los movimientos posibles sobre la casilla destino. (Al guardar movimiento tengo que saber si doy jaque y para eso 
    // calculo si en el siguiente movimiento encuentra al rey por lo que vuelvo a calcular los movimientos)
    
    
    //Para resetear las casillas sin reasignar el valor casillasPermitidas = []
    casillasPermitidas.splice(0, casillasPermitidas.length); 


    //Caballos y rey
    let movimientosDirectos = [];
    //Torres alfiles y damas ya que cogen un patron y lo repiten en bucle
    let movimientosDeslizantes = [];


    //El orden es el de las agujas del reloj por lo que al recorrer la brujula cada bucle sabra si sumar o restar las coordenadas
    const brujula = [1,1,-1,-1];
    const letraCasillaInicio = pieza.casilla[0];
    const numeroCasillaInicio = parseInt(pieza.casilla[1]);
    //Aqui restamos o sumamos el numero de la casilla en la que esta el bucle ej: h2, h3, h4
    let numeroActualCasilla = numeroCasillaInicio;
    let letraActualCasilla = letraCasillaInicio;

    //Calcula cuantas casillas quedan hasta salirse del tablero
    let casillasRestantes = 0;
    //Peones
    if(piezaId[1] == "peon"){
        // casillasPermitidas = pieza2.calcularMovimientos(tableroDigital, casillaInicio);
        console.log("Peon:", JSON.parse(JSON.stringify(tableroDigital)));

        casillasPermitidas.push(...pieza.calcularMovimientos(tableroDigital, casillaInicio));
    }
    
    //Torres
    if(piezaId[1] == "torre"){
        casillasPermitidas.push(...pieza.calcularMovimientos(tableroDigital, casillaInicio));
    }
    //Caballos
    if(piezaId[1] === "caballo"){
        movimientosDirectos = [
            [-1,2],
            [1,2],
            [2,1],
            [2,-1],
            [1,-2],
            [-1,-2],
            [-2,-1],
            [-2,1]
        ];
    }
    //Alfiles
    if(piezaId[1] === "alfil"){
        movimientosDeslizantes = [
            [1,1],
            [1,-1],
            [-1,1],
            [-1,-1]
        ];

    }
    //Damas
    if(piezaId[1] === "dama"){
        movimientosDeslizantes = [
            [1,1],
            [1,-1],
            [-1,1],
            [-1,-1],
            [1,0],
            [-1,0],
            [0,1],
            [0,-1]
        ];
    }
    //Rey
    if(piezaId[1] === "rey"){
        movimientosDirectos = [
            [0,1],
            [1,1],
            [1,0],
            [1,-1],
            [0,-1],
            [-1,-1],
            [-1,0],
            [-1,1],
        ];
        //Comprueba si el rey se ha movido y si ha movido su torre si no, añade el enroque de ese lado como movimiento, 
        // ademas de comprobar que las casillas intermedias esten vacias
        if(pieza[0] === "blanco" && !comprobacionesEnroque["blanco-rey"] && !comprobacionesEnroque["blanco-torre-2"] && tableroDigital["g1"] === null && tableroDigital["f1"] === null) movimientosDirectos.push([2,0]);
        if(pieza[0] === "blanco" && !comprobacionesEnroque["blanco-rey"] && !comprobacionesEnroque["blanco-torre-1"] && tableroDigital["d1"] === null && tableroDigital["c1"] === null && tableroDigital["b1"] === null) movimientosDirectos.push([-2,0]);
        if(pieza[0] === "negro" && !comprobacionesEnroque["negro-rey"] && !comprobacionesEnroque["negro-torre-1"] && tableroDigital["d8"] === null && tableroDigital["c8"] === null && tableroDigital["b8"] === null) movimientosDirectos.push([-2,0]);
        if(pieza[0] === "negro" && !comprobacionesEnroque["negro-rey"] && !comprobacionesEnroque["negro-torre-2"] && tableroDigital["g8"] === null && tableroDigital["f8"] === null ) movimientosDirectos.push([2,0]);
    }

            

    
    
    return casillasPermitidas;
}

const contenedorPGN = document.getElementById("contenedorPGN");
//Funcion para generar el codigo PGN de la partida, cada vez que se mueve una pieza se añade el movimiento
function generarPGN(piezaAgarrada, casillaDestino, piezaComida, casillaInicio, enroque){
    let captura = false;
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
    //Calculo si es un enroque corto o largo para cancelar la logica del PGN y poner 0-0 o 0-0-0

    if(enroque === false){
        if(!(piezaComida == undefined)) captura = true;
        pieza = diccionario[(piezaAgarrada.id.split("-")[1][0]).toUpperCase()];
        casilla = casillaDestino; 
        if(captura && !(pieza === "")) pieza += "x";
        //Si captura un peon añadimos su columna
        if(captura && pieza === "") {
            pieza += casillaInicio[0]+"x";
        }
    }else{
        if(enroque === "corto"){
            pieza = "0-0";
        }else{
            pieza = "0-0-0";
        }
    }
    console.log("ASd")
    //Añade el movimiento al html
    contenedorPGN.innerHTML += pieza+casilla + " + ";
    
}

function guardarMovimiento(pieza, casillaInicio, piezaComida, enroque){
    //Volvemos a calcular movimientos posibles pero desde la casilla que aterriza simulando que en el siguiente turno podriamos comer el rey
    const posiblesJaques = calcularMovimientos(pieza, pieza.casilla);
    let jaque = false;
    //Comprobamos que en esa casilla halla una pieza y que sea el rey
    posiblesJaques.forEach(casilla => {
        if(document.getElementById(casilla).querySelector("img") && document.getElementById(casilla).querySelector("img").id.split("-")[1] === "rey") jaque = true;
    });
    //Si movemos algun rey o torre lo guardamos para saber si podemos enrocar
    if(pieza.id === "blanco-rey") comprobacionesEnroque["blanco-rey"] = true;
    if(pieza.id === "blanco-torre-1") comprobacionesEnroque["blanco-torre-1"] = true;
    if(pieza.id === "blanco-torre-2") comprobacionesEnroque["blanco-torre-2"] = true;
    if(pieza.id === "negro-rey") comprobacionesEnroque ["negro-rey"]= true;
    if(pieza.id === "negro-torre-1") comprobacionesEnroque["negro-torre-1"] = true;
    if(pieza.id === "negro-torre-2") comprobacionesEnroque["negro-torre-2"] = true;


    let movimiento = {
        "pieza": pieza.id,
        "casillaInicio": casillaInicio,
        "casillaDestino":pieza.casilla,
        "piezaComida":piezaComida,
        "jaque":jaque,
        "enroque":enroque,
        "fotografiaEnroque": {...comprobacionesEnroque}
    }
    movimientos.push(movimiento);
    console.log(movimiento)
    console.log(pieza.casilla)
    generarPGN(piezaAgarrada, pieza.casilla, piezaComida, casillaInicio, enroque);
    
}


// function validarMovimiento(piezaComida, piezaAgarrada, casillaDestino, casillasPermitidas, casillaInicio){
//     console.log("validarMovimiento")
//     let pieza = tableroDigital[casillaInicio.id]
//     //Comprueba que el movimiento sea valido
//     casillasPermitidas.forEach(casilla => {

//         if (casillaDestino.id == casilla) {
            
//             //Comer pieza
//             if (!(piezaComida == undefined)) piezaComida.remove();
//             casillaDestino.appendChild(piezaAgarrada);
//             //ENROQUES Calculo si un rey se mueve mas de 1 casilla si es asi es enroque, si es en la columna g es el corto y el largo si es en c, 
//             // Math.abs para valor absoluto ya que puede moverse -2
//             let enroque;
//             if (pieza.id.split("-")[1] === "rey" && Math.abs(numeroColumna[casillaInicio.id[0]] - numeroColumna[casillaDestino.id[0]]) == 2) {
//                 let fila = casillaDestino.id[1];
//                 if (casillaDestino.id[0] === "g") {
//                     //Busca la casilla f1 o f8 dependiendo y inserta la torre correspondiente
//                     document.getElementById("f" + fila).appendChild(document.getElementById(tableroDigital["h" + fila]));
//                     //Actualiza tablero en memoria con la jugada actual. Aqui cambiamos el orden para conseguir el nombre de la torre
//                     tableroDigital["f" + fila] = tableroDigital["h" + fila];
//                     tableroDigital["h" + fila] = null;
//                     enroque = "corto";
//                 }
//                 if (casillaDestino.id[0] === "c") {
//                     //Busca la casilla f1 o f8 dependiendo y inserta la torre correspondiente
//                     document.getElementById("d" + fila).appendChild(document.getElementById(tableroDigital["a" + fila]));
//                     //Actualiza tablero en memoria con la jugada actual. Aqui cambiamos el orden para conseguir el nombre de la torre
//                     tableroDigital["d" + fila] = tableroDigital["a" + fila];
//                     tableroDigital["a" + fila] = null;
//                     enroque = "largo";
//                 }
//             }
//             //En passant
//             if(movimientos.length > 0){
//                 //Comprueba que la pieza movida sea un peon, si lo es comprueba si se mueve una casilla
//                 if(pieza.id.split("-")[1] === "peon" && Math.abs(casillaInicio.id[1] - casillaDestino.id[1]) === 1){
//                     //Calcula si se mueve a una columna adyacente, es decir en diagonal
//                     if(letras[numeroColumna[casillaDestino.id[0]]] === letras[numeroColumna[casillaInicio.id[0]] + 1] || letras[numeroColumna[casillaDestino.id[0]]] === letras[numeroColumna[casillaInicio.id[0]] - 1]){ 
//                         //Comprueba que la casilla en la que cae esta vacia porque si no podria ser una captura normal
//                         if(tableroDigital[casillaDestino.id] === null){
//                             //Guarda casilla donde esta el peon que se captura == columna de la casilla destino + fila casilla inicio
//                             let casillaComer = document.getElementById(casillaDestino.id[0] + casillaInicio.id[1]);
//                             //Selecciona el peon comido como pieza comida para guardarlo en la lista movimiento
//                             piezaComida = casillaComer.querySelector(".pieza").id;
//                             //Elimina la pieza(peon) que hay en esa casilla
//                             casillaComer.querySelector(".pieza").remove();

//                         }
//                     }
//                 }
//             }
//             //Guardar el movimiento en memoria
//             guardarMovimiento(pieza, casillaDestino, piezaComida, enroque);

//             //Actualiza tablero en memoria con la jugada actual
//             tableroDigital[casillaInicio.id] = null;
//             tableroDigital[casillaDestino.id] = piezaAgarrada.id;
//         }
//     });
//         console.log("Termina")
//     console.log(casillasPermitidas)
// }

//Calcula que casillas pueden comer las piezas del color distinto al tuyo
function calcularCasillasAmenazadas(piezaAgarrada){
    console.log("Calcular casillas amenazadas")
    const casillasHTML = document.querySelectorAll(".casilla");

    //Reseteamos estilo de las casillas amenazadas
    let casillasPermitidasHTML = document.querySelectorAll(".casillaAmenazada");
    casillasPermitidasHTML.forEach(casilla => {
        casilla.classList.remove("casillaAmenazada");
    });

    let casillasAmenazadas = [];
    //Obtiene el color pieza agarrada
    const color = piezaAgarrada.id.split("-")[0];

    //Recorre tablero digital
    for (const [casilla, pieza] of Object.entries(tableroDigital)) {
        //Obtiene el elemento HTML de pieza y casilla

        //Cambiado porque uso pieza directamente en vez de html
        // const piezaHTML = document.getElementById(piezaInstancia.id);
        // const casillaHTML = document.getElementById(casillaTablero);
        //Comprueba que haya pieza y que la pieza sea de color contrario
        if(pieza !== null && pieza.id.split("-")[0] !== color){

            let casillasPermitidas;
            //Si hay pieza rival calcula sus movimientos (Si es un peon coge la diagonal porque devuelve movimientos hacia delante que no son amenazas)
            if(pieza.id.split("-")[1][0] === "p"){
                let fila = parseInt(casilla[1]);
                //Nos sirve para diferenciar entre peon negro y blanco ya que mueven hacia arriba o abajo (si es negro es que mueve el blanco +1)
                let direccion = -1;
                if(color === "negro") direccion = 1;
                //Calcula que la diagonal exista y no se salga del tablero
                if(tableroDigital[letras[numeroColumna[casilla[0]] - 1]+(fila+direccion)] != undefined) casillasAmenazadas.push(letras[numeroColumna[casilla[0]] - 1]+(fila+direccion));
                if(tableroDigital[letras[numeroColumna[casilla[0]] + 1]+(fila+direccion)] != undefined) casillasAmenazadas.push(letras[numeroColumna[casilla[0]] + 1]+(fila+direccion));

            }else{
                casillasPermitidas = calcularMovimientos(pieza, casilla);
            }
            //Evita que si ningun peon amenaza haga un for each de casillas permitidas = undefined
            if(casillasPermitidas != undefined){
                //Recorre las casillas donde puede mover el rival
                casillasPermitidas.forEach(casillaPermitida => {
                    //Evita meter una casilla varias veces si la atacan diferentes piezas
                    if(casillasAmenazadas.includes(casillaPermitida) === false) casillasAmenazadas.push(casillaPermitida);
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
    console.log("Amenazadas:", JSON.parse(JSON.stringify(tableroDigital)));
    
    return casillasAmenazadas;
}

//Simula el movimiento de la pieza para comprobar si deja al rey en jaque
function simularMovimiento(pieza, casillasPermitidas){
    console.log("Simular movimiento")
    let casillaEliminar = [];
    let color = piezaAgarrada.id.split("-")[0];
    //Aqui se guarda el id de la pieza que ocupaba la casilla a la que simulamos el movimiento
    let piezaAnterior;

    //Recorre casillas permitidas
    casillasPermitidas.forEach(casillaPermitida => {
        //Excepcion del rey ya que hay que comprobar que si se enroca no pase por una casilla amenazada
        if (pieza.id.split("-")[1] === "rey") {
            //ENROQUES Calculo si un rey se mueve mas de 1 casilla si es asi es enroque, si es en la columna g es el corto y el largo si es en c, 
            // Math.abs para valor absoluto ya que puede moverse -2
            if(Math.abs(numeroColumna[pieza.casilla[0]] - numeroColumna[casillaPermitida[0]]) === 2){

                let casillasAmenazadas = calcularCasillasAmenazadas(pieza);
                //Si esta en jaque eliminamos directamente porque no pude enrocar
                if(casillasAmenazadas.includes(pieza.id)){
                     casillaEliminar.push(casillaPermitida);
                }else{
                    //Si la casilla destino es mayor que la inicio el enroque es a la derecha (enroque corto)
                    if (numeroColumna[casillaPermitida[0]] > numeroColumna[pieza.id[0]]) {
                        //Si es enroque corto comprobamos la casilla destino y la de la izquierda
                        if (casillasAmenazadas.includes(letras[numeroColumna[pieza.id[0]] + 1] + pieza.id[1]) | casillasAmenazadas.includes(letras[numeroColumna[pieza.id[0]] + 2] + pieza.id[1])) casillaEliminar.push(casillaPermitida);
                    } else {
                        //Si es enroque largo comprobamos la casilla destino y la de la derecha
                        if (casillasAmenazadas.includes(letras[numeroColumna[pieza.id[0]] - 1] + pieza.id[1]) | casillasAmenazadas.includes(letras[numeroColumna[pieza.id[0]] - 2] + pieza.id[1])) casillaEliminar.push(casillaPermitida);
                    }
                }
            }else{
                //REPITO EL CODIGO PARA EL REY (MEJORABLE???)
                //Avanza la pieza a la casilla permitida para calcular si deja en jaque al rey
                tableroDigital[pieza] = null;
                //Guarda la pieza que hay en la casilla que movemos
                piezaAnterior = tableroDigital[casillaPermitida];
                tableroDigital[casillaPermitida] = pieza;

                let casillasAmenazadas = calcularCasillasAmenazadas(pieza);
                //Calcula si al haber movido el rey está amenazado. Si lo esta lo añade a casillasEliminar
                casillasAmenazadas.forEach(casillaAmenazada => {
                    if (tableroDigital[casillaAmenazada].split("-")[1] === "rey" && color === tableroDigital[casillaAmenazada].split("-")[0] && !(casillaEliminar.includes(casillaAmenazada))) casillaEliminar.push(casillaPermitida);
                });
                //Devuelve la pieza a su inicio
                tableroDigital[pieza] = pieza;
                //Devuelve la pieza que habia en esa posicion
                tableroDigital[casillaPermitida] = piezaAnterior;
                }
        } else {
            avanzarPieza(pieza, casillaPermitida);

            // //Avanza la pieza a la casilla permitida para calcular si deja en jaque al rey
            // tableroDigital[pieza.casilla] = null;
            // console.log(JSON.parse(JSON.stringify(tableroDigital[casillaPermitida])))

            // //Guarda la pieza que hay en la casilla que movemos
            // piezaAnterior = tableroDigital[casillaPermitida];
            // tableroDigital[casillaPermitida] = pieza;
            // tableroDigital[pieza.casilla] = null;

            // let casillasAmenazadas = calcularCasillasAmenazadas(pieza);
            
            // //Calcula si al haber movido el rey está amenazado. Si lo esta lo añade a casillasEliminar
            // casillasAmenazadas.forEach(casillaAmenazada => {
            //     if (tableroDigital[casillaAmenazada].split("-")[1] === "rey" && color === tableroDigital[casillaAmenazada].split("-")[0] && !(casillaEliminar.includes(casillaAmenazada))) casillaEliminar.push(casillaPermitida);
            // });
            // //Devuelve la pieza a su inicio
            // tableroDigital[pieza.casilla] = pieza;
            // //Devuelve la pieza que habia en esa posicion
            // tableroDigital[casillaPermitida] = piezaAnterior;

        }
    });
    // console.log("CasillasELiminar: " + casillaEliminar)
    //Filtra las casillas permitidas para quitar las que coinciden con casillaEliminar
    let casillasPermitidasFiltradas = casillasPermitidas.filter(casillaPermitida => !(casillaEliminar.includes(casillaPermitida)));
    //Vaciamos las casillas de la pieza anterior
    casillasPermitidas.splice(0, casillasPermitidas.length);
    casillasPermitidas.push(...casillasPermitidasFiltradas);
    // console.log("CasillasPermitidas: " + casillasPermitidas)
    return casillasPermitidas;
}

function avanzarPieza(pieza, casillaPermitida){
            //Guarda la pieza que hay en la casilla a la que nos movemos
            let piezaAnterior = tableroDigital[casillaPermitida];

            //Vacia la casilla donde estaba la pieza
            tableroDigital[pieza.casilla] = null;

            //Avanza la pieza a la casilla permitida
            tableroDigital[casillaPermitida] = pieza;

            //Calcula las casillas amenazadas al mover
            let casillasAmenazadas = calcularCasillasAmenazadas(pieza);
            //Calcula si al haber movido el rey está amenazado. Si lo esta lo añade a casillasEliminar
            casillasAmenazadas.forEach(casillaAmenazada => {
                if (tableroDigital[casillaAmenazada] != null && tableroDigital[casillaAmenazada].id.split("-")[1] === "rey" && color === tableroDigital[casillaAmenazada].id.split("-")[0] && !(casillaEliminar.includes(casillaAmenazada))) casillaEliminar.push(casillaPermitida);
            });
            //Devuelve la pieza a su inicio
            tableroDigital[pieza.casilla] = pieza;
            //Devuelve la pieza que habia en esa posicion
            tableroDigital[casillaPermitida] = piezaAnterior;
}