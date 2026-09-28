# ChessProject

El tablero esta creado con las coordenadas puestas, las casillas tienen como id su coordenada correcta para poder luego asignar la pieza a su jugada
Las piezas de inicio se colocan en forma de barrido escaneando todas las casillas y colocando dependiendo de su posición entiendo que al haber la gran mayoría de piezas duplicadas y todos los peones juntos es más fácil pero para partidas mejor usar el id en vez de el query selectorAll casillas sin más

Si quiero colocar una pieza o filtrar una casilla solo tengo que hacer un foreach del query selector all y comparar el element.id con ="a5" por ejemplo

ahora las img de las piezas tienen id representativo por lo que se puede filtrar las img dentro de tablero y tienes una lista de piezas que puedes separar con el id



Piezas:

Arrastrables _/
Arrastrar con su imagen /
Colocar sobre una casilla _/
Colocar sobre una pieza _/ Eliminar la pieza de debajo
Movimiento de:
Peon _/ Falta en passant
Torre
Caballo
Alfil
Dama
Rey

Quitar mouse raro de arrastrar





Codigo antiguo con draggable

generarTablero ....
            // casilla.addEventListener("dragenter", dragEnter);
            // casilla.addEventListener("dragleave", dragLeave);
            // casilla.addEventListener("dragover", dragOver);
            // casilla.addEventListener("drop", drop);



pieza ....
            // pieza.addEventListener("dragstart", arrastrarPieza);
            // pieza.onclick = arrastrarPieza;
            // pieza.addEventListener("dragstart", arrastrarPieza);
            // pieza.addEventListener("dragend", soltarPieza);



// function arrastrarPieza(evento) {
//     //Crear copia de la pieza para que no se arrastre el fondo
//     const imgCopia = new Image()
//     imgCopia.src = evento.target.src;
//     imgCopia.style.width = "50px";
//     imgCopia.style.height = "50px";
//     imgCopia.style.position = "absolute";
//     imgCopia.style.top = "-9999px";
//     imgCopia.style.left = "-9999px";
//     imgCopia.className = "copiaPieza";
//     imgCopia.style.opacity = "0.2";
//     //Añadimos al body pero fuera de la pantalla
//     document.body.appendChild(imgCopia)
//     //Le pasamos el elemento y la posicion para que este centrado
//     evento.dataTransfer.setDragImage(imgCopia, 30, 30);
//     //Si da error añadir 0,01 en el timeout para que se asegure de terminar la "foto" de la copia y luego lo borra
//     setTimeout(() => {
//         document.querySelector("#copiaPieza").remove();
//     }, 0);

//     evento.dataTransfer.setData('text/plain', evento.target.id);
// }   

// function arrastrarPieza2(){
//     console.log("Me estan arrastrando")
// }

// function soltarPieza(){
//     console.log("soltar");
// }



// function dragEnter(e){
//     console.log("han entrado en: " + e.target.id)
// }

// function dragLeave(e){
//     console.log("han salido de: " + e.target.id)
// }

// function drop(event){
//     event.preventDefault();
//     const data = event.dataTransfer.getData("text");
//     const idPieza = tablero.querySelectorAll(data);
//     console.log("Pieza: " + event.id + " soltada en: " + event.target.id);
//     console.log(idPieza)
//     event.target.appendChild(idPieza)
// }

// function dragOver(e){
//     e.preventDefault();
// }





Codigo peon antes de simplificar blanco y negro
Codigo peon simplificado
    if(pieza[1] == "peon"){
        // i = numero resta positivo o negativo j = casilla inicio peon 7 o 2 e = numero que avanza o retrocede desde la casilla inicio
        let i;
        let j;
        let e;
        let color;
        if(pieza[0] === "blanco"){
            i = 1;
            j = 2;
            e = 2;
            color = "n";
        }else{
            i = -1;
            j = 7;
            e = -2;
            color = "b";
        }
        //Calculamos si puede mover doble y la casilla donde puede haber una pieza ej: f4  f + 4-1  f3(Si hay una pieza no dejamos mover)
        if (numeroCasillaInicio == j && tableroDigital[letraCasillaInicio + (numeroCasillaInicio + i)] === "null") {
            casillasPermitidas.push(letraCasillaInicio + (numeroCasillaInicio + e));
        }
        if (tableroDigital[letraCasillaInicio + (numeroCasillaInicio + i)] === "null" && !(tableroDigital[letraCasillaInicio + (numeroCasillaInicio + i)] === undefined)) {
            casillasPermitidas.push(letraCasillaInicio + (numeroCasillaInicio + i));
        }
        //Calcula la fila izquierda y derecha
        //Calcula
        if (!(tableroDigital[letras[numeroColumna[letraCasillaInicio] + i] + (numeroCasillaInicio + i)] === "null")) {
            if (tableroDigital[letras[numeroColumna[letraCasillaInicio] + i] + (numeroCasillaInicio + i)][0] === color) {
                casillasPermitidas.push(letras[numeroColumna[letraCasillaInicio] + i] + (numeroCasillaInicio + i));
            }
        }
        if (!(tableroDigital[letras[numeroColumna[letraCasillaInicio] - i] + (numeroCasillaInicio + i)] === "null")) {
            if (tableroDigital[letras[numeroColumna[letraCasillaInicio] - i] + (numeroCasillaInicio + i)][0] === color) {
                casillasPermitidas.push(letras[numeroColumna[letraCasillaInicio] - i] + (numeroCasillaInicio + i));
            }
        }
    }




