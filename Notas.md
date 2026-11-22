{
  origen: "e2",                   // De dónde sale
  destino: "e4",                  // A dónde va
  tipo: "normal",                 // "normal" | "enroque-corto" | "enroque-largo" | "al-paso" | "coronacion"
  captura: false,                 // true / false
  piezaCapturada: null            // Instancia de la pieza comida (o null)
}

Cambiar el casillasPermitidas por Movimientos permitidos sinedo [e4] movimientos[{casilla: "e4", tipo: ......}]


antes cambiar
function calcularMovimientos(pieza){
    console.log("Calcular movimientos");
    let movimientosPermitidos = [];
    let casillaInicio = pieza.casilla;
    let piezaId = pieza.id.split("-");
    let valido = false;
    // let pieza = piezaAgarrada.id;
    // let pieza = pieza2.id.split("-");
    //Esto resetea las casillas y permite calcular los movimientos posibles sobre la casilla destino. (Al guardar movimiento tengo que saber si doy jaque y para eso 
    // calculo si en el siguiente movimiento encuentra al rey por lo que vuelvo a calcular los movimientos)
    
    
    //Para resetear las casillas sin reasignar el valor casillasPermitidas = []
    movimientosPermitidos.splice(0, movimientosPermitidos.length); 


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
        movimientosPermitidos.push(...pieza.calcularMovimientos(tableroDigital, casillaInicio));
    }
    
    //Torres
    if(piezaId[1] == "torre"){
        movimientosPermitidos.push(...pieza.calcularMovimientos(tableroDigital, casillaInicio));
        console.log("Movimientos permitidos: ", JSON.parse(JSON.stringify(movimientosPermitidos)))

    }
    //Caballos
    if(piezaId[1] === "caballo"){
        movimientosPermitidos.push(...pieza.calcularMovimientos(tableroDigital, casillaInicio));
    }
    //Alfiles
    if(piezaId[1] === "alfil"){
        movimientosPermitidos.push(...pieza.calcularMovimientos(tableroDigital, casillaInicio));
    }
    //Damas
    if(piezaId[1] === "dama"){
        movimientosPermitidos.push(...pieza.calcularMovimientos(tableroDigital, casillaInicio));
    }
    //Rey
    if(piezaId[1] === "rey"){
        console.warn(JSON.parse(JSON.stringify(tableroDigital)))
        movimientosPermitidos.push(...pieza.calcularMovimientos(tableroDigital, casillaInicio));
    }

    return movimientosPermitidos;
}

Antiguo colocarPiezas:
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

// colocarPiezas();


Cambiar en simular movimiento las casillas permitidas por movmientos permitidos para no liarme con "e4" o movimiento {casillaInicio: "e4"}

Cuando enroco cambiar si la torre se ha movido true





const contadorPiezas = {
    blanco: { peon: 0, torre: 0, caballo: 0, alfil: 0, dama: 0, rey: 0 },
    negro:  { peon: 0, torre: 0, caballo: 0, alfil: 0, dama: 0, rey: 0 }
};
contadorPiezas["blanco"]["torre"]++




Opción 1: «Invocación con Vuelo Directo» (.anim-vuelo)
Usa variables CSS dinámicas para saber desde dónde vuela el clon.

CSS
/* La pieza clonada que viaja desde el modal hasta la casilla */
.pieza-fantasma-vuelo {
  position: fixed;
  z-index: 1001;
  pointer-events: none;
  width: 70px;
  height: 70px;
  object-fit: contain;
  /* Transición hacia las coordenadas destino calculadas por JS */
  transition: 
    top 0.32s cubic-bezier(0.2, 0.8, 0.2, 1),
    left 0.32s cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 0.32s cubic-bezier(0.2, 0.8, 0.2, 1),
    opacity 0.32s ease;
}

/* Onda expansiva en la casilla al aterrizar */
.efecto-impacto-vuelo::after {
  content: '';
  position: absolute;
  inset: -10px;
  border-radius: 50%;
  border: 3px solid #ffd700;
  box-shadow: 0 0 20px #ffd700;
  pointer-events: none;
  animation: ondaImpacto 0.35s ease-out forwards;
}

@keyframes ondaImpacto {
  0% { transform: scale(0.2); opacity: 1; }
  100% { transform: scale(1.6); opacity: 0; }
}
Opción 2: «Sello Arcano / Supernova» (.anim-arcano)
Aro rúnico que se expande hacia fuera mientras la pieza cae rebotando con luz mística.

