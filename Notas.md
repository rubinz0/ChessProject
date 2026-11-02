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


Cambiar en simular movimiento las casillas permitidas por movmientos permitidos para no liarme con "e4" o movimiento {casillaInicio: "e4"}