Funcion antigua de validar movimiento

//Esta funcion comprueba si puedes soltar la pieza en esa casilla. En un futuro se puede modificar para diferentes modos de juego o desactivar para un tablero de analisis;
function validarMovimiento(piezaAgarrada, casillaInicio, casillaDestino){
    let valido = false;
    let pieza = piezaAgarrada.id;
    pieza = pieza.split("-");
    const letraCasillaInicio = casillaInicio.id[0];
    const numeroCasillaInicio = parseInt(casillaInicio.id[1]);
    const letraCasillaDestino = casillaDestino.id[0];
    const numeroCasillaDestino = parseInt(casillaDestino.id[1]);
    //En esta variable se guarda la distancia entre las filas si es de 1 son adyacentes
    let filaAdyacente = 0;

    //Peones
    if(pieza[1] === "peon"){
        //Unica pieza que comprueba esto
        if(pieza[0] === "blanco"){
            //Si estan en la misma fila
            if(letraCasillaDestino == letraCasillaInicio){
                //Si avanza una o dos casillas desde la posicion de inicio de partida
                if(numeroCasillaInicio == 2 &&  numeroCasillaDestino == 4){
                    //Calculamos la casilla donde puede haber una pieza ej: f4  f + 4-1  f3(Si hay una pieza no dejamos mover)
                    let numeroCasillaDestinoNueva = numeroCasillaDestino - 1;
                    let coordenadaNueva = letraCasillaDestino + numeroCasillaDestinoNueva;
                    //Comprueba si una casilla antes hay una pieza y en la casilla final
                    if(tableroDigital[coordenadaNueva] === "null" && tableroDigital[casillaDestino.id] === "null"){
                        valido = true;
                    }else{
                        valido = false;
                    }
                    
                }if(numeroCasillaDestino == numeroCasillaInicio +1){
                    //Si la casilla esta vacia avanza
                    if(tableroDigital[casillaDestino.id] === "null"){
                        valido = true;
                    }else{
                        valido = false;
                    }
                }
            }

            //Si la casilla esta en las filas adyacentes
            //Calcula fila esta izquierda o derecha
            if(letras.indexOf(letraCasillaDestino) > letras.indexOf(letraCasillaInicio)){
                filaAdyacente = letras.indexOf(letraCasillaDestino) - letras.indexOf(letraCasillaInicio);
            }
            if(letras.indexOf(letraCasillaDestino) < letras.indexOf(letraCasillaInicio)){
                filaAdyacente = letras.indexOf(letraCasillaInicio) - letras.indexOf(letraCasillaDestino);
            }
            //Si esta, es una casilla 1 posicion mas adelante (1 diagonal) y hay una pieza. Mueve (Comprueba que no sea blanco)
            if(filaAdyacente == 1 && (numeroCasillaDestino - numeroCasillaInicio) == 1 && !(tableroDigital[casillaDestino.id] == "null")){
                const color = tableroDigital[casillaDestino.id].split("-");
                if(color[0] == "negro"){
                    valido = true;
                }
            }

        }else{
            //Si estan en la misma fila
            if(letraCasillaDestino == letraCasillaInicio){
                //Si avanza una o dos casillas desde la posicion de inicio de partida
                if(numeroCasillaInicio == 7 && (numeroCasillaDestino == 6 | numeroCasillaDestino == 5)){
                    let numeroCasillaDestinoNueva = numeroCasillaDestino + 1;
                    let coordenadaNueva = letraCasillaDestino + numeroCasillaDestinoNueva;
                    //Comprueba si una casilla antes hay una pieza
                    if(tableroDigital[coordenadaNueva] === "null" && tableroDigital[casillaDestino.id] === "null"){
                        valido = true;
                    }else{
                        valido = false;
                    }
                }
                if(numeroCasillaDestino == numeroCasillaInicio -1){
                    //Si la casilla esta vacia avanza
                    if(tableroDigital[casillaDestino.id] === "null"){
                        valido = true;
                    }else{
                        valido = false;
                    }
                }
            }
            //Calcula fila esta izquierda o derecha
            if(letras.indexOf(letraCasillaDestino) > letras.indexOf(letraCasillaInicio)){
                filaAdyacente = letras.indexOf(letraCasillaDestino) - letras.indexOf(letraCasillaInicio);
            }else{
                filaAdyacente = letras.indexOf(letraCasillaInicio) - letras.indexOf(letraCasillaDestino);
            }
            //Si esta, es una casilla 1 posicion mas adelante (1 diagonal) y hay una pieza. Mueve(Comprueba que no sea negro)
            if(filaAdyacente == 1 && (numeroCasillaInicio - numeroCasillaDestino) == 1 && !(tableroDigital[casillaDestino.id] == "null")){
                const color = tableroDigital[casillaDestino.id].split("-");
                if(color[0] == "blanco"){
                    valido = true;
                }
                
            }
        }
    }
    //Torres
    //Caballos

    //Alfiles

    //Dama

    //Rey

    if(valido){
        //Comprobar si hay una pieza en la casilla destino
        if(!(tableroDigital[casillaDestino.id] === "null")){
            //Comer pieza
            const piezaComida = casillaDestino.querySelector(".pieza");
            piezaComida.remove();
            // capturarPieza(piezaAgarrada, casillaDestino)
        }
        //Actualiza tablero en memoria con la jugada actual
        tableroDigital[casillaInicio.id] = "null";
        tableroDigital[casillaDestino.id] = piezaAgarrada.id;
        console.log(tableroDigital)
    }
    return valido;
}



