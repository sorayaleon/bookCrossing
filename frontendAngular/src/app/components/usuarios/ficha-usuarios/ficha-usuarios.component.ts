import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../Services/usuario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ficha-usuarios',
  templateUrl: './ficha-usuarios.component.html',
  styleUrls: ['./ficha-usuarios.component.css']
})
export class FichaUsuariosComponent implements OnInit {
  public usuario: Usuario;

  constructor(
    private _usuarioService: UsuarioService,
    private _route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this._route.params.subscribe(params=> {
      let id = params.id;
      this.getFichaUsuario(id);
     
    })
  }

  getFichaUsuario(id){
    this._usuarioService.getUsuario(id).subscribe(
      response => {
        this.usuario = response;
        
      }, error => {
        console.log(<any>error);
        
      }
    );
  }
}
