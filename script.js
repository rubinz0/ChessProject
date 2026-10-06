const tablero = document.getElementById("tablero");
const PGN = [];
const coordenadasArray = ["a8","b8","c8","d8","e8","f8","g8","h8","a7","b7","c7","d7","e7","f7","g7","h7","a6","b6","c6","d6","e6","f6","g6","h6","a5","b5","c5","d5","e5","f5","g5","h5","a4","b4","c4","d4","e4","f4","g4","h4","a3","b3","c3","d3","e3","f3","g3","h3","a2","b2","c2","d2","e2","f2","g2","h2","a1","b1","c1","d1","e1","f1","g1","h1"];
const letras = [null,"a","b", "c", "d", "e", "f", "g","h"];
const numeroColumna = {
    a : 1,
    b : 2,
    c : 3,
    d : 4,
    e : 5,
    f : 6,
    g : 7,
    h : 8
}
let movimientos = [];
let comprobacionesEnroque = {
    "blanco-rey":false,
    "blanco-torre-1":false,
    "blanco-torre-2":false,
    "negro-rey":false,
    "negro-torre-1":false,
    "negro-torre-2":false
}
let casillasPermitidas = [];
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
        //Casillas negras
        if(i > 7 && i < 16){
            nombrePieza = "peonNegro";
        }
        if(i == 0 | i == 7){
            nombrePieza = "torreNegra";
        }
        if(i == 1 | i == 6){
            nombrePieza = "caballoNegro";
        }
        if(i == 2 | i == 5){
            nombrePieza = "alfilNegro";
        }
        if(i == 3){
            nombrePieza = "damaNegra";
        }
        if(i == 4){
            nombrePieza = "reyNegro";
        }

        //Casillas blancas
        if(i > 47 && i < 56){
            nombrePieza = "peonBlanco";
        }
        if(i == 56 | i == 63){
            nombrePieza = "torreBlanca";
        }
        if(i == 57 | i == 62){
            nombrePieza = "caballoBlanco";
        }
        if(i == 58 | i == 61){
            nombrePieza = "alfilBlanco";
        }
        if(i == 59){
            nombrePieza = "damaBlanca";
        }
        if(i == 60){
            nombrePieza = "reyBlanco";
        }

        //Colocar la imagen en la casilla seleccionada
        if(!(nombrePieza == "none")){
            const pieza = document.createElement("img");
            const src = "/img/piezas/" + nombrePieza + ".webp"
            pieza.src = src;
            pieza.alt = nombrePieza;
            pieza.className = "pieza";
            pieza.id = idPiezas[id];

            //Colocar piezas en tablero digital (Diccionario)
            tableroDigital[coordenadasArray[i]] = idPiezas[id];

            id++;

            pieza.draggable = "false";
            pieza.addEventListener("mousedown", clicarPieza);
            casillas[i].appendChild(pieza);



        }else{
            // Colocar null en casillas tablero digital (Diccionario)
            tableroDigital[coordenadasArray[i]] = "null";
        }
        
    }

}
colocarPiezas()





//Variables de pieza, para pasarlas entre mouseDown y mouseMove es decir que cuando mueva la pieza la funcion de clicar pieza 
// no desaparezca los datos si no que los pase a una variable local
let agarreX = 0;
let agarreY = 0;
let piezaAgarrada = "null";
let click = "null";
let casillaDestino = "";
let casillaInicio = "";


function clicarPieza(evento){
    click = "true"
    //Esto desactiva el comportamiento por defecto que deja arrastrar imagenes
    evento.preventDefault();
    console.log("Pieza agarrada: " , evento.target);
    piezaAgarrada = evento.target;
    piezaAgarrada.style.position = "absolute";
    piezaAgarrada.style.zIndex = "100";
    //Restamos la posicion del raton menos la esquina de la img para no solo anclarla al raton sino anclarla 
    // con el mismo margen sin que haya un salto hay que añadirle el scroll de la pantalla ya que mide cuanta distancia
    //hay desde el principio del documento
    agarreX = evento.clientX - piezaAgarrada.getBoundingClientRect().left;
    agarreY = evento.clientY - piezaAgarrada.getBoundingClientRect().top - window.scrollY;
    click = "false";
    casillaInicio = evento.target.parentElement;
    //Vaciamos las casillas de la pieza anterior
    casillasPermitidas = [];
    casillasPermitidas = calcularMovimientos(piezaAgarrada, casillaInicio);

    let casillasHTML = document.querySelectorAll(".casilla");
    const casillasPintar = [];


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
    if(piezaAgarrada == "null"){
        return
    }if(!(piezaAgarrada == "null")){
        const posX = evento.clientX - agarreX;
        const posY = evento.clientY - agarreY;
        piezaAgarrada.style.left = posX + "px";
        piezaAgarrada.style.top = posY + "px";
    }

}


