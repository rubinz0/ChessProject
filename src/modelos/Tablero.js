import { Peon } from "./piezas/Peon.js";
import { Torre } from "./piezas/Torre.js";
import { Caballo } from "./piezas/Caballo.js";
import { Alfil } from "./piezas/Alfil.js";
import { Dama } from "./piezas/Dama.js";
import { Rey } from "./piezas/Rey.js";
import { generarCoordenadas, letras, numeroColumna, movimientos } from "../utilidades.js";

//Coronar
//r1bqkbn1/pppp1ppP/2n5/4p3/4P3/5N2/PPPP1PP1/RNBQKB1R w KQq - 0 1
//Normal
//rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
//Ahogado
//7k/5K2/8/5Q2/8/8/8/8 w - - 0 1
const FEN_INICIAL = "7k/5K2/8/5Q2/8/8/8/8 w - - 0 1";

export class Tablero {

    tablero = document.querySelector("#tablero");

    coordenadasArray = generarCoordenadas();
    
    //Guarda las casillas y su pieza asociada
    tableroDigital = {};

    historialMovimientos = [];

    pgn = "PGN: ";

    modoPartida = false;
    
    turno = "blanco";

    //Aqui se cuentan cuantas piezas hay de cada tipo, para su id
    contadorPiezas = {
    blanco: { peon: 0, torre: 0, caballo: 0, alfil: 0, dama: 0, rey: 0 },
    negro: { peon: 0, torre: 0, caballo: 0, alfil: 0, dama: 0, rey: 0 }
    };

    posicionesReyes = {
        blanco : "e1",
        negro: "e8"
    }

    comprobacionesEnroque = {
        "blanco-rey-1": true,
        "blanco-torre-1": true,
        "blanco-torre-2": true,
        "negro-rey-1": true,
        "negro-torre-1": true,
        "negro-torre-2": true
    }


    constructor() {

        this.ultimoMovimiento = null;

        this.inicializarCasillasVacias();

        this.piezasCapturadas = {
            blanco: [],
            negro: []
        };
    }

    //==== Funciones para iniciar el tablero ====

    inicializarCasillasVacias() {
        //Rellena de null todas las casillas con null como base
        const columnas = ["a", "b", "c", "d", "e", "f", "g", "h"];
        for (let fila = 1; fila <= 8; fila++) {
            for (const columna of columnas) {
                this.tableroDigital[columna+fila] = null;
            }
        }
    }

    reiniciarContadores() {
        this.contadorPiezas = {
            blanco: { peon: 0, torre: 0, caballo: 0, alfil: 0, dama: 0, rey: 0 },
            negro: { peon: 0, torre: 0, caballo: 0, alfil: 0, dama: 0, rey: 0 }
        };
    }

