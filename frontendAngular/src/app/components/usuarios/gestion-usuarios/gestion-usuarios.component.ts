import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { EstablecimientoService } from '../../../Services/establecimiento.service';
import { Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../../shared/dialog.service';
import { UsuarioService } from '../../../Services/usuario.service';
import { LibroService } from '../../../Services/libro.service';
import { PrestamoService } from '../../../Services/prestamo.service';
import { AuthService } from '../../../Services/auth.service';
import { TokenService } from '../../../Services/token.service';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent implements OnInit {

  public title: string;
  public establecimiento: any;
  pageActual: number = 1;
  
  public dni;
  public usuario: Usuario;
  public tipo;
  public contador = 0;
  public libro;
  public filtro: any = {email: ''};
  public usuarios = 0;
  public tipoUsu;

  constructor(
    private _establecimientoService: EstablecimientoService,
    private _router: Router,
    private httpClient: HttpClientModule,
    private toastr: ToastrService,
    private dialogService: DialogService,
    private http: HttpClient,
    private _usuarioService: UsuarioService,
    private _libroService: LibroService,
    private _prestamoService: PrestamoService,
    private auth: AuthService,
    private Token: TokenService,
    
  ) {
    this.title = "Gestión de usuarios";
    this.dni = sessionStorage.getItem("dni");
    this.tipoUsu = sessionStorage.getItem("tipo");
   }

  ngOnInit() {
   
    this._usuarioService.getUsuarios().subscribe(
      result => {
       this.usuario = result;
       for(let index=0; index<this.usuario.length; index ++){
         this.usuarios +=1;
       }
      
     },
     error => {
       console.log(<any>error);
     }
  );
  
  }

  redireccion(){
    this.Token.remove();
    this.auth.changeAuthStatus(false);
    localStorage.clear();
    sessionStorage.clear();
    this._router.navigateByUrl('/login');
  }

  deleteUsuario(id, dni, nombre){
    this.dialogService.openConfirmDialog('¿Deseas dar de baja al usuario?').afterClosed().subscribe(res =>{
      if(res){
        this.contador = 0;
      this._prestamoService.getSolicitudes().subscribe(
        response => {
          this.libro = response;
          for(let index = 0; index < this.libro.length; index++){
            if(this.libro[index]["dni"] == dni && this.libro[index]["tipo"] == 'prestamo'){
              this.contador += 1;
            }
          }
          console.log(this.contador)

          if(this.contador == 0){
            this.contador = 0;
            this.showSuccess();
            this._establecimientoService.getEstablecimientos().subscribe(
              response => {
                this.establecimiento = response;
                  for (let index = 0; index < this.establecimiento.length; index++) {
                    if(this.establecimiento[index]["dni"]== dni){
                      this.contador += 1;
                    }
                  }
                  if(this.contador == 0){
                    this._usuarioService.deleteUsuario(id).subscribe(
                      response => {
                        this.showSuccess();
                
                      }, error => {
                        console.log(<any>error);
                        this.showError();
                      }
                    )
                  } else {
                    this.tieneEstablecimiento();
                  }
                }, error => {
                  console.log(<any>error);
                  this.showError();
                }
              )
            }   else {
              this.tieneLibro();
            }  
        }, error => {
          console.log(<any>error)
          this.showError();
        }
      )
      console.log(this.contador)

        this._router.navigateByUrl('/refresh', {skipLocationChange: true}).then(()=>
          this._router.navigate(['/gestionEstablecimientos']));
    }
  })
  }

  bloquear(id){
    this._usuarioService.getUsuario(id).subscribe(
      response => {
        this.usuario = response;
          if(this.usuario.tipo=='normal'){
            this._usuarioService.updateEstadoUsuario(id, 'bloqueado').subscribe(
              response => {
                this.bloqueadoSuccess();
              }, error => {
                this.bloqueadoError();
                console.log(<any>error)
              }
            )
          }else{
              this.noPermitido();
          }
        }
      
      , error => {
        this.bloqueadoError();
        console.log(<any>error)
      }
    )
    
  }

  showSuccess(){
    this.toastr.success('El usuario ha sido eliminado con éxito.', 'Correcto', {timeOut: 3000});
  }

  showError(){
    this.toastr.error('No se ha podido eliminar el usuario.', 'Error', {timeOut: 3000})
  }

  tieneLibro(){
    this.toastr.error('No se puede eliminar el usuario porque aún está en posesión de libros.', 'Error', {timeOut: 3000})
  }

  tieneEstablecimiento(){
    this.toastr.error('No se puede eliminar el usuario porque es responsable de un establecimiento.', 'Error', {timeOut: 3000})
  }

  bloqueadoSuccess(){
    this.toastr.success('Usuario bloqueado con éxito.', 'Correcto', {timeOut: 3000});
  }

  bloqueadoError(){
    this.toastr.error('Error al bloquear al usuario.', 'Error', {timeOut: 3000})
  }
  noPermitido(){
    this.toastr.error('No puedes bloquear al usuario porque es administrador o responsable de establecimiento.', 'Error', {timeOut: 3000})
  }

}
