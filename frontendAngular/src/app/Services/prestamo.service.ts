import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Global } from './global.service';
import { Reserva } from '../models/reserva';
import { Libro } from '../models/libro';
import { Establecimiento } from '../models/establecimiento';


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
getLibros(): Observable<any> {
    return this._http.get(this.url + 'libros');
}
//Devuelve un libro
getLibro(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-type','application/json');
    return this._http.get(this.url+'libros/'+id, {headers: headers});
}
//Borrar libros
deleteLibro(id): Observable<any>{
    let headers = new HttpHeaders().set('Content-type','application/json'); 
    return this._http.delete(this.url+'libros/'+id, {headers: headers});
}

updateLibro(id, libro, portada): Observable<any>{
    let params = JSON.stringify([id,libro, portada]);
    let headers = new HttpHeaders().set('Content-type','application/json'); 
    return this._http.put(this.url+'libros/'+id, params, {headers: headers});
}
}