    cargarDesdeFEN(FEN = FEN_INICIAL) {
        //Limpia las casillas
        this.inicializarCasillasVacias();
        //Reinicia el contador de piezas
        this.reiniciarContadores();

        //Separa la colocacion de las piezas del resto de datos 
        let fen = FEN.split(" ")[0];

        //Listas para montar la casilla
        let letras = ["a", "b", "c", "d", "e", "f", "g", "h"];
        let numeros = [8, 7, 6, 5, 4, 3, 2, 1];

        //Rellena de null todas las casillas como base
        for (let i = 0; i < 64; i++) {
            this.tableroDigital[this.coordenadasArray[i]] = null;
        }

        let indiceLetras = 0;
        let indiceNumeros = 0;
        while (fen.length > 0) {
            let pieza;

            //Si hay una barra salta una fila y pone la columna a cero
            if (fen[0] === "/") {
                indiceLetras = 0;
                indiceNumeros++;
            } else {
                //Si es un numero añade salta tantas casillas como el valor del numero sea
                if (!isNaN(parseInt(fen[0]))) {
                    indiceLetras = indiceLetras + parseInt(fen[0]);
                } else {
                    //Si no es un numero es la letra de la pieza a colocar
                    let fila = letras[indiceLetras];
                    let columna = numeros[indiceNumeros];
                    let casilla = fila + columna;
                    //Pasa a mayuscula 
                    let letraMayuscula = fen[0].toUpperCase();

                    //Si coincide a su letra sin modificar estaba en mayuscula por lo que es una pieza blanca
                    let color = "negro";
                    if (letraMayuscula === fen[0]) color = "blanco";


                    let imgURL = "/img/piezas/";

                    //Este diccionario sirve para acceder a la informacion dependiendo de la letra que sea (Ahorra un if por cada clase)
                    const piezasMapa = {
                        R: { clase: Torre, nombre: "torre" },
                        P: { clase: Peon, nombre: "peon" },
                        N: { clase: Caballo, nombre: "caballo" },
                        B: { clase: Alfil, nombre: "alfil" },
                        Q: { clase: Dama, nombre: "dama" },
                        K: { clase: Rey, nombre: "rey" }
                    };

                    //Con esta sola linea obtenemos la clase y el nombre
                    const piezaInfo = piezasMapa[letraMayuscula];

                    //Suma uno al contador de piezas de su clase
                    this.contadorPiezas[color][piezaInfo.nombre]++;

                    //Instancia la pieza
                    pieza = new piezaInfo.clase(color + "-" + piezaInfo.nombre + "-" + this.contadorPiezas[color][piezaInfo.nombre], color, casilla, imgURL + color + "-" + piezaInfo.nombre + ".webp");
                    
                    //Actualizar posicion del rey
                    if(letraMayuscula === "K" && color === "blanco") this.posicionesReyes["blanco"] = casilla;
                    if(letraMayuscula === "K" && color === "negro") this.posicionesReyes["negro"] = casilla;

                    //Coloca la pieza en el tableroDigital
                    this.tableroDigital[casilla] = pieza;

                    indiceLetras++;
                }

                fen[]
            }
            //Quita la letra que se acaba de analizar
            fen = fen.slice(1);
        }
    }

    //==== Funciones para guardar informacion del tablero ====

    guardarMovimiento(movimientoPermitido) {
        //Volvemos a calcular movimientos posibles pero desde la casilla que aterriza simulando que en el siguiente turno podriamos comer el rey
        const colorRival = movimientoPermitido.pieza.color === "blanco" ? "negro" : "blanco";
        const jaque = this.estaEnJaque(colorRival);
        

        //Si movemos algun rey o torre lo guardamos para saber si podemos enrocar
        if (movimientoPermitido.pieza.id === "blanco-rey-1") comprobacionesEnroque["blanco-rey-1"] = true;
        if (movimientoPermitido.pieza.id === "blanco-torre-1") comprobacionesEnroque["blanco-torre-1"] = true;
        if (movimientoPermitido.pieza.id === "blanco-torre-2") comprobacionesEnroque["blanco-torre-2"] = true;
        if (movimientoPermitido.pieza.id === "negro-rey-1") comprobacionesEnroque["negro-rey-1"] = true;
        if (movimientoPermitido.pieza.id === "negro-torre-1") comprobacionesEnroque["negro-torre-1"] = true;
        if (movimientoPermitido.pieza.id === "negro-torre-2") comprobacionesEnroque["negro-torre-2"] = true;

        //Añade a movimiento el jaque y que piezas del enroque se han movido en ese instante 
        let movimiento = movimientoPermitido;
        movimiento.jaque = jaque;
        movimiento.fotografiaEnroque = { ...comprobacionesEnroque }
        movimientos.push(movimiento);
        this.generarPGN(movimiento);
    }

