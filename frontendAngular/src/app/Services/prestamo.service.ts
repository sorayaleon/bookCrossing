import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Global } from './global.service';
import { Reserva } from '../models/reserva';


@Injectable({
  providedIn: 'root'
})
export class PrestamoService {
  public url:string;
  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url;
   }

   //Solicitar préstamo
   solicitaPrestamo(prestamo: Reserva): Observable<any>{
    let reserva = [prestamo];
    let params = JSON.stringify(reserva);
    let headers = new HttpHeaders().set('Content-type','application/json');

    return this._http.post(this.url+'reservas', params, {headers: headers});
}

//Devuelve lista de libros
getSolicitudes(): Observable<any> {
    return this._http.get(this.url + 'reservas');
}

getSolicitud(id): Observable<any> {
  let headers = new HttpHeaders().set('Content-type','application/json');
  return this._http.get(this.url+'reservas/'+id, {headers: headers});
}


aceptaPrestamo(id, tipo, fecha): Observable<any>{
  let reserva = [id, tipo, fecha];
  let params = JSON.stringify(reserva);
  let headers = new HttpHeaders().set('Content-type','application/json');

  return this._http.post(this.url+'reservas', params, {headers: headers});
}


// //Devuelve un libro
// getLibro(id): Observable<any> {
//     let headers = new HttpHeaders().set('Content-type','application/json');
//     return this._http.get(this.url+'libros/'+id, {headers: headers});
// }
// //Borrar libros
// deleteLibro(id): Observable<any>{
//     let headers = new HttpHeaders().set('Content-type','application/json'); 
//     return this._http.delete(this.url+'libros/'+id, {headers: headers});
// }

// updatePrestamo(id, tipo, fechaPrestamo, fechaDevolucion): Observable<any>{
//     let params = JSON.stringify([id,tipo,fechaPrestamo, fechaDevolucion]);
//     let headers = new HttpHeaders().set('Content-type','application/json'); 
//     return this._http.put(this.url+'reserva', params, {headers: headers});
// }

// updateTipoReserva(id, tipo): Observable<any>{
//   let params = JSON.stringify([id,tipo]);
//   let headers = new HttpHeaders().set('Content-type','application/json'); 
//   return this._http.put(this.url+'reserva', params, {headers: headers})
// }
}
