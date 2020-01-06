import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenService } from '../../../Services/token.service';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../Services/usuario.service';
import { Global } from '../../../Services/global.service';
import { EstablecimientoService } from '../../../Services/establecimiento.service';
import { Establecimiento } from '../../../models/establecimiento';


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
  public alias;
  public establecimiento: Establecimiento;
  public idEst;
  public dni;

  constructor(
    private auth: AuthService,
    private router: Router,
    private Token: TokenService,
    private _establecimientoService: EstablecimientoService,
  ) {
    this.url = Global.url;
   }

  ngOnInit() {
    this.idUsu = sessionStorage.getItem("id");
    this.tipo = sessionStorage.getItem("tipo");
    this.alias = sessionStorage.getItem("alias");
    this.dni = sessionStorage.getItem("dni");
    console.log(this.idUsu);
    console.log(this.tipo);
    this.auth.authStatus.subscribe(value => this.loggedIn = value);
    this.almacenarIdEstablecimiento();
  }

  logout(event: MouseEvent){
    event.preventDefault();
    this.Token.remove();
    this.auth.changeAuthStatus(false);
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }

  almacenarIdEstablecimiento(){
    this._establecimientoService.getEstablecimientos().subscribe(
      response => {
        this.establecimiento = response;
        for(let index = 0; index < this.establecimiento.length; index++){
          if(this.establecimiento[index]["dni"]==this.dni){
            console.log(this.establecimiento[index]["id"])
           this.idEst = this.establecimiento[index]["id"];
          }
        }
      }, error => {
        console.log(<any>error)
      }
    )
  }

  getFichaEstablecimiento(id){
    this._establecimientoService.getEstablecimiento(id).subscribe(
      response => {
        this.establecimiento = response;
        
      }, error => {
        console.log(<any>error);
        
      }
    );
  }
}
