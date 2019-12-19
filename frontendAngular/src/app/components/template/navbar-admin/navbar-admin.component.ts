import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../../../Services/token.service';
import { Usuario } from '../../../models/usuario';
import { Global } from '../../../Services/global.service';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {
  public usuario: Usuario;
  public loggedIn: boolean;
  public url: string;
  public idUsu;
  public tipo;
  public alias;
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
    this.alias = sessionStorage.getItem("alias");
    console.log(this.idUsu);
    console.log(this.tipo);
    console.log(this.alias);
    this.auth.authStatus.subscribe(value => this.loggedIn = value);
  }

  logout(event: MouseEvent){
    event.preventDefault();
    this.Token.remove();
    this.auth.changeAuthStatus(false);
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
