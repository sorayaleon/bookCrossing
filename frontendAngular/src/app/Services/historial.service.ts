import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Global } from './global.service';
import { Reserva } from '../models/reserva';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {
  public url:string;
  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url;
   }

  registraHistorial(prestamo: Reserva): Observable<any>{
    let historial = [prestamo];
    let params = JSON.stringify(historial);
    let headers = new HttpHeaders().set('Content-type','application/json');
  
    return this._http.post(this.url+'historial', params, {headers: headers});
  }

  getHistorial(): Observable<any> {
    return this._http.get(this.url + 'historial');
}

verHistorial(id): Observable<any> {
  let headers = new HttpHeaders().set('Content-type','application/json');
  return this._http.get(this.url+'historial/'+id, {headers: headers});
}
  registraPrestamo(id, tipo, fecha): Observable<any>{
    let historial = [id, tipo, fecha];
    let params = JSON.stringify(historial);
    let headers = new HttpHeaders().set('Content-type','application/json');
  
    return this._http.post(this.url+'historial', params, {headers: headers});
  }

  cambiarEstadoIncidencia(id, incidenciaActiva): Observable<any> {
    let params = JSON.stringify([id,incidenciaActiva]);
      let headers = new HttpHeaders().set('Content-type','application/json'); 
      return this._http.put(this.url+'historial/'+id, params, {headers: headers});
  }
}