CSS
/* Aro rúnico dorado que estalla hacia afuera */
.anim-arcano::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 4px solid #00f2fe;
  background: radial-gradient(circle, rgba(0, 242, 254, 0.4) 0%, transparent 70%);
  box-shadow: 0 0 25px #00f2fe, inset 0 0 15px #4facfe;
  pointer-events: none;
  z-index: 10;
  animation: supernovaAro 0.35s ease-out forwards;
}

/* La pieza cae desde arriba con rebote */
.anim-arcano img {
  animation: caidaArcana 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

@keyframes supernovaAro {
  0% { transform: scale(0.1) rotate(0deg); opacity: 1; }
  100% { transform: scale(2.2) rotate(180deg); opacity: 0; }
}

@keyframes caidaArcana {
  0% {
    transform: translateY(-40px) scale(0.6);
    filter: brightness(3) drop-shadow(0 0 15px #00f2fe);
    opacity: 0;
  }
  70% {
    transform: translateY(0) scale(1.15);
    filter: brightness(1.5) drop-shadow(0 0 8px #00f2fe);
  }
  100% {
    transform: translateY(0) scale(1);
    filter: brightness(1) drop-shadow(0 2px 5px rgba(0,0,0,0.5));
    opacity: 1;
  }
}
Opción 3: «Caída de Meteorito / Slam Terrestre» (.anim-slam)
Impacto seco, aplastamiento y un leve temblor (screen shake) en el tablero.

CSS
/* Sacudida breve para el contenedor del tablero */
.tablero-temblor {
  animation: temblorTablero 0.2s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

/* La pieza desciende a toda velocidad y se comprime al golpear */
.anim-slam img {
  animation: meteoritoSlam 0.28s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

/* Chispas/polvo que salen de la casilla */
.anim-slam::after {
  content: '';
  position: absolute;
  inset: -15px;
  background: radial-gradient(circle, rgba(255, 120, 0, 0.8) 0%, transparent 60%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 10;
  animation: chispaSlam 0.25s ease-out forwards;
}

@keyframes meteoritoSlam {
  0% {
    transform: translateY(-80px) scale(2.2);
    opacity: 0;
  }
  60% {
    transform: translateY(0) scaleX(1.3) scaleY(0.7); /* Se aplasta contra el suelo */
    opacity: 1;
  }
  80% {
    transform: translateY(-8px) scaleX(0.9) scaleY(1.1); /* Rebote hacia arriba */
  }
  100% {
    transform: translateY(0) scale(1);
  }
}

@keyframes chispaSlam {
  0% { transform: scale(0.3); opacity: 1; filter: blur(0px); }
  100% { transform: scale(1.8); opacity: 0; filter: blur(4px); }
}

@keyframes temblorTablero {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 1px, 0); }
  30%, 50%, 70% { transform: translate3d(-3px, -1px, 0); }
  40%, 60% { transform: translate3d(3px, 1px, 0); }
}
Opción 4: «Fusión / Cristalización» (.anim-fusion)
El peón brilla al máximo, se desintegra en un flash blanco y la nueva pieza nace desde dentro.

CSS
/* Resplandor blanco que brota del centro */
.anim-fusion::before {
  content: '';
  position: absolute;
  inset: 5px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 0 30px #ffffff, 0 0 60px #ffd700;
  pointer-events: none;
  z-index: 10;
  animation: flashFusion 0.3s ease-out forwards;
}

/* La nueva pieza emerge expandiéndose desde el núcleo */
.anim-fusion img {
  animation: nacimientoPieza 0.32s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes flashFusion {
  0% { transform: scale(0.2); opacity: 1; }
  50% { transform: scale(1.4); opacity: 0.9; }
  100% { transform: scale(2); opacity: 0; }
}

@keyframes nacimientoPieza {
  0% {
    transform: scale(0) rotate(-45deg);
    filter: brightness(4);
    opacity: 0;
  }
  60% {
    transform: scale(1.2) rotate(5deg);
    filter: brightness(2);
  }
  100% {
    transform: scale(1) rotate(0deg);
    filter: brightness(1);
    opacity: 1;
  }
}




Para alternar limpiamente entre un Modo Partida (con turnos estrictos y reglas completas) y un Modo Libre / Editor (sin restricciones de turno, ideal para probar posiciones desde FEN), el secreto en MVC está en no llenar tu código de if (modoEditor) por todas partes, sino centralizar el estado en el Modelo (Tablero.js) y poner un único filtro de entrada en el Controlador (ControladorJuego.js).

Aquí tienes el plan detallado de cómo organizarlo paso a paso:

1. El estado vive en el Modelo (Tablero.js)
Tu clase Tablero debe ser la única fuente de verdad sobre qué está pasando en la partida. Añade dos propiedades de estado a su instancia:

turnoActual: Un string que empieza en "blancas" (o el turno que indique el FEN si cargas uno, ya que el segundo bloque de un FEN es "w" o "b").

modoPartida (o respetarTurnos): Un booleano (true para partida normal con reglas de turno, false para modo libre/editor).

Y dentro del mismo Tablero, crea dos métodos pequeños:

Un método para alternar el turno: Cambia "blancas" por "negras" y viceversa.

Un método para cambiar de modo: Activa o desactiva modoPartida (y, si pasas de modo libre a modo partida, te permite fijar a quién le toca mover).

2. El Controlador actúa como portero (ControladorJuego.js)
No modifiques cómo las piezas calculan sus movimientos (Peon, Caballo, Rey siguen calculando sus movimientos exactamente igual que ahora). El bloqueo de turno se hace en un único punto: al hacer clic para agarrar una pieza (agarrarClick o seleccionarPieza).

Al detectar que el usuario hace clic sobre una pieza:

Compruebas si tablero.modoPartida está activado (true).

Si está activado, comparas el color de la pieza clicada con tablero.turnoActual.

Si no coinciden, cortas la ejecución inmediatamente (return): ni se levanta la pieza, ni se iluminan sus casillas, ni se permite arrastrarla.

Si modoPartida está desactivado (false), te saltas esa comprobación y dejas mover cualquier pieza de cualquier color en cualquier momento, exactamente como te funciona ahora.

3. Cuándo y dónde cambia el turno
El turno nunca debe cambiar al agarrar una pieza ni al soltarla en una casilla inválida. Solo cambia al final de soltarClick, una vez que:

Se ha confirmado que el movimiento es válido.

Si había coronación, el jugador ya eligió la pieza en el modal y se completó la transformación.

El movimiento ya se ejecutó en tableroDigital, en la Vista y se guardó en el historial/PGN.

Justo como último paso de una jugada completada, llamas al método del tablero que alterna el turno (puedes hacerlo siempre o solo cuando modoPartida === true; si lo alternas siempre en segundo plano, incluso en modo libre sabrás a quién le tocaría si activas el modo partida en ese instante).

4. Qué pasa al cargar un FEN
Como ya tienes soporte para FEN, aprovecha ese mismo flujo para sincronizar el turno:

Cuando cargues un FEN estándar (por ejemplo ... w KQkq - 0 1), lee el segundo campo ("w" o "b") para establecer tablero.turnoActual en "blancas" o "negras".

Si cargas un FEN incompleto (solo las piezas, típico de un editor rápido), deja "blancas" por defecto o permite que un selector en la interfaz elija quién empieza.

5. La Vista (VistaTablero o interfaz) solo refleja el estado
Para que el usuario sepa en qué modo está y a quién le toca:

Indicador de turno: Cuando cambie el turno en el Modelo, el Controlador le pide a la Vista que actualice un indicador visual (un texto "Turno: Blancas", un punto de color o el resaltado del reloj). En modo libre, ese indicador puede mostrar "Modo libre".

Botón/Interruptor de modo: Un simple botón en la interfaz escuchado por el Controlador que llama al método del tablero para alternar modoPartida y actualiza el indicador visual.

Resumen del orden de implementación recomendado
Paso 1: Añade turnoActual y modoPartida a Tablero.js con sus métodos para alternarlos.

Paso 2: Añade la barrera de comprobación al inicio de agarrarClick en ControladorJuego.js y la llamada a cambiar turno al final de soltarClick.

Paso 3: Conecta la lectura del turno (w/b) en tu cargador de FEN.

Paso 4: Añade el botón de cambio de modo y el indicador de turno en la interfaz.

Paso 5 (Siguiente fase): Una vez que los turnos estén cerrados, ya tendrás el dato clave (turnoActual del rival) para comprobar jaque mate y ahogado justo después de cada cambio de turno.