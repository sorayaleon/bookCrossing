import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Comentarios } from '../models/comentarios';
import { Global } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  public url:string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url;
   }

  saveComentario(comentario: Comentarios): Observable<any>{
    let coment = [comentario]
    let params = JSON.stringify(coment);
    let headers = new HttpHeaders().set('Content-type','application/json');

    return this._http.post(this.url+'comentarios', params, {headers: headers});
  }

  getComentarios(): Observable<any> {
    let headers = new HttpHeaders().set('Content-type','application/json');
    return this._http.get(this.url+'comentarios');
  }

    updateEstadoComentario(id, estado): Observable<any>{
      let params = JSON.stringify([id,estado]);
      let headers = new HttpHeaders().set('Content-type','application/json'); 
      return this._http.put(this.url+'comentarios/'+id, params, {headers: headers})
    }

    updateComentario(id, alias): Observable<any>{
      let params = JSON.stringify([id,alias]);
      let headers = new HttpHeaders().set('Content-type','application/json'); 
      return this._http.put(this.url+'coment', params, {headers: headers});
    }
}