TORRES ANTES DE OPTIMIZAR
            casillasRestantes = 8 - numeroCasillaInicio;
            //Bucle controla las casillas hacia arriba
            while(casillasRestantes > 0){
                numeroActualCasilla++;
                if(tableroDigital[letraCasillaInicio+numeroActualCasilla] == "null"){
                    casillasPermitidas.push(letraCasillaInicio+numeroActualCasilla);
                }else{
                    //Comprueba si despues de la ultima casilla hay una pieza que pueda comer
                    if(tableroDigital[letraCasillaInicio+numeroActualCasilla].split("-")[0] != piezaAgarrada.id.split("-")[0]){
                        casillasPermitidas.push(letraCasillaInicio+numeroActualCasilla);
                    }
                    break;
                }
                casillasRestantes--;
            }
            casillasRestantes = numeroCasillaInicio - 1;
            numeroActualCasilla = numeroCasillaInicio;
            //Bucle controla las casillas hacia abajo
            while(casillasRestantes > 0){
                numeroActualCasilla--;
                if(tableroDigital[letraCasillaInicio+numeroActualCasilla] == "null"){
                    casillasPermitidas.push(letraCasillaInicio+numeroActualCasilla);
                }else{
                    //Comprueba si despues de la ultima casilla hay una pieza que pueda comer
                    if(tableroDigital[letraCasillaInicio+numeroActualCasilla].split("-")[0] != piezaAgarrada.id.split("-")[0]){
                        casillasPermitidas.push(letraCasillaInicio+numeroActualCasilla);
                    }
                    break;
                }
                casillasRestantes--;
            }

            casillasRestantes = 8 - parseInt(numeroColumna[letraCasillaInicio]);
            //Bucle controla las casillas hacia derecha
            let i = 0;
            while(casillasRestantes > 0){
                letraActualCasilla = letras.indexOf(letraCasillaInicio) + 1;
                if(tableroDigital[letras[letraActualCasilla + i]+numeroCasillaInicio] == "null"){
                    casillasPermitidas.push(letras[letraActualCasilla + i] + numeroCasillaInicio);
                }else{
                    //Comprueba si despues de la ultima casilla hay una pieza que pueda comer
                    if(tableroDigital[letras[letraActualCasilla + i]+numeroCasillaInicio].split("-")[0] != piezaAgarrada.id.split("-")[0]){
                        casillasPermitidas.push(letras[letraActualCasilla + i] + numeroCasillaInicio);
                    }
                    break;
                }
                casillasRestantes--;
                i++;
            }
            casillasRestantes = parseInt(numeroColumna[letraCasillaInicio]) - 1;
            //Bucle controla las casillas hacia izquierda
            i = 0;
            while(casillasRestantes > 0){
                letraActualCasilla = letras.indexOf(letraCasillaInicio) - 1;
                if(tableroDigital[letras[letraActualCasilla - i]+numeroCasillaInicio] == "null"){
                    casillasPermitidas.push(letras[letraActualCasilla - i] + numeroCasillaInicio);
                }else{
                    //Comprueba si despues de la ultima casilla hay una pieza que pueda comer
                    if(tableroDigital[letras[letraActualCasilla + i]+numeroCasillaInicio].split("-")[0] != piezaAgarrada.id.split("-")[0]){
                        casillasPermitidas.push(letras[letraActualCasilla + i] + numeroCasillaInicio);
                    }
                    break;
                }
                casillasRestantes--;
                i++;
            }

DESPUES DE OPTIMIZAR
        movimientosDeslizantes = [
            [1,0],
            [-1,0],
            [0,1],
            [0,-1]
        ];