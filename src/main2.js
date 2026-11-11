// const_juego = new JuegoController(new Tablero(), new VistaTablero());

// tablero.cargarDesdeFEN()//Posicion inicial
// tablero.cargarDesdeFEN(fenDelUsuario);

// let movimientosPermitidos = this.tablero.obtenerMovimientosLegales(pieza);



//Agarrar click
// this.movimientosActuales = this.tablero.obtenerMovimientosLegales(pieza);
// this.vista.iluminarCasillas(this.movimientosActuales);

//soltar
// const movimientoValido = this.movimientosActuales.find(m => m.casillaDestino === casillaDestino.id);


import { ControladorJuego } from "./controladores/ControladorJuego.js";

// Arranca el juego al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
    new ControladorJuego();
});