const tablero = document.getElementById("tablero");
const posiciones = ["a8","b8","c8","d8","e8","f8","g8","h8","a7","b7","c7","d7","e7","f7","g7","h7","a6","b6","c6","d6","e6","f6","g6","h6","a5","b5","c5","d5","e5","f5","g5","h5","a4","b4","c4","d4","e4","f4","g4","h4","a3","b3","c3","d3","e3","f3","g3","h3","a2","b2","c2","d2","e2","f2","g2","h2","a1","b1","c1","d1","e1","f1","g1","h1"];
function generarTablero(){
    //Crear filas
    let posicionCasilla = 0;
    for(let i = 0; i < 8; i++){
        const fila = document.createElement("div");
        fila.style.display = "flex";
        fila.className = "fila";
        const id = i + 1;
        fila.id = "fila" + id;
        tablero.appendChild(fila)
        
        //añadir casillas a las filas
        for(let j = 0; j < 8; j++){
            //Crear coordenadas número
            if(j == 0){
                const casillaCoordenada = document.createElement("div");
                casillaCoordenada.className = "casillaCoord";
                casillaCoordenada.style.display = "flex-start";
                const numero = ((i + 1) -9) * -1;
                casillaCoordenada.textContent = numero;
                fila.appendChild(casillaCoordenada);
            }
            const casilla = document.createElement("div");
            casilla.className = "casilla";
            casilla.id = posiciones[posicionCasilla];
            // const pieza = document.createElement("img");
            // pieza.src = "/img/chesspieces/peonBlanco.webp";
            // pieza.alt = "peonBlanco";
            // pieza.className = "pieza";
            // casilla.appendChild(pieza);
            // casilla.id = posiciones[posicionCasilla];
            //Asignar color de las piezas dependiendo de si son pares o no 
            if((i + j)% 2 == 0){
                casilla.style.backgroundColor = "#ffffff";
            }else{
                casilla.style.backgroundColor = "#69923e";
            }
            fila.appendChild(casilla);
            posicionCasilla++;

            
        }
    }

    //Poner coordenadas
    const fila = document.createElement("div");
    fila.style.display = "flex";
    fila.className = "fila";
    tablero.appendChild(fila)
    const coordenadas = ["","a","b","c","d","e","f","g","h"];
    for(let i = 0; i < 9; i++){
        const casilla = document.createElement("div");
        casilla.className = "casillaCoord";
        casilla.textContent = coordenadas[i];
        fila.appendChild(casilla);
    }
}

generarTablero();

function colocarPiezas(){
    const casillas = document.querySelectorAll(".casilla");
    for(let i = 0; i < 64; i++){
        let nombrePieza = "none";
        //Casillas negras
        if(i > 7 && i < 16){
            nombrePieza = "peonNegro";
        }
        if(i == 0 | i == 7){
            nombrePieza = "torreNegra";
        }
        if(i == 1 | i == 6){
            nombrePieza = "caballoNegro";
        }
        if(i == 2 | i == 5){
            nombrePieza = "alfilNegro";
        }
        if(i == 3){
            nombrePieza = "damaNegra";
        }
        if(i == 4){
            nombrePieza = "reyNegro";
        }

        //Casillas blancas
        if(i > 47 && i < 56){
            nombrePieza = "peonBlanco";
        }
        if(i == 56 | i == 63){
            nombrePieza = "torreBlanca";
        }
        if(i == 57 | i == 62){
            nombrePieza = "caballoBlanco";
        }
        if(i == 58 | i == 61){
            nombrePieza = "alfilBlanco";
        }
        if(i == 59){
            nombrePieza = "damaBlanca";
        }
        if(i == 60){
            nombrePieza = "reyBlanco";
        }

        //Colocar la imagen en la casilla seleccionada
        if(!(nombrePieza == "none")){
            const pieza = document.createElement("img");
            const src = "/img/piezas/" + nombrePieza + ".webp"
            pieza.src = src;
            pieza.alt = nombrePieza;
            pieza.className = "pieza";
            casillas[i].appendChild(pieza);
        }
    }

}
colocarPiezas()
