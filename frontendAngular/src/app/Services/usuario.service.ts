import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Usuario } from '../models/usuario';
import { Global } from './global.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public url:string;

  constructor(
    private _http: HttpClient
  ) { 
    this.url = Global.url;
  }

  //Guarda usuario
saveUsuario(usuario: Usuario): Observable<any>{
  let ficha = [usuario]
  let params = JSON.stringify(ficha);
  let headers = new HttpHeaders().set('Content-type','application/json');

  return this._http.post(this.url+'usuarios', params, {headers: headers});
}
//Devuelve lista de usuarios
getUsuarios(): Observable<any> {
    return this._http.get(this.url + 'usuarios');
}
//Devuelve un usuario
getUsuario(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-type','application/json');
    return this._http.get(this.url+'usuarios/'+id, {headers: headers});
}
//Borrar usuarios
deleteUsuario(id): Observable<any>{
    let headers = new HttpHeaders().set('Content-type','application/json'); 
    return this._http.delete(this.url+'usuarios/'+id, {headers: headers});
}
//Actualizar usuarios
updateUsuario(id, usuario): Observable<any>{
  let params = JSON.stringify([id,usuario]);
  let headers = new HttpHeaders().set('Content-type','application/json'); 
  return this._http.put(this.url+'usuarios/'+id, params, {headers: headers});
}

updateTipoUsuario(id, tipo): Observable<any>{
  let params = JSON.stringify([id,tipo]);
  let headers = new HttpHeaders().set('Content-type','application/json'); 
  return this._http.put(this.url+'cambio', params, {headers: headers})
}
}
