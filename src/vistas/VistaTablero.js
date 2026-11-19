import { generarCoordenadas } from "../utilidades.js";
export class VistaTablero {
    coordenadasArray = generarCoordenadas();
    resolverCoronacion = null;


    tablero = document.querySelector("#tablero");
    modalCoronacion = document.querySelector("#modalCoronacion");
    pgn = document.querySelector("#contenedorPGN")

    constructor() {
        //Diccionario con las casillas HTML
        this.casillasHTML = {};
    }

    //==== Crear y colocar casillas y piezas ====

    generarTablero(){
        //Crear filas
        let posicionCoordenada = 0;
        for (let i = 0; i < 8; i++) {
            const fila = document.createElement("div");
            fila.style.display = "flex";
            fila.className = "fila";
            const id = i + 1;
            fila.id = "fila" + id;
            tablero.appendChild(fila)

            //añadir casillas a las filas
            for (let j = 0; j < 8; j++) {
                //Crear coordenadas número
                if (j == 0) {
                    const casillaCoordenada = document.createElement("div");
                    casillaCoordenada.className = "casillaCoord";
                    casillaCoordenada.style.display = "flex-start";
                    const numero = ((i + 1) - 9) * -1;
                    casillaCoordenada.textContent = numero;
                    fila.appendChild(casillaCoordenada);
                }
                const casilla = document.createElement("div");
                casilla.className = "casilla";
                casilla.id = this.coordenadasArray[posicionCoordenada];

                //Asignar color de las piezas dependiendo de si son pares o no 
                if ((i + j) % 2 == 0) {
                    casilla.style.backgroundColor = "#ffffff";
                } else {
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
        const coordenadas = ["", "a", "b", "c", "d", "e", "f", "g", "h"];
        for (let i = 0; i < 9; i++) {
            const casilla = document.createElement("div");
            casilla.className = "casillaCoord";
            casilla.textContent = coordenadas[i];
            fila.appendChild(casilla);
        }
        this.guardarCasillasHTML();
    }

    guardarCasillasHTML() {
        // Guarda referencias a los 64 elementos de casilla para evitar querySelector constantes
        const columnas = ["a", "b", "c", "d", "e", "f", "g", "h"];
        for (let fila = 1; fila <= 8; fila++) {
            for (const columna of columnas) {
                const id = columna + fila;
                this.casillasHTML[id] = document.getElementById(id);
            }
        }
    }

    limpiarTablero() {
        //Recoge todas las piezas del tablero (Por si cambias de FEN habiendo uno ya cargado)
        const piezas = tablero.querySelectorAll(".pieza");
        if (piezas.length > 0) {
            //Las elimina para limpiar el tablero
            piezas.forEach(piezaHTML => {
                piezaHTML.remove();
            });
        }
    }

    colocarPiezasHTML(tableroDigital) {
        //Recorre todas las casillas
        for (let i = 0; i < 64; i++) {
            let pieza = tableroDigital[this.coordenadasArray[i]];
            //Si hay una pieza la genera
            if (pieza != null) {
                //Obtiene el html asociado a la casilla ej "e4"
                let casillaHTML = tablero.querySelector("#" + pieza.casilla);

                const piezaHTML = document.createElement("img");
                piezaHTML.src = pieza.img;
                piezaHTML.alt = pieza.id;
                piezaHTML.className = "pieza";
                piezaHTML.id = pieza.id;

                //Desactiva la img de arrastrar
                piezaHTML.draggable = "false";
                casillaHTML.appendChild(piezaHTML);
            }
        }
    }




    //==== Marcadores Visuales ====

    iluminarCasillasPermitidas(movimientosPermitidos) {
        //Recorre las casillas del tablero y si esta en la lista de movimientosPermitidos las añade la clase permitida (Se apoya del array de coordenadas porque casillas es un diccionario)
        this.coordenadasArray.forEach(coordenada => {
            for(let j = 0; j < movimientosPermitidos.length; j++){
                if(this.casillasHTML[coordenada].id === movimientosPermitidos[j].casillaDestino){
                    this.casillasHTML[coordenada].classList.add("casillaPermitida");
                    j = movimientosPermitidos.length; //Cambiar por return ?
                }
            }
        });
    }

    limpiarCasillasIluminadas() {
        //Borra las casillas permitidas
        let casillasPermitidasHTML = document.querySelectorAll(".casillaPermitida");
        casillasPermitidasHTML.forEach(casilla => {
            casilla.classList.remove("casillaPermitida");
        });
    }

    marcarJaque(casillaReyId) {
        // Añade clase de alerta/rojo a la casilla del rey amenazado
    }

    limpiarJaque() {
        // Retira el indicador de jaque
    }


    //==== Manipular piezas ====

    moverPiezaDOM(piezaHTML, casillaDestinoId) {
        this.tablero.querySelector("#"+casillaDestinoId).appendChild(piezaHTML);
        this.limpiarEstilosPieza(piezaHTML);
    }

    limpiarEstilosPieza(piezaAgarrada){
        //Resetea los estilos de cuando clica la pieza
        piezaAgarrada.style.position = "";
        piezaAgarrada.style.left = "";
        piezaAgarrada.style.pointerEvents = "";
        piezaAgarrada.style.top = "";
        piezaAgarrada.style.zIndex = "";
    }

    eliminarPieza(casillaId) {
        this.tablero.querySelector("#"+casillaId).querySelector(".pieza").remove();
    }

    moverTorreEnroqueDOM(casillaInicioId, casillaDestinoId) {
        console.log(this.casillasHTML[casillaDestinoId])
        this.casillasHTML[casillaDestinoId].appendChild(this.casillasHTML[casillaInicioId].querySelector(".pieza"));
    }

    transformarPiezaCoronada(piezaAgarrada, piezaCoronada) {
        //Cambia la img el id y el src de la piezaHTML
        piezaAgarrada.src = piezaCoronada.img;
        piezaAgarrada.id = piezaCoronada.id;
        piezaAgarrada.alt = piezaCoronada.id;
    }

    //Arrastrar pieza
    prepararArrastre(piezaAgarrada, x, y) {
        piezaAgarrada.style.position = "fixed";
        piezaAgarrada.style.zIndex = "100";
        piezaAgarrada.style.pointerEvents = "none";
        piezaAgarrada.style.left = `${x}px`;
        piezaAgarrada.style.top = `${y}px`;
    }

    actualizarPosicionArrastre(piezaAgarrada, x, y) {
        piezaAgarrada.style.left = `${x}px`;
        piezaAgarrada.style.top = `${y}px`;
    }

    obtenerCasillaDestino(piezaAgarrada, evento){
        //Oculta la pieza para poder lanzar el "rayo" que impacta contra la casilla de debajo
        piezaAgarrada.style.visibility = "hidden"
        let casillaDestino = null;
        //Selecciona el elemento que halla en esas cordenadas
        let elemento = document.elementFromPoint(evento.clientX, evento.clientY);
        //Si existe un elemento que sea de clase casilla lo añade a casillaDestino
        if(elemento !== null){
            casillaDestino = elemento.closest(".casilla");
        }
        //Vuelve a hacerlo visible
        piezaAgarrada.style.visibility = "visible";
        return casillaDestino;
    }

    //==== PGN ====
    insertarPGN(PGN){
        //Añade el movimiento al html
        contenedorPGN.textContent = PGN;
    }

    // ==== Modales e Interfaces ==== 


    //Coronacion

    animarCoronacion(piezaHTML, casillaDestinoId) {
        const casillaHTML = this.casillasHTML[casillaDestinoId];

        //Prepara los estilos para la casilla destino
        casillaHTML.classList.add("anim-arcano");
        casillaHTML.style.position = "relative";

        //Crea el div sobre el que se ejecutan los efectos
        const efecto = document.createElement("div");
        efecto.classList.add("efecto-animacion", "fusion");

        casillaHTML.appendChild(efecto);

        //Añade la animacion a la pieza
        piezaHTML.classList.add("pieza-spawn");

        //Resetea los estilos despues de 350 ms
        setTimeout(() => {
            efecto.remove();
            piezaHTML.classList.remove("pieza-spawn");
            casillaHTML.classList.remove("anim-arcano");
            casillaHTML.style.position = "";
        }, 350);
    }

}