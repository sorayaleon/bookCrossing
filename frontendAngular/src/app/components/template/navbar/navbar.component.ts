import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenService } from '../../../Services/token.service';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../Services/usuario.service';
import { Global } from '../../../Services/global.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public usuario: Usuario;
  public loggedIn: boolean;
  public url: string;
  public idUsu;
  public tipo;

  constructor(
    private auth: AuthService,
    private router: Router,
    private Token: TokenService,
    
  ) {
    this.url = Global.url;
   }

  ngOnInit() {
    this.idUsu = sessionStorage.getItem("id");
    this.tipo = sessionStorage.getItem("tipo");
    console.log(this.idUsu);
    console.log(this.tipo);
    this.auth.authStatus.subscribe(value => this.loggedIn = value);
  }

  logout(event: MouseEvent){
    event.preventDefault();
    this.Token.remove();
    this.auth.changeAuthStatus(false);
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  
}
