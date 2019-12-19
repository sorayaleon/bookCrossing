export class Libro{
    constructor(
        public id: number,
        public codigo: number,
        public isbn: number,
        public titulo: string,
        public autor: string,
        public descripcion: string,
        public portada: string,
        public categoria: string,
        public establecimientoInicial: string, 
        public estado: string
        ){}
}