export class Usuario{
    constructor(
        public id: number,
        // public dni: string,
        // public nombre: string,
        // public apellidos: string,
        // public direccion: string,
        public email: string,
        public password: string,
        public alias: string,
        // public foto: string,
        // public tfno: number,
        public tipo: string,
        public estado: string,
        // public adjunto: string,
        ){}
}