document.addEventListener("mouseup", soltarClick);
function soltarClick(evento){
    if(piezaAgarrada == "null"){
        return;
    }if(!(piezaAgarrada == "null")){
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

        //Comprobamos que la casilla destino está en casillas permitidas y no deja al rey en jaque y si es un enroque mueve las dos piezas (llama funcion guardarMovimiento)
        validarMovimiento(piezaComida, piezaAgarrada);


        piezaAgarrada.style.visibility = "visible";
        piezaAgarrada = "null";


        //Reseteamos estilo de las casillas a las que podemos mover
        let casillasPermitidasHTML = document.querySelectorAll(".casillaPermitida");
        casillasPermitidasHTML.forEach(casilla => {
            casilla.classList.remove("casillaPermitida");
        });
    }

}


function calcularMovimientos(piezaAgarrada, casillaInicio){
    let valido = false;
    let pieza = piezaAgarrada.id;
    pieza = pieza.split("-");
    //Esto resetea las casillas y permite calcular los movimientos posibles sobre la casilla destino. (Al guardar movimiento tengo que saber si doy jaque y para eso 
    // calculo si en el siguiente movimiento encuentra al rey por lo que vuelvo a calcular los movimientos)
    casillasPermitidas = []

    let movX;
    let movY;
    //Caballos y rey
    let movimientosDirectos = [];
    //Torres alfiles y damas ya que cogen un patron y lo repiten en bucle
    let movimientosDeslizantes = [];


    //El orden es el de las agujas del reloj por lo que al recorrer la brujula cada bucle sabra si sumar o restar las coordenadas
    const brujula = [1,1,-1,-1];

    const letraCasillaInicio = casillaInicio.id[0];
    const numeroCasillaInicio = parseInt(casillaInicio.id[1]);
    //Aqui restamos o sumamos el numero de la casilla en la que esta el bucle ej: h2, h3, h4
    let numeroActualCasilla = numeroCasillaInicio;
    let letraActualCasilla = letraCasillaInicio;

    //Calcula cuantas casillas quedan hasta salirse del tablero
    let casillasRestantes = 0;
    //Peones
    if(pieza[1] == "peon"){
        //Unica pieza que comprueba esto
        if (pieza[0] === "blanco") {
            //Calculamos si puede mover doble y la casilla donde puede haber una pieza ej: f4  f + 4-1  f3(Si hay una pieza no dejamos mover)
            if (numeroCasillaInicio == 2 && tableroDigital[letraCasillaInicio + (numeroCasillaInicio + 2)] === "null") {
                casillasPermitidas.push(letraCasillaInicio + (numeroCasillaInicio + 2));
            }
            if (tableroDigital[letraCasillaInicio + (numeroCasillaInicio + 1)] === "null") {
                casillasPermitidas.push(letraCasillaInicio + (numeroCasillaInicio + 1));
            }
            //Calcula

            //Calcula la fila izquierda y derecha y calcula si hay una fila a la derecha o la izquierda para que no se salga del tablero y de error
            if (!(tableroDigital[letras[numeroColumna[letraCasillaInicio] + 1] + (numeroCasillaInicio + 1)] === "null") && !(letraCasillaInicio === "h")) {
                if (tableroDigital[letras[numeroColumna[letraCasillaInicio] + 1] + (numeroCasillaInicio + 1)][0] === "n") {
                    casillasPermitidas.push(letras[numeroColumna[letraCasillaInicio] + 1] + (numeroCasillaInicio + 1));
                }
            }

            if (!(tableroDigital[letras[numeroColumna[letraCasillaInicio] - 1] + (numeroCasillaInicio + 1)] === "null") && !(letraCasillaInicio === "a")) {
                if (tableroDigital[letras[numeroColumna[letraCasillaInicio] - 1] + (numeroCasillaInicio + 1)][0] === "n") {
                    casillasPermitidas.push(letras[numeroColumna[letraCasillaInicio] - 1] + (numeroCasillaInicio + 1));
                }
            }
        } else {
            //Calculamos si puede mover doble y la casilla donde puede haber una pieza ej: f4  f + 4-1  f3(Si hay una pieza no dejamos mover)
            if (numeroCasillaInicio == 7 && tableroDigital[letraCasillaInicio + (numeroCasillaInicio - 2)] === "null") {
                casillasPermitidas.push(letraCasillaInicio + (numeroCasillaInicio - 2));
            }
            if (tableroDigital[letraCasillaInicio + (numeroCasillaInicio - 1)] === "null") {
                casillasPermitidas.push(letraCasillaInicio + (numeroCasillaInicio - 1));
            }
            //Calcula la fila izquierda y derecha
            //Calcula
            if (!(tableroDigital[letras[numeroColumna[letraCasillaInicio] - 1] + (numeroCasillaInicio - 1)] === "null") && !(letraCasillaInicio === "a")) {
                if (tableroDigital[letras[numeroColumna[letraCasillaInicio] - 1] + (numeroCasillaInicio - 1)][0] === "b") {
                    casillasPermitidas.push(letras[numeroColumna[letraCasillaInicio] - 1] + (numeroCasillaInicio - 1));
                }
            }
            if (!(tableroDigital[letras[numeroColumna[letraCasillaInicio] + 1] + (numeroCasillaInicio - 1)] === "null") && !(letraCasillaInicio === "h")) {
                if (tableroDigital[letras[numeroColumna[letraCasillaInicio] + 1] + (numeroCasillaInicio - 1)][0] === "b") {
                    casillasPermitidas.push(letras[numeroColumna[letraCasillaInicio] + 1] + (numeroCasillaInicio - 1));
                }
            }
            
        }
    }
    
    //Torres
    if(pieza[1] == "torre"){
        movimientosDeslizantes = [
            [1,0],
            [-1,0],
            [0,1],
            [0,-1]
        ];
    }
    //Caballos
    if(pieza[1] === "caballo"){
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
    if(pieza[1] === "alfil"){
        movimientosDeslizantes = [
            [1,1],
            [1,-1],
            [-1,1],
            [-1,-1]
        ];

    }
    //Damas
    if(pieza[1] === "dama"){
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
    if(pieza[1] === "rey"){
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
        if(pieza[0] === "blanco" && !comprobacionesEnroque["blanco-rey"] && !comprobacionesEnroque["blanco-torre-2"] && tableroDigital["g1"] === "null" && tableroDigital["f1"] === "null") movimientosDirectos.push([2,0]);
        if(pieza[0] === "blanco" && !comprobacionesEnroque["blanco-rey"] && !comprobacionesEnroque["blanco-torre-1"] && tableroDigital["d1"] === "null" && tableroDigital["c1"] === "null" && tableroDigital["b1"] === "null") movimientosDirectos.push([-2,0]);
        if(pieza[0] === "negro" && !comprobacionesEnroque["negro-rey"] && !comprobacionesEnroque["negro-torre-1"] && tableroDigital["d8"] === "null" && tableroDigital["c8"] === "null" && tableroDigital["b8"] === "null") movimientosDirectos.push([-2,0]);
        if(pieza[0] === "negro" && !comprobacionesEnroque["negro-rey"] && !comprobacionesEnroque["negro-torre-2"] && tableroDigital["g8"] === "null" && tableroDigital["f8"] === "null" ) movimientosDirectos.push([2,0]);
    }

            
    movimientosDirectos.forEach(movimiento => {
        let columna = letras[letras.indexOf(letraCasillaInicio) + movimiento[0]];
        let fila = numeroCasillaInicio + movimiento[1];
        if(tableroDigital[columna+fila] === "null"){
            casillasPermitidas.push(columna+fila);
        }
        //Calcula si es una casilla ocupada, dentro del tablero y de una pieza rival
        if(tableroDigital[columna+fila] != "null" && tableroDigital[columna+fila] != undefined && tableroDigital[columna+fila].split("-")[0] != piezaAgarrada.id.split("-")[0]){
            casillasPermitidas.push(columna+fila);
        }
    });
    movimientosDeslizantes.forEach(movimiento => {
        //Mide hasta que distancia calcula en esa direccion
        let distancia = 1;
        while(distancia < 8){
            let columna = letras[letras.indexOf(letraCasillaInicio) - movimiento[0]*distancia];
            let fila = numeroCasillaInicio + movimiento[1] * distancia;

            if(tableroDigital[columna+fila] === "null"){
                casillasPermitidas.push(columna+fila);
            }

            if(tableroDigital[columna+fila] != "null" && tableroDigital[columna+fila] != undefined && tableroDigital[columna+fila].split("-")[0] != piezaAgarrada.id.split("-")[0]){
                casillasPermitidas.push(columna+fila);
                break
            }
            //Si no esta vacia y no hay un enemigo esque hay un aliado
            if(tableroDigital[columna+fila] != "null" && tableroDigital[columna+fila] != undefined && tableroDigital[columna+fila].split("-")[0] == piezaAgarrada.id.split("-")[0]){
                break
            }
            distancia++;
        }

    });
    console.log(casillasPermitidas)
    return casillasPermitidas;
}

const contenedorPGN = document.getElementById("contenedorPGN");
//Funcion para generar el codigo PGN de la partida, cada vez que se mueve una pieza se añade el movimiento
function generarPGN(piezaAgarrada, casillaDestino, piezaComida, casillaInicio, enroque){
    captura = false;
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

    if(enroque === undefined){
        if(!(piezaComida == undefined)) captura = true;
        pieza = diccionario[(piezaAgarrada.id.split("-")[1][0]).toUpperCase()];
        casilla = casillaDestino.id; 
        if(captura && !(pieza === "")) pieza += "x";
        //Si captura un peon añadimos su columna
        if(captura && pieza === "") {
            pieza += casillaInicio.id[0]+"x";
        }
    }else{
        if(enroque === "corto"){
            pieza = "0-0";
        }else{
            pieza = "0-0-0";
        }
    }
    
    //Añade el movimiento al html
    contenedorPGN.innerHTML += pieza+casilla + " + ";
    
}

function guardarMovimiento(piezaAgarrada, casillaInicio, casillaDestino, piezaComida, enroque){
    //Volvemos a calcular movimientos posibles pero desde la casilla que aterriza simulando que en el siguiente turno podriamos comer el rey
    const posiblesJaques = calcularMovimientos(piezaAgarrada, casillaDestino);
    let jaque = false;
    //Comprobamos que en esa casilla halla una pieza y que sea el rey
    posiblesJaques.forEach(casilla => {
        if(document.getElementById(casilla).querySelector("img") && document.getElementById(casilla).querySelector("img").id.split("-")[1] === "rey") jaque = true;
    });
    //Si movemos algun rey o torre lo guardamos para saber si podemos enrocar
    if(piezaAgarrada.id === "blanco-rey") comprobacionesEnroque["blanco-rey"] = true;
    if(piezaAgarrada.id === "blanco-torre-1") comprobacionesEnroque["blanco-torre-1"] = true;
    if(piezaAgarrada.id === "blanco-torre-2") comprobacionesEnroque["blanco-torre-2"] = true;
    if(piezaAgarrada.id === "negro-rey") comprobacionesEnroque ["negro-rey"]= true;
    if(piezaAgarrada.id === "negro-torre-1") comprobacionesEnroque["negro-torre-1"] = true;
    if(piezaAgarrada.id === "negro-torre-2") comprobacionesEnroque["negro-torre-2"] = true;


    let movimiento = {
        "pieza": piezaAgarrada.id,
        "casillaInicio": casillaInicio.id,
        "casillaDestino":casillaDestino.id,
        "piezaComida":piezaComida,
        "jaque":jaque,
        "enroque":enroque,
        "fotografiaEnroque": {...comprobacionesEnroque}
    }
    movimientos.push(movimiento);
    console.log(movimiento)
    generarPGN(piezaAgarrada, casillaDestino, piezaComida, casillaInicio, enroque);
    
}


function validarMovimiento(piezaComida){
    //Comprueba que el movimiento sea valido
    casillasPermitidas.forEach(casilla => {
        if (casillaDestino.id == casilla) {
            //Comer pieza (Añadir funcion para comprobar jaques en el futuro)
            if (!(piezaComida == undefined)) piezaComida.remove();
            casillaDestino.appendChild(piezaAgarrada);
            //ENROQUES Calculo si un rey se mueve mas de 1 casilla si es asi es enroque, si es 2 es el corto 3 el largo, 
            // Math.abs para valor absoluto ya que puede moverse -2 o -3
            let enroque;
            if (piezaAgarrada.id.split("-")[1] === "rey" && Math.abs(numeroColumna[casillaInicio.id[0]] - numeroColumna[casillaDestino.id[0]]) == 2) {
                let fila = casillaDestino.id[1];
                if (casillaDestino.id[0] === "g") {
                    //Busca la casilla f1 o f8 dependiendo y inserta la torre correspondiente
                    document.getElementById("f" + fila).appendChild(document.getElementById(tableroDigital["h" + fila]));
                    //Actualiza tablero en memoria con la jugada actual. Aqui cambiamos el orden para conseguir el nombre de la torre
                    tableroDigital["f" + fila] = tableroDigital["h" + fila];
                    tableroDigital["h" + fila] = "null";
                    enroque = "corto";
                }
                if (casillaDestino.id[0] === "c") {
                    //Busca la casilla f1 o f8 dependiendo y inserta la torre correspondiente
                    document.getElementById("d" + fila).appendChild(document.getElementById(tableroDigital["a" + fila]));
                    //Actualiza tablero en memoria con la jugada actual. Aqui cambiamos el orden para conseguir el nombre de la torre
                    tableroDigital["d" + fila] = tableroDigital["a" + fila];
                    tableroDigital["a" + fila] = "null";
                    enroque = "largo";
                }
                console.log(tableroDigital)
            }
            //Guardar el movimiento en memoria
            guardarMovimiento(piezaAgarrada,casillaInicio,casillaDestino, piezaComida, enroque);
            
            //Actualiza tablero en memoria con la jugada actual
            tableroDigital[casillaInicio.id] = "null";
            tableroDigital[casillaDestino.id] = piezaAgarrada.id;        
        }
    });
    calcularCasillasAmenazadas(piezaAgarrada)
}

//Calcula que casillas pueden comer las piezas del color distinto al tuyo
function calcularCasillasAmenazadas(piezaAgarrada){
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
    for (const [casilla,pieza] of Object.entries(tableroDigital)) {
        //Obtiene el elemento HTML de pieza y casilla
        const piezaHTML = document.getElementById(pieza);
        const casillaHTML = document.getElementById(casilla);
        //Comprueba que haya pieza y que la pieza sea de color contrario
        if(pieza.split("-")[0] !== color && pieza != "null"){
            let casillasPermitidas;
            //Si hay pieza rival calcula sus movimientos (Si es un peon coge la diagonal porque devuelve movimientos hacia delante que no son amenazas)
            if(pieza.split("-")[1][0] === "p"){
                let fila = parseInt(casilla[1]);
                //Nos sirve para diferenciar entre peon negro y blanco ya que mueven hacia arriba o abajo (si es negro es que mueve el blanco +1)
                let direccion = -1;
                if(color === "negro") direccion = 1;
                console.log(color)
                //Calcula que la diagonal exista y no se salga del tablero
                if(tableroDigital[letras[numeroColumna[casilla[0]] - 1]+(fila+direccion)] != undefined) casillasAmenazadas.push(letras[numeroColumna[casilla[0]] - 1]+(fila+direccion));
                if(tableroDigital[letras[numeroColumna[casilla[0]] + 1]+(fila+direccion)] != undefined) casillasAmenazadas.push(letras[numeroColumna[casilla[0]] + 1]+(fila+direccion));

            }else{
                casillasPermitidas = calcularMovimientos(piezaHTML, casillaHTML);
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
    for(let i = 0; i < casillasHTML.length; i++){
        for(let j = 0; j < casillasAmenazadas.length; j++){
            if(casillasHTML[i].id === casillasAmenazadas[j]){
                casillasHTML[i].classList.add("casillaAmenazada");
            }
        }
    }
    console.log(casillasAmenazadas)
}