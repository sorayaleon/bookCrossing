import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Establecimiento } from '../models/establecimiento';
import { Global } from './global.service';
import { Usuario } from '../models/usuario';


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

    saveEstablecimiento(establecimiento: Establecimiento, email, dni): Observable<any>{
      let ficha = [establecimiento, email, dni];
      let params = JSON.stringify(ficha);
      let headers = new HttpHeaders().set('Content-type','application/json');
    
      return this._http.post(this.url+'establecimientos', params, {headers: headers});
    }

    saveEstablecimientoAdmin(establecimiento: Establecimiento): Observable<any>{
      let ficha = [establecimiento];
      let params = JSON.stringify(ficha);
      let headers = new HttpHeaders().set('Content-type','application/json');
    
      return this._http.post(this.url+'establecimientos', params, {headers: headers});
    }

    getEstablecimientos(): Observable<any> {
      return this._http.get(this.url + 'establecimientos');
    }

  getEstablecimiento(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-type','application/json');
    return this._http.get(this.url+'establecimientos/'+id, {headers: headers});
  }

  getEstablecimientoNombre(nombre): Observable<any> {
    let params = JSON.stringify(nombre);
    let headers = new HttpHeaders().set('Content-type','application/json');
    return this._http.get(this.url+'establecimientos/', {headers: headers});
  }

  deleteEstablecimiento(id): Observable<any>{
    let headers = new HttpHeaders().set('Content-type','application/json'); 
    return this._http.delete(this.url+'establecimientos/'+id, {headers: headers});
  }

  updateEstablecimiento(id, establecimiento): Observable<any>{
    let params = JSON.stringify([id,establecimiento]);
    let headers = new HttpHeaders().set('Content-type','application/json'); 
    return this._http.put(this.url+'establecimientos/'+id, params, {headers: headers});
  }

  updateEstado(id, estado): Observable<any>{
    let params = JSON.stringify([id,estado]);
    let headers = new HttpHeaders().set('Content-type','application/json'); 
    return this._http.put(this.url+'estados', params, {headers: headers})
  }
}
