import { Component, OnInit } from '@angular/core';
import { Reserva } from '../../models/reserva';
import { Usuario } from '../../models/usuario';
import { HistorialService } from '../../Services/historial.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../Services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../Services/auth.service';
import { TokenService } from '../../Services/token.service';

@Component({
  selector: 'app-ver-incidencia',
  templateUrl: './ver-incidencia.component.html',
  styleUrls: ['./ver-incidencia.component.css'],
  providers: [HistorialService, UsuarioService]
})
export class VerIncidenciaComponent implements OnInit {
public incidencia: Reserva;
public usuario: Usuario;
public usuId;
public tipoUsu;

  constructor(
    private _historialService: HistorialService,
    private _usuarioService: UsuarioService,
    private _route: ActivatedRoute,
    private toastr: ToastrService,
    private _router: Router,
    private auth: AuthService,
    private Token: TokenService,
  ) {
    this.tipoUsu = sessionStorage.getItem("tipo");
   }

  ngOnInit() {
    this._route.params.subscribe(params=> {
      let id = params.id;
      console.log(id)
      this.verHistorial(id);
      
      
    })
  }

  redireccion(){
    this.Token.remove();
    this.auth.changeAuthStatus(false);
    localStorage.clear();
    sessionStorage.clear();
    this._router.navigateByUrl('/login');
  }
  
  verHistorial(id){
    this._historialService.verHistorial(id).subscribe(
      response => {
        this.incidencia = response;
        console.log(this.incidencia.idUsu)
        
        this._usuarioService.getUsuario(this.incidencia.idUsu).subscribe(
          res => {
            this.usuario = res;
            console.log(res)
          }, error => {
            console.log(<any>error);
          }
          )
      }, error => {
        console.log(<any>error);
      }
    )
  }


  resolver(id){
    this._historialService.cambiarEstadoIncidencia(id, 'no').subscribe(
      response => {
        console.log(response);
        this.showSuccess();
        this._router.navigateByUrl('/refresh', {skipLocationChange: true}).then(()=>
          this._router.navigate(['/incidencia'])); 
      }, error => {
        console.log(<any>error);
        this.showError();
      }
    )
  }

  bloquear(id){
    this._usuarioService.updateEstadoUsuario(id, 'inactivo').subscribe(
      response => {
        console.log(response);
        this.bloqueoSuccess();
        this._router.navigateByUrl('/refresh', {skipLocationChange: true}).then(()=>
          this._router.navigate(['/incidencia/'+id])); 
      }, error => {
        console.log(<any>error);
        this.bloqueoError();
      }
    )
  }

    
  showSuccess(){
    this.toastr.success('La incidencia se ha resuelto correctamente.', 'Correcto', {timeOut: 3000});
  }
  
  showError(){
    this.toastr.error('No se ha podido resolver la incidencia.', 'Error', {timeOut: 3000})
  }

  bloqueoSuccess(){
    this.toastr.success('El usuario se ha bloqueado correctamente.', 'Correcto', {timeOut: 3000});
  }

  bloqueoError(){
    this.toastr.error('No se ha podido bloquear el usuario.', 'Error', {timeOut: 3000})
  }
}
