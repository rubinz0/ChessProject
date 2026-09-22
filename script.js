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
            //Añadir funcionalidad de soltar pieza

            
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
    let id = 0;
    const idPiezas = ["negro-torre-1","negro-caballo-1","negro-alfil-1","negro-dama","negro-rey","negro-alfil-2","negro-caballo-2","negro-torre-2",
        "negro-peon-1","negro-peon-2","negro-peon-3","negro-peon-4","negro-peon-5","negro-peon-6","negro-peon-7","negro-peon-8","blanco-peon-1",
        "blanco-peon-2","blanco-peon-3","blanco-peon-4","blanco-peon-5","blanco-peon-6","blanco-peon-7","blanco-peon-8","blanco-torre-1",
        "blanco-caballo-1","blanco-alfil-1","blanco-dama","blanco-rey","blanco-alfil-2","blanco-caballo-2","blanco-torre-2",
        ];
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
            pieza.id = idPiezas[id];
            id++;

            pieza.draggable = "false";
            pieza.addEventListener("mousedown", clicarPieza);
            casillas[i].appendChild(pieza);
        }
    }

}
colocarPiezas()





//Variables de pieza, para pasarlas entre mouseDown y mouseMove es decir que cuando mueva la pieza la funcion de clicar pieza 
// no desaparezca los datos si no que los pase a una variable local
let agarreX = 0;
let agarreY = 0;
let piezaAgarrada = "null";
let click = "null";
let casillaDestino = "";


function clicarPieza(evento){
    click = "true"
    //Esto desactiva el comportamiento por defecto que deja arrastrar imagenes
    evento.preventDefault();
    console.log("Pieza agarrada: " , evento.target);
    piezaAgarrada = evento.target;
    piezaAgarrada.style.position = "absolute";
    piezaAgarrada.style.zIndex = "100";
    //Restamos la posicion del raton menos la esquina de la img para no solo anclarla al raton sino anclarla 
    // con el mismo margen sin que haya un salto
    agarreX = evento.clientX - piezaAgarrada.getBoundingClientRect().left;
    agarreY = evento.clientY - piezaAgarrada.getBoundingClientRect().top;
    console.log("CoordenadasX pieza: " + evento.clientX);
    click = "false";
}

//La añadimos al documento porque si se añade a pieza y muevo el raton muy rapido la puede perder
document.addEventListener("mousemove", moverPieza);
function moverPieza(evento){
    if(piezaAgarrada == "null"){
        return
    }if(!(piezaAgarrada == "null")){
        const posX = evento.clientX - agarreX;
        const posY = evento.clientY - agarreY;
        piezaAgarrada.style.left = posX + "px";
        piezaAgarrada.style.top = posY + "px";
    }
}


document.addEventListener("mouseup", soltarClick);
function soltarClick(evento){
    if(piezaAgarrada == "null"){
        return;
    }if(!(piezaAgarrada == "null")){
        //Con esto hacemos que se suelte la pieza y reseteamos sus valores para que no pase por encima de otras y este en la misma capa que la casilla        piezaAgarrada.style.position = "";
        piezaAgarrada.style.zIndex = "";
        piezaAgarrada.style.left = "";
        piezaAgarrada.style.top = "";
        //Oculto la pieza para poder lanzar el "rayo" que impacta contra la casilla de debajo
        piezaAgarrada.style.visibility = "hidden"
        //Lannzo el "rayo"
        casillaDestino = document.elementFromPoint(evento.clientX,evento.clientY);
        if(casillaDestino.className == "casilla"){
            validarMovimiento(piezaAgarrada, casillaDestino);
            casillaDestino.appendChild(piezaAgarrada);
        }if(casillaDestino.className == "pieza"){
            validarMovimiento(piezaAgarrada, casillaDestino);
            casillaDestino = casillaDestino.parentElement;
        }
        piezaAgarrada.style.visibility = "visible";
    
        piezaAgarrada = "null";
        console.log(evento);
    }

}


//Esta funcion comprueba si puedes soltar la pieza en esa casilla. En un futuro se puede modificar para diferentes modos de juego o desactivar para un tablero de analisis;
function validarMovimiento(piezaAgarrada, casillaDestino){
    const pieza = piezaAgarrada.id;
    pieza = pieza.split("")
    console.log(pieza)
    //Peones

    //Torres

    //Caballos

    //Alfiles

    //Dama

    //Rey

}