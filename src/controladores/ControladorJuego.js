import { Tablero } from "../modelos/Tablero.js";
import { VistaTablero } from "../vistas/VistaTablero.js";

export class ControladorJuego {
    //Modelos y Vistas
    tablero = new Tablero();
    vista = new VistaTablero();
    
    //Instancia de la pieza
    pieza = null;        
    //Etiqueta <img> del DOM
    piezaHTML = null;    
    movimientosActuales = [];
    parado = false;
    agarreX = 0;
    agarreY = 0;

    constructor() {
        this.inicializarPartida();
        this.vincularEventos();
    }

    inicializarPartida() {
        this.vista.generarTablero();
        this.tablero.cargarDesdeFEN();
        this.vista.colocarPiezasHTML(this.tablero.tableroDigital);
    }

    vincularEventos() {
        this.vista.tablero.addEventListener("mousedown", (e) => {this.clicarPieza(e)});        
        //La añadimos al documento porque si se añade a pieza y muevo el raton muy rapido la puede perder
        document.addEventListener("mousemove", (e) => this.moverPieza(e));
        document.addEventListener("mouseup", (e) => this.soltarClick(e));

    }


    clicarPieza(evento){
        if (this.parado) return;

        evento.preventDefault();

        this.piezaHTML = evento.target.closest(".pieza");
        if (!this.piezaHTML) return;

        const casillaInicioId = this.piezaHTML.parentElement.id;
        this.pieza = this.tablero.tableroDigital[casillaInicioId];

        // // Validación de turno
        // if (!piezaModelo || piezaModelo.color !== this.turno) return;


        // Medir distancias relativas
        const rect = this.piezaHTML.getBoundingClientRect();
        this.agarreX = evento.clientX - rect.left;
        this.agarreY = evento.clientY - rect.top;

        // 1. Delegar a la Vista la manipulación visual
        this.vista.prepararArrastre(this.piezaHTML, rect.left, rect.top);

        // 2. Pedir al Modelo los cálculos
        this.movimientosActuales = this.tablero.obtenerMovimientosLegales(this.pieza);
        
        // 3. Delegar a la Vista el resaltado de casillas
        this.vista.iluminarCasillasPermitidas(this.movimientosActuales);
        console.log(this.movimientosActuales)
    }

    moverPieza(evento) {
        if (!this.piezaHTML) return;

        const x = evento.clientX - this.agarreX;
        const y = evento.clientY - this.agarreY;

        // Solo llama a la vista
        this.vista.actualizarPosicionArrastre(this.piezaHTML, x, y);
    }

    async soltarClick(evento){
        // 1. Si no hay pieza levantada o el juego está bloqueado, salir
        if (!this.piezaHTML || this.parado) return;

        // 2. Pedir a la vista la casilla que está bajo el cursor
        const casillaDestinoId = this.vista.obtenerCasillaDestino(this.piezaHTML, evento).id;

        // 3. Comprobar si esa casilla es un movimiento legal precalculado
        const movimientoValido = this.movimientosActuales.find(
            (mov) => mov.casillaDestino === casillaDestinoId
        );

        // Limpiar las casillas iluminadas inmediatamente
        this.vista.limpiarCasillasIluminadas();

        if (movimientoValido) {
            // --- JUGADA VÁLIDA ---

            // A) Caso Coronación
            if (movimientoValido.tipo === "coronacion") {
                this.parado = true; // Bloquea clics mientras el modal está abierto

                // Espera a que el usuario elija en el modal de la vista
                const tipoElegido = await this.vista.abrirModalCoronacion(this.pieza.color);

                // Actualiza el modelo con la pieza coronada
                const nuevaPieza = this.tablero.coronarPeon(this.pieza, tipoElegido, movimientoValido);

                // Transforma la imagen en el DOM
                this.vista.transformarPiezaCoronada(this.piezaHTML, nuevaPieza);

                this.parado = false;
            }

            // B) Caso Enroque (mover la torre que acompaña al rey)
            if (movimientoValido.tipo.split("-")[0] === "enroque") {
                this.tablero.ejecutarEnroqueMemoria(movimientoValido);
                this.vista.moverTorreEnroqueDOM(movimientoValido.origenTorre, movimientoValido.destinoTorre);
            }
            // C) Caso Captura (si hay pieza rival en la casilla destino o al paso)
            if(movimientoValido.captura){
                this.vista.eliminarPieza(movimientoValido.casillaCaptura);
            }

            // D) Actualizar posición en Modelo y en Vista
            this.tablero.moverPieza(this.pieza, casillaDestinoId);
            this.vista.moverPiezaDOM(this.piezaHTML, casillaDestinoId);

            this.tablero.guardarMovimiento(movimientoValido);
            this.vista.insertarPGN(this.tablero.pgn);

        } else {
            // --- JUGADA INVÁLIDA ---
            // Vuelve a colocar la pieza en su casilla de origen sin cambios
            this.vista.limpiarEstilosPieza(this.piezaHTML);
        }

        // 5. Resetear el estado del controlador
        this.pieza = null;
        this.piezaHTML = null;
        this.movimientosActuales = [];

    }
}