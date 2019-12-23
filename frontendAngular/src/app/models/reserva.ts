export class Reserva{
    constructor(
        public id: number,
        public tipo: string,
        public dni: string,
        public titulo: string,
        public codigo: number,
        public idL: number,
        public fecha: string,
        public nombreEst: string,
        public comentario: string,
        public puntuacion: number,
        public incidencia: string,
        public incidenciaActiva: string
        ){}
}