    generarPGN(movimiento){
        //Con esto consigo cambiar las letras a ingles que es la notacion oficial sin tener que hacer bucles (tambien consigo vaciar la letra en caso de ser peon)
        const diccionario = {
            "P": "",
            "T": "R",
            "C": "N",
            "A": "B",
            "D": "Q",
            "R": "K"
        };
        let casilla = "";
        let pieza;
        //Compruebo si es un enroque corto o largo para cancelar la logica del PGN y poner 0-0 o 0-0-0
        if (!(movimiento.tipo.startsWith("enroque"))) {
            pieza = diccionario[(movimiento.pieza.id.split("-")[1][0]).toUpperCase()];
            casilla = movimiento.casillaDestino;

            //Si corona la pieza es siempre peon (De normal ya ha coronado y no es un peon) por eso fuerzo a que sea ""
            if(movimiento.tipo === "coronacion"){
                pieza = "";
            }
            //Si la captura no es de un peon
            if (movimiento.captura && !(pieza === "")) pieza += "x";
            //Si captura un peon añadimos su columna
            if (movimiento.captura && pieza === "") {
                pieza += movimiento.casillaInicio[0] + "x";
            }

            //Cuando ya tenemos el movimiento añade a que corona
            if (movimiento.tipo === "coronacion") {
                casilla += "=" + diccionario[(movimiento.pieza.id.split("-")[1][0]).toUpperCase()];
            }
        }else {
            if (movimiento.tipo === "enroque-corto") {
                pieza = "0-0";
            } else {
                pieza = "0-0-0";
            }
        }
        this.pgn = this.pgn + pieza + casilla + " + ";
    }

    //==== Funciones para leer informacion del tablero ====

    buscarCasillaRey(color){
        let colorRival = "negro";
        if(color === "negro") colorRival = "blanco";
        return this.posicionesReyes[colorRival]
    }

    casillasRey(){
        return this.posicionesReyes;
    }

    estaEnJaque(color){
        const casillaRey = this.posicionesReyes[color];
        const casillasAmenazadas = this.calcularCasillasAmenazadas(color);
        return casillasAmenazadas.includes(casillaRey);
    }

    // obtenerUltimoMovimiento() {
    //     return this.historialMovimientos.at(-1) || null;
    // }

    obtenerPieza(casillaId) {
        return this.tableroDigital[casillaId];
    }

    // estaVacia(casillaId) {
    //     return this.tableroDigital[casillaId] === null;
    // }

    hayMovimientosLegales(color){
        let colorRival = "negro";
        if(color === "negro") colorRival = "blanco";

        //Comprueba si hay movimientos legales para piezas de ese color
        const columnas = ["a", "b", "c", "d", "e", "f", "g", "h"];

        const movimientosLegales = [];
        for (let fila = 1; fila <= 8; fila++) {
            for (const columna of columnas) {
                const pieza = this.tableroDigital[columna + fila];
                if (pieza !== null && pieza.color === colorRival) {
                    movimientosLegales.push(this.obtenerMovimientosLegales(pieza));
                    if (movimientosLegales.length > 0) {
                        //Si hay almenos una jugada no es ni ahogado ni mate
                        return true;
                    }
                }
            }
        }
        return false;
    }

    //==== Reglas y Validacion ====

    //Une calcularMovimientos + simularMovimiento para devolver las jugadas finales válidas
    obtenerMovimientosLegales(pieza) {
        // Calcula los movimientos permitidos (Segun reglas de la pieza seleccionada)
        let movimientosPermitidos = this.calcularMovimientos(pieza);
        // Comprueba que el movimiento sea valido (Si esta en el tablero, no hay un jaque descubierto etc..)
        return this.simularMovimiento(pieza, movimientosPermitidos);
    }

    calcularMovimientos(pieza) {
        return pieza.calcularMovimientos(this.tableroDigital);
    }

    simularMovimiento(pieza, movimientosPermitidos) {
        let movimientosEliminar = [];

        //Recorre los movimientos permitidos
        movimientosPermitidos.forEach(movimientoPermitido => {
            //Excepcion del rey ya que hay que comprobar que si se enroca no pase por una casilla amenazada
            let jaque = this.avanzarPiezaSimulacion(pieza, movimientoPermitido.casillaDestino);
            //Si hay jaque en esa jugada y no esta añadido a movimientos eliminar lo añade para eliminarlo como movimiento posible
            if (jaque && !(movimientosEliminar.includes(movimientoPermitido))) movimientosEliminar.push(movimientoPermitido);
        });

        //Filtra los movimientos permitidos para quitar las que coinciden con movimientosEliminar
        let movimientosPermitidosFiltrados = movimientosPermitidos.filter(movimientoPermitido => !(movimientosEliminar.includes(movimientoPermitido)));
        //Vacia los movimientos permitidos
        movimientosPermitidos.splice(0, movimientosPermitidos.length);
        //Añade los movimientosFiltrados (sin jaques)
        movimientosPermitidos.push(...movimientosPermitidosFiltrados);

        return movimientosPermitidos;
    }

