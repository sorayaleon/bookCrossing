import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../Services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { TokenService } from '../../../Services/token.service';

@Component({
  selector: 'app-ficha-usuarios',
  templateUrl: './ficha-usuarios.component.html',
  styleUrls: ['./ficha-usuarios.component.css']
})
export class FichaUsuariosComponent implements OnInit {
  public usuario: Usuario;
  public tipoUsu;

  constructor(
    private _usuarioService: UsuarioService,
    private _route: ActivatedRoute,
    private _router: Router,
    private auth: AuthService,
    private Token: TokenService,

  ) { 
    this.tipoUsu = sessionStorage.getItem("tipo");
  }

  ngOnInit() {
    this._route.params.subscribe(params=> {
      let id = params.id;
      this.getFichaUsuario(id);
     
    })
  }
  
  redireccion(){
    this.Token.remove();
    this.auth.changeAuthStatus(false);
    localStorage.clear();
    sessionStorage.clear();
    this._router.navigateByUrl('/login');
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
