export class Usuario{
    constructor(
        public id: number,
        public dni: string,
        public nombre: string,
        public apellidos: string,
        public email: string,
        public password: string,
        public alias: string,
        public tipo: string,
        public estado: string,
        public numLibros: number
        ){}
}