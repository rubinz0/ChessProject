import { Tablero } from "../modelos/Tablero.js";
import { VistaModal } from "../vistas/VistaModal.js";
import { VistaTablero } from "../vistas/VistaTablero.js";

export class ControladorJuego {
    //Instancia de la pieza
    pieza = null;      
    piezaCoronada = null;  
    //Etiqueta <img> del DOM
    piezaHTML = null;    
    movimientosActuales = [];
    parado = false;
    agarreX = 0;
    agarreY = 0;

    constructor(tablero, vistaTablero, vistaModal) {
        //Modelos y Vistas
        this.tablero = tablero;
        this.vistaTablero = vistaTablero;
        this.vistaModal = vistaModal;


        this.inicializarPartida();
        this.vincularEventos();
    }

    //==== Funciones para iniciar el controlador ====


    inicializarPartida() {
        this.vistaTablero.generarTablero();
        this.tablero.cargarDesdeFEN();
        this.vistaTablero.colocarPiezasHTML(this.tablero.tableroDigital);
    }

    vincularEventos() {
        this.vistaTablero.tablero.addEventListener("mousedown", (e) => {this.clicarPieza(e)});        
        //La añadimos al documento porque si se añade a pieza y muevo el raton muy rapido la puede perder
        document.addEventListener("mousemove", (e) => this.moverPieza(e));
        document.addEventListener("mouseup", (e) => this.soltarClick(e));
        this.vistaTablero.vincularListeners(() => {
            this.cambiarModo();
        });
    }

    //==== Clicar, mover, arrastrar, soltar ====

    clicarPieza(evento){
        if (this.parado) return;

        evento.preventDefault();

        this.piezaHTML = evento.target.closest(".pieza");
        if (!this.piezaHTML) return;

        const casillaInicioId = this.piezaHTML.parentElement.id;
        this.pieza = this.tablero.tableroDigital[casillaInicioId];

        //Comprobacion del turno (Si hay partida y no es tu turno lo cancela)
        if(this.tablero.modoPartida && this.pieza.color !== this.tablero.turno) {
            this.piezaHTML = null;
            this.pieza = null;
            return
        }

        //Mide distancias con la pieza para agarrarla en el punto exacto (Que no se agarre por el centro siempre)
        const rect = this.piezaHTML.getBoundingClientRect();
        this.agarreX = evento.clientX - rect.left;
        this.agarreY = evento.clientY - rect.top;

        //La vista asigna los estilos a la pieza para el arrastre (cambia la posicion y "levanta" la pieza en el eje y)
        this.vistaTablero.prepararArrastre(this.piezaHTML, rect.left, rect.top);

        //Procesa toda la logica de los movimientos legales
        this.movimientosActuales = this.tablero.obtenerMovimientosLegales(this.pieza);
        
        //Ilumina las casillas a las que se puede mover
        this.vistaTablero.iluminarCasillasPermitidas(this.movimientosActuales);
    }

    moverPieza(evento) {
        if (!this.piezaHTML) return;
        //Cancela el arrastre si estas coronando
        if(this.parado) return;

        const x = evento.clientX - this.agarreX;
        const y = evento.clientY - this.agarreY;

        //Pasa los datos a la vista para que arrastre la pieza
        this.vistaTablero.actualizarPosicionArrastre(this.piezaHTML, x, y);
    }

    async soltarClick(evento){
        //Si no hay una pieza agarrada o el juego está bloqueado sale
        if (!this.piezaHTML || this.parado) return;

        //Llama a la vista para obtener la casilla donde suelta la pieza
        let casillaDestinoId = this.vistaTablero.obtenerCasillaDestino(this.piezaHTML, evento);
        //Comprueba que esa casilla existe si no devuelve la pieza y resetea todo
        if(casillaDestinoId != null){
            casillaDestinoId = casillaDestinoId.id;
        }else{
            //Limpia las casillas iluminadas
            this.vistaTablero.limpiarCasillasIluminadas();
            //Vuelve a colocar la pieza en su casilla de inicio sin cambios
            this.vistaTablero.limpiarEstilosPieza(this.piezaHTML);
            //Resetea los valores de controlador
            this.pieza = null;
            this.piezaHTML = null;
            this.movimientosActuales = [];
            return
        }

        //Comprueba si la casilla seleccionada coincide con una casilla valida (Guardada en movimientosActuales)
        const movimientoValido = this.movimientosActuales.find(
            (mov) => mov.casillaDestino === casillaDestinoId
        );

        //Limpia las casillas iluminadas
        this.vistaTablero.limpiarCasillasIluminadas();

        //Si el movimiento es valido se comprueba el tipo de movimiento y se mueve
        if (movimientoValido) {
            //Elimina el jaque en caso de que halla
            this.vistaTablero.limpiarJaque(this.tablero.casillasRey());

            //Coronacion
            if (movimientoValido.tipo === "coronacion") {
                //Bloquea el controlador mientras estamos coronando
                this.parado = true;

                //Se abre el modal de coronacion y espera a que elija
                const tipoElegido = await this.vistaModal.abrirModalCoronacion(this.pieza.color);

                //Instancia la pieza coronada
                const nuevaPieza = this.tablero.coronarPeon(tipoElegido, movimientoValido);

                //Transforma la imagen en el DOM
                this.vistaTablero.transformarPiezaCoronada(this.piezaHTML, nuevaPieza);

                //Cierra el modal
                this.vistaModal.cerrarModalCoronacion();

                //Asigna la animacion
                this.vistaTablero.animarCoronacion(this.piezaHTML, movimientoValido.casillaDestino);

                //Cambia la pieza actual por la coronada y cambia el estado para que siga la ejecucion
                this.pieza = nuevaPieza;
                this.parado = false;
            }

            //Enroques
            if (movimientoValido.tipo.split("-")[0] === "enroque") {
                //Mueve la torre dependiendo del lado
                this.tablero.ejecutarEnroqueMemoria(movimientoValido);

                //Guarda los datos para mandarselos a la Vista
                let origenTorre;
                let destinoTorre;
                //La fila la saco del rey que enroca
                if(movimientoValido.tipo.split("-")[1] === "corto"){
                    origenTorre = "h" + movimientoValido.casillaInicio[1];
                    destinoTorre = "f" + movimientoValido.casillaDestino[1];
                }else{
                    origenTorre = "a" + movimientoValido.casillaInicio[1];
                    destinoTorre = "d" + movimientoValido.casillaDestino[1];
                }
                //Mueve las torres del DOM
                this.vistaTablero.moverTorreEnroqueDOM(origenTorre, destinoTorre);
            }

            //Captura
            if(movimientoValido.captura){
                this.tablero.registrarCaptura(movimientoValido);
                this.vistaTablero.eliminarPieza(movimientoValido.casillaCaptura);
            }

            //Mueve la pieza del Tablero y de la Vista
            this.tablero.moverPieza(this.pieza, casillaDestinoId);
            this.vistaTablero.moverPiezaDOM(this.piezaHTML, casillaDestinoId);
            
            //Guarda el movimiento y genera el pgn
            this.tablero.guardarMovimiento(movimientoValido);
            //Inserta el pgn
            this.vistaTablero.insertarPGN(this.tablero.pgn);

            //Si esta en partida cambia el turno
            if (this.tablero.modoPartida) {
                this.cambiarTurno();
            }

            const movimientosLegales = this.tablero.hayMovimientosLegales(movimientoValido.pieza.color);

            if(movimientoValido.jaque){
                this.vistaTablero.marcarJaque(this.tablero.buscarCasillaRey(movimientoValido.pieza.color));

                if(!movimientosLegales){
                    this.parado = true;
                    console.log("MATE gana: " , movimientoValido.pieza.color);
                    this.vistaModal.abrirModalFinPartida("Mate", movimientoValido.pieza.color);
                }
            }else{
                if(!movimientosLegales){
                    this.parado = true;
                    console.log("Ahogado: ");
                    this.vistaModal.abrirModalFinPartida("Ahogado");
                }
            }
        } else {
            //Jugada ilegal
            //Vuelve a colocar la pieza en su casilla de inicio sin cambios
            this.vistaTablero.limpiarEstilosPieza(this.piezaHTML);
        }

        //Resetea los valores de controlador
        this.pieza = null;
        this.piezaHTML = null;
        this.movimientosActuales = [];
    }

    //==== Modificar partida ====

    cambiarModo(){
        this.tablero.cambiarModoPartida();
        this.vistaTablero.cambiarModoPartida();
    }

    cambiarTurno(){
        this.tablero.cambiarTurno();
        this.vistaTablero.cambiarTurno();
    }
}