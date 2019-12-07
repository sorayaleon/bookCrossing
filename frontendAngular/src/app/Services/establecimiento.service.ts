import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Establecimiento } from '../models/establecimiento';
import { Global } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class EstablecimientoService {
  public url:string;

  constructor(
    private _http: HttpClient
  ) { 
    this.url = Global.url;
  }

  //Guarda establecimiento
  saveEstablecimiento(establecimiento: Establecimiento): Observable<any>{
    let ficha = [establecimiento]
    let params = JSON.stringify(ficha);
    let headers = new HttpHeaders().set('Content-type','application/json');

    return this._http.post(this.url+'establecimientos', params, {headers: headers});
}
//Devuelve lista de establecimientos
getEstablecimientos(): Observable<any> {
    return this._http.get(this.url + 'establecimientos');
}
//Devuelve un establecimiento
getEstablecimiento(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-type','application/json');
    return this._http.get(this.url+'establecimientos/'+id, {headers: headers});
}
//Borrar establecimientos
deleteEstablecimiento(id): Observable<any>{
    let headers = new HttpHeaders().set('Content-type','application/json'); 
    return this._http.delete(this.url+'establecimientos/'+id, {headers: headers});
}

//Actualizar establecimientos
updateLibro(id, establecimiento): Observable<any>{
  let params = JSON.stringify([id,establecimiento]);
  let headers = new HttpHeaders().set('Content-type','application/json'); 
  return this._http.put(this.url+'establecimientos/'+id, params, {headers: headers});
}
}
