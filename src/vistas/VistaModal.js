export class VistaModal {
    modalCoronacion = document.querySelector("#modalCoronacion");
    modalFinPartida = document.querySelector("#modal-fin");
    
    constructor() {
        //Diccionario con las casillas HTML
        this.casillasHTML = {};
        //Modal coronacion
        this.modalCoronacion.addEventListener("click", (evento) => this.seleccionarPiezaCoronacion(evento));
    }

    //Coronacion

    abrirModalCoronacion(color) {

        //Asigna img de las piezas del modal segun el color del peon que corona
        document.getElementById("img-dama").src = `/img/piezas/${color}-dama.webp`;
        document.getElementById("img-torre").src = `/img/piezas/${color}-torre.webp`;
        document.getElementById("img-alfil").src = `/img/piezas/${color}-alfil.webp`;
        document.getElementById("img-caballo").src = `/img/piezas/${color}-caballo.webp`;

        //Muestra el modal
        modalCoronacion.classList.remove("oculto");

        //Devolvemos una promesa que esperará a que el usuario pinche una opción
        return new Promise((resolve) => {
            this.resolverCoronacion = resolve;
        });
    }

    cerrarModalCoronacion(){
        modalCoronacion.classList.add("oculto");
    }

    seleccionarPiezaCoronacion(evento) {
        //Recoge la pieza de la opcion seleccionada
        const opcion = evento.target.closest("[data-pieza]");
        //Si clica fuera de una opcion no hace nada
        if (!opcion) return;

        //Devuelve el promise con la pieza seleccionada
        this.resolverCoronacion?.(opcion.dataset.pieza);
        //Limpia la promesa para que no devuelva dos veces si se clica muy rapido
        this.resolverCoronacion = null;
    }

    //Fin de partida
    abrirModalFinPartida(resultado, ganador = null) {
        document.querySelector("#modal-resultado").textContent = resultado;
        const textoGanador = document.querySelector("#modal-ganador");

        if (ganador) {
            textoGanador.textContent = `Ganan las ${ganador}s`;
            textoGanador.style.display = "block";
        } else {
            textoGanador.style.display = "none";
        }

        this.modalFinPartida.classList.remove("oculto");
    }

    cerrarModalFinPartida() {
        this.modalFinPartida.classList.add("oculto");
    }

}