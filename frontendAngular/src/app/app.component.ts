import { Component, OnInit } from '@angular/core';
import { AuthService } from './Services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from './Services/token.service';
import { Usuario } from './models/usuario';
import { Global } from './Services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontendAngular';

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
