export class Reserva{
    constructor(
        public id: number,
        public tipo: string,
        public dni: string,
        public titulo: string,
        public isbn: number,
        public idL: number,
        public fechaSolicitud: string,
        public fechaPrestamo: string,
        public fechaDevolucion: string,
        public nombreEst: string,
        public comentario: string,
        public puntuacion: number
        ){}
}