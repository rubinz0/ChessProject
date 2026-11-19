// const_juego = new JuegoController(new Tablero(), new VistaTablero());

// tablero.cargarDesdeFEN()//Posicion inicial
// tablero.cargarDesdeFEN(fenDelUsuario);

// let movimientosPermitidos = this.tablero.obtenerMovimientosLegales(pieza);



//Agarrar click
// this.movimientosActuales = this.tablero.obtenerMovimientosLegales(pieza);
// this.vista.iluminarCasillas(this.movimientosActuales);

//soltar
// const movimientoValido = this.movimientosActuales.find(m => m.casillaDestino === casillaDestino.id);



import { Tablero } from "./modelos/Tablero.js";
import { VistaTablero } from "./vistas/VistaTablero.js";
import { VistaModal } from "./vistas/VistaModal.js";
import { ControladorJuego } from "./controladores/ControladorJuego.js";

const tablero = new Tablero();
const vistaTablero = new VistaTablero();
const vistaModal = new VistaModal();

const controlador = new ControladorJuego(tablero, vistaTablero, vistaModal);