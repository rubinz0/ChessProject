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