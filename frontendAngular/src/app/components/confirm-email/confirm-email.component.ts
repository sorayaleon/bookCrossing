import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../../Services/token.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { Global } from '../../Services/global.service';
import { UsuarioService } from '../../Services/usuario.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {
  public form = {
    email: null,
    password: null
  }

  public error = null;
  public url:string;
  public id;
  
  
  constructor(
    private http: HttpClient,
    private Token: TokenService,
    private router: Router,
    private auth: AuthService,
    private _usuarioService: UsuarioService,
  ) { 
    this.url = Global.url;
  }

  ngOnInit() {
  }

  onSubmit(){
    
    return this.http.post(this.url+'login', this.form).subscribe(
      data =>{ this.handleResponse(data),
        sessionStorage.setItem("id", data['id']), 
        this.id = sessionStorage.getItem("id");
        sessionStorage.setItem("tipo", data['tipo']), 
        sessionStorage.setItem("dni", data['dni']),
        sessionStorage.setItem("alias", data['alias']);
        sessionStorage.setItem("email", data['email']);
        console.log(data);
        this.cambiarEstadoUsuario(this.id);
      },
      error => this.handleError(error)
    );
  }

  cambiarEstadoUsuario(id){
    this._usuarioService.updateEstadoUsuario(id, 'activo').subscribe(
      response => {
        console.log(<any>response);
      }, error => {
        console.log(<any>error);
      }
    )
  }

handleResponse(data){
  this.Token.handle(data.access_token);
  this.auth.changeAuthStatus(true);
  this.router.navigate(['/home']).then(()=>{window.location.reload()} );
}

  handleError(error){
    this.error = error.error.error;
  }
}
