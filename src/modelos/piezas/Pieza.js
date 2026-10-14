export class Pieza {
    constructor(id, color, casilla) {
        this.id = id;
        this.color = color;     
        this.casilla = casilla; 
    }

    obtenerMovimientos(tableroDigital) {
        console.log("Este método no se usa desde Pieza. Se tiene que implementar en la pieza correspondiente")
    }

}