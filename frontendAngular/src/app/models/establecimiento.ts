export class Establecimiento{
    constructor(
        public id: number,
        public dni: string,
        public email: string,
        public nombreEst: string,
        public direccion: string,
        public cp: number,
        public tfno: number,
        public horarioAp: string,
        public horarioC: string,
        public latitud: number,
        public longitud: number,
        public estado: string,
       
        ){}
}