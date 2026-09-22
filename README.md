# ChessProject

El tablero esta creado con las coordenadas puestas, las casillas tienen como id su coordenada correcta para poder luego asignar la pieza a su jugada
Las piezas de inicio se colocan en forma de barrido escaneando todas las casillas y colocando dependiendo de su posición entiendo que al haber la gran mayoría de piezas duplicadas y todos los peones juntos es más fácil pero para partidas mejor usar el id en vez de el query selectorAll casillas sin más

Si quiero colocar una pieza o filtrar una casilla solo tengo que hacer un foreach del query selector all y comparar el element.id con ="a5" por ejemplo

ahora las img de las piezas tienen id representativo por lo que se puede filtrar las img dentro de tablero y tienes una lista de piezas que puedes separar con el id



Piezas:

Arrastrables _/
Arrastrar con su imagen /
Colocar sobre una casilla
Colocar sobre una pieza
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
