import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Libro } from '../models/libro';
import { Global } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  public url:string;
  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url;
   }

    //Guarda libro
    saveLibro(libro: Libro, portada): Observable<any>{
      let ficha = [libro, portada]
      let params = JSON.stringify(ficha);
      let headers = new HttpHeaders().set('Content-type','application/json');

      return this._http.post(this.url+'libros', params, {headers: headers});
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
  //Actualiza libro
  updateLibro(id, libro, portada): Observable<any>{
      let params = JSON.stringify([id,libro, portada]);
      let headers = new HttpHeaders().set('Content-type','application/json'); 
      return this._http.put(this.url+'libros/'+id, params, {headers: headers});
  }
  updateEstadoLibro(codigo, estado): Observable<any>{
    let params = JSON.stringify([codigo,estado]);
    let headers = new HttpHeaders().set('Content-type','application/json'); 
    return this._http.put(this.url+'estado', params, {headers: headers})
  }
}