    avanzarPiezaSimulacion(pieza, casillaPermitida){
        let jaque = false;
        //Guarda la pieza que hay en la casilla a la que nos movemos
        let piezaAnterior = this.tableroDigital[casillaPermitida];

        //Vacia la casilla donde estaba la pieza
        this.tableroDigital[pieza.casilla] = null;

        //Avanza la pieza a la casilla permitida
        this.tableroDigital[casillaPermitida] = pieza;

        //Calcula las casillas amenazadas al mover
        let casillasAmenazadas = this.calcularCasillasAmenazadas(pieza.color);
        //Calcula si al haber movido el rey está amenazado. Si lo esta marca jaque como true
        casillasAmenazadas.forEach(casillaAmenazada => {
            if (this.tableroDigital[casillaAmenazada] instanceof Rey && this.tableroDigital[casillaAmenazada].color === pieza.color) jaque = true;
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
        this.tableroDigital[pieza.casilla] = pieza;
        //Devuelve la pieza que habia en esa posicion
        this.tableroDigital[casillaPermitida] = piezaAnterior;
        return jaque;
    }

    calcularCasillasAmenazadas(color){
        //Reseteamos estilo de las casillas amenazadas
        let casillasPermitidasHTML = document.querySelectorAll(".casillaAmenazada");
        casillasPermitidasHTML.forEach(casilla => {
            casilla.classList.remove("casillaAmenazada");
        });

        let casillasAmenazadas = [];
        let casillasEliminar = [];

        //Recorre tablero digital obteniendo la casilla HTML y la instancia de la pieza
        for (const [casilla, pieza] of Object.entries(this.tableroDigital)) {

            //Comprueba que haya pieza y que la pieza sea de color contrario
            if (pieza !== null && pieza.color !== color) {
                //Si hay pieza rival calcula sus movimientos (Si es un peon coge la diagonal porque devuelve movimientos hacia delante que no son amenazas)
                if (pieza.id.split("-")[1][0] === "p") {
                    let fila = parseInt(casilla[1]);
                    //Nos sirve para diferenciar entre peon negro y blanco ya que mueven hacia arriba o abajo (si es negro es que mueve el blanco +1)
                    let direccion = -1;
                    if (color === "negro") direccion = 1;
                    //Calcula que la diagonal exista y no se salga del tablero
                    if (this.tableroDigital[letras[numeroColumna[casilla[0]] - 1] + (fila + direccion)] !== undefined) casillasAmenazadas.push(letras[numeroColumna[casilla[0]] - 1] + (fila + direccion));
                    if (this.tableroDigital[letras[numeroColumna[casilla[0]] + 1] + (fila + direccion)] !== undefined) casillasAmenazadas.push(letras[numeroColumna[casilla[0]] + 1] + (fila + direccion));
                } else {
                    let movimientosPermitidos = this.calcularMovimientos(pieza)
                    movimientosPermitidos.forEach(movimientoPermitido => {
                        if (this.tableroDigital[movimientoPermitido.casillaDestino] !== undefined) casillasAmenazadas.push(movimientoPermitido.casillaDestino);
                    });
                }
                //Evita que si ninguna pieza amenaza haga un for each de casillas amenazadas = undefined
                if (casillasAmenazadas.length > 0) {
                    //Recorre las casillas donde puede mover el rival
                    casillasAmenazadas.forEach(casillaAmenazada => {
                        //Evita meter una casilla varias veces si la atacan diferentes piezas
                        if (!(casillasEliminar.includes(casillaAmenazada))) casillasEliminar.push(casillaAmenazada);
                    });

                }


            }
        }

        //Añade la clase amenazada para marcar las casillas amenazadas por el rival (usar solo para visualizar las amenazadas)
        // for(let i = 0; i < casillasHTML.length; i++){
        //     for(let j = 0; j < casillasAmenazadas.length; j++){
        //         if(casillasHTML[i].id === casillasAmenazadas[j]){
        //             casillasHTML[i].classList.add("casillaAmenazada");
        //         }
        //     }
        // }    
        return casillasEliminar;
    }


    //==== Modificar tablero ====

    moverPieza(pieza, casillaDestinoId) {
        //Actualiza tablero en memoria con la jugada actual
        //Vacia la casilla de inicio
        this.tableroDigital[pieza.casilla] = null;
        //Mueve la pieza a su casilla destino
        this.tableroDigital[casillaDestinoId] = pieza;
        //Actualiza la casilla dentro de la instancia de la pieza
        pieza.casilla = casillaDestinoId;
        //Si la pieza no se habia movido la marca como pieza movida
        if (!pieza.seHaMovido) pieza.seHaMovido = true;
        //Actualiza las posiciones del rey
        if(pieza.id.split("-")[1] === "rey") this.posicionesReyes[pieza.color] = pieza.casilla;
    }

    registrarCaptura(movimientoValido) {
        //Guarda la pieza capturada
        this.piezasCapturadas[movimientoValido.piezaCapturada.color].push(movimientoValido.piezaCapturada);
        //Elimina la pieza del tablero
        this.tableroDigital[movimientoValido.casillaCaptura] = null;
    }

    ejecutarEnroqueMemoria(movimientoPermitido) {
        let fila = movimientoPermitido.casillaDestino[1];
        //Si el rey acaba en la fila g es enroque corto
        if (movimientoPermitido.casillaDestino[0] === "g") {
            //Actualiza tablero en memoria con la jugada actual
            //Cambia la torre
            this.tableroDigital["f" + fila] = this.tableroDigital["h" + fila];
            //Vacia el sitio donde estaba la torre
            this.tableroDigital["h" + fila] = null;
            //Cambia la casilla dentro de la instancia de torre
            this.tableroDigital["f" + fila].casilla = "f" + fila;
            //Cambia el tipo de movimiento
            movimientoPermitido.tipo = "enroque-corto";

        }
        //Si el rey acaba en la fila c es enroque largo
        if (movimientoPermitido.casillaDestino[0] === "c") {
            //Actualiza tablero en memoria con la jugada actual
            //Cambia la torre
            this.tableroDigital["d" + fila] = this.tableroDigital["a" + fila];
            //Vacia el sitio donde estaba la torre
            this.tableroDigital["a" + fila] = null;
            //Cambia la casilla dentro de la instancia de torre
            this.tableroDigital["d" + fila].casilla = "d" + fila;
            //Cambia el tipo de movimiento
            movimientoPermitido.tipo = "enroque-largo";
        }
    }

    coronarPeon(tipoPieza, movimientoPermitido) {
        let color = movimientoPermitido.pieza.color;
        const clases = {
            "dama": Dama,
            "torre": Torre,
            "alfil": Alfil,
            "caballo": Caballo
        }

        //Suma uno al contador de piezas dependiendo de la pieza que corones
        this.contadorPiezas[color][tipoPieza]++;
        //Crea el nuevoId y la img
        const nuevoId = `${color}-${tipoPieza}-${this.contadorPiezas[color][tipoPieza]}`;
        const nuevaImg = `/img/piezas/${color}-${tipoPieza}.webp`;

        //Crea la instancia de la nueva pieza
        const piezaCoronada = new clases[tipoPieza](nuevoId, color, movimientoPermitido.casillaDestino, nuevaImg);

        //Guarda la pieza antigua para saber cual corono
        movimientoPermitido.piezaAntesCoronar = movimientoPermitido.pieza;
        //Cambia la pieza por la pieza coronada
        movimientoPermitido.pieza = piezaCoronada;

        //Limpia la casilla donde estaba el peon antes de coronar
        this.tableroDigital[movimientoPermitido.casillaInicio] = null;

        return piezaCoronada;
    }


    cambiarTurno(){
        if(this.turno === "blanco"){
            this.turno = "negro";
        }else{
            this.turno = "blanco";
        }
    }

    cambiarModoPartida(){
        if(this.modoPartida){
            this.modoPartida = false;
        }else{
            this.modoPartida = true;
        }
    }
}