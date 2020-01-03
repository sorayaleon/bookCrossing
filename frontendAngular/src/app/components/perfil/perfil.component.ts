import { Component, OnInit } from '@angular/core';
import { Global } from '../../Services/global.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../Services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { PrestamoService } from '../../Services/prestamo.service';
import { HistorialService } from '../../Services/historial.service';
import { LibroService } from '../../Services/libro.service';
import { EstablecimientoService } from '../../Services/establecimiento.service';
import { Establecimiento } from 'src/app/models/establecimiento';
import { DialogService } from '../../shared/dialog.service';
import { TokenService } from '../../Services/token.service';
import { AuthService } from '../../Services/auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ComentariosService } from '../../Services/comentarios.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: [UsuarioService]
})
export class PerfilComponent implements OnInit {
  public url: string;
  public usuario: Usuario;
  public idUsu;
  public historiales: any;
  public numHistoriales = 0;
  pageActual: number = 1;
  filterHisotrial = '';
  public fechaHoy: any;
  public prestamos: any;
  public numPrestamos;
  public solicitudes: any;
  public numSolicitudes;
  public status: string;
  public establecimiento: Establecimiento;
  public establecimientos;
  public dni;
  public idEst;
  public contador;
  public libro;
  public formularioUsuario;
  public email;
  public comentarios;
  public alias;

  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router,
    private _route: ActivatedRoute,
    private toastr: ToastrService,
    private _prestamoService: PrestamoService,
    private _historialService: HistorialService,
    private _libroService: LibroService,
    private _establecimientoService: EstablecimientoService,
    private dialogService: DialogService,
    private auth: AuthService,
    private Token: TokenService,
    public fb: FormBuilder,
    private _comentarioService: ComentariosService,
    private http: HttpClient,
  ) { 
   
    this.url = Global.url;
    this.fechaHoy = new Date();
    this.fechaHoy = moment(this.fechaHoy).format('YYYY-MM-DD');
    
    this.formularioUsuario = this.fb.group({
      
      alias: ['',[Validators.required, Validators.maxLength(20)]],
      email:['',[Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this._route.params.subscribe(params=> {
      this.idUsu = sessionStorage.getItem("id");
      this.dni = sessionStorage.getItem("dni");
      this.email = sessionStorage.getItem("email");
      this.alias = sessionStorage.getItem("alias");
      console.log(this.idUsu);
      this.getFichaUsuario(this.idUsu);
      this.prestamo();
      this.historial();
      this.solicitud();
      
      // this.idEst = this.getEstablecimientos();
      // console.log(this.idEst);
      // this.getFichaEstablecimiento(this.idEst);
    })

  }

  onSubmit(){

    this.dialogService.openConfirmDialog('¿Deseas actualizar tu información?').afterClosed().subscribe(res =>{
      if(res){
        
        this._usuarioService.updateUsuario(this.idUsu, this.formularioUsuario.value).subscribe(
          response=>{
            console.log(response);
            this.usuarioSuccess();
            
          },
     
         error => {
           console.log("estoy en error");
           this.usuarioError();
           console.log(<any>error);
         });

         this._establecimientoService.getEstablecimientos().subscribe(
          response => {
            this.establecimiento = response;
            for(let index = 0; index < this.establecimiento.length; index ++){
              if(this.establecimiento[index]['dni'] == this.dni){
                this._establecimientoService.updateEmail(this.establecimiento[index]['id'], this.formularioUsuario.value.email).subscribe(
                  response => {
                    this.usuarioSuccess();
                  }, error => {
                    console.log(<any>error);
                    this.usuarioError();
                  }
               )
              }
            }
          }, error => {
            console.log(<any>error);
            this.usuarioError();
          }
         )

         this._comentarioService.getComentarios().subscribe(
           response => {
             this.comentarios = response;
             for(let index=0; index<this.comentarios.length; index++){
               if(this.comentarios[index]['idUsu']== this.idUsu){
                this._comentarioService.updateComentario(this.comentarios[index]['id'], this.formularioUsuario.value.alias).subscribe(
                  response => {
                   this._router.navigate(['/perfil/'+ this.usuario.id]);
                   this.usuarioSuccess();
                  }, error => {
                   console.log(<any>error);
                   this.usuarioError();
                  }
                )
               }
             }
            
           }, error => {

           }
         )
         
      }
    });

    
  }



  getFichaUsuario(id){
    this._usuarioService.getUsuario(id).subscribe(
      response => {
        this.usuario = response;
        this.numPrestamos = this.usuario.numLibros;
      }, error => {
        console.log(<any>error);
      }
    );
  }

  eliminarUsuario(id){
    this.dialogService.openConfirmDialog('¿Deseas borrar el establecimiento?').afterClosed().subscribe(res =>{
      if(res){
        this.contador = 0;
        this.idUsu = parseInt(this.idUsu);
      this._establecimientoService.getEstablecimientos().subscribe(
        response => {
          this.establecimiento = response;
          console.log(this.idUsu)
          for(let index = 0; index < this.establecimiento.length; index++){
            if(this.establecimiento[index]["dni"] == this.dni){
              this.contador += 1;
            }
          }
          console.log(this.contador)
        if(this.contador == 0){
          this._prestamoService.getSolicitudes().subscribe(
            response => {
              this.libro = response;
              for(let index = 0; index < this.libro.length; index++){
                if(this.libro[index]["dni"] == this.dni && this.libro[index]["tipo"] == 'prestamo'){
                  this.contador += 1;
                }
              }
              if(this.contador == 0){
          this._usuarioService.deleteUsuario(id).subscribe(
            response => {
              this.showSuccess();
              // this._router.navigate(['/login']);
              this.Token.remove();
              this.auth.changeAuthStatus(false);
              localStorage.clear();
              this._router.navigateByUrl('/login');
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
                }else{
                  this.noPermitido();
                }
        })
        
  }})}

  prestamo(){
    this._prestamoService.getSolicitudes().subscribe(
      response => {
        this.prestamos = response;
        console.log(<any>response);
        for (let index = 0; index < this.prestamos.length; index++) {
          if(this.prestamos[index]["tipo"]=="prestamo" && this.prestamos[index]["idUsu"]==this.idUsu && this.prestamos[index]["fecha"] < this.fechaHoy){
             this.numPrestamos += 1;
          }
        }
      }, error => {
        console.log(<any>error);
      }
    )
  }

  solicitud(){
    this._prestamoService.getSolicitudes().subscribe(
      response => {
        this.solicitudes = response;
        console.log(<any>response);
        for (let index = 0; index < this.prestamos.length; index++) {
          if(this.prestamos[index]["tipo"]=="solicitud" && this.prestamos[index]["idUsu"]==this.idUsu){
             this.numSolicitudes += 1;
          }
        }
      }, error => {
        console.log(<any>error);
      }
    )
  }

  historial(){
    this._historialService.getHistorial().subscribe(
      response => {
        this.historiales = response;
        for (let index = 0; index < this.historiales.length; index++) {
          if(this.historiales[index]["idUsu"]== this.idUsu){
             this.numHistoriales += 1;
          }
        }
        console.log(<any>response);
        console.log(this.numHistoriales)
      }, error => {
        console.log(<any>error);
      }
    )
  }

  cancelarSolicitud(id, idL){
    this._prestamoService.deleteReserva(id).subscribe(
      response => {
        console.log(<any>response);
        this._router.navigateByUrl('/refresh', {skipLocationChange: true}).then(()=>
          this._router.navigate(['/perfil/'+this.idUsu])); 

          this._libroService.updateEstadoLibro(idL, "activo").subscribe(
            response => {
              this.cancelaSuccess();
            }, error => {
              this.status = 'failed';
              console.log(<any>error);
              this.cancelaError();
            }
          )
      },error => {
        console.log(<any>error);
      }
    )
  }

  passwordMatchValidator(formularioRegistro) {
    return formularioRegistro.get('password').value === formularioRegistro.get('passwordRep').value
       ? null : {'mismatch': true};
 }


  volver(id){
    this._router.navigateByUrl('/refresh', {skipLocationChange: true}).then(()=>
      this._router.navigate(['/perfil/'+id]));
  }

  showSuccess(){
    this.toastr.success('Usuario dado de baja de la aplicación.', 'Correcto', {timeOut: 3000});
  }

  showError(){
    this.toastr.error('Error al dar de baja al usuario de la aplicación.', 'Error', {timeOut: 3000})
  }

  cancelaSuccess(){
    this.toastr.success('La solicitud del libro se ha cancelado correctamente.', 'Correcto', {timeOut: 3000});
  }

  cancelaError(){
    this.toastr.error('La solicitud del libro no se ha cancelado.', 'Correcto', {timeOut: 3000});
  }

  noPermitido(){

    this.toastr.error('No puedes darte de baja de la aplicación porque eres responsable de un establecimiento que colabora con la aplicación.', 'Error', {timeOut: 3000})
  }

  tieneLibro(){
    this.toastr.error('No se puede eliminar el usuario porque aún está en posesión de libros.', 'Error', {timeOut: 3000})
  }

  usuarioSuccess(){
    this.toastr.success('Usuario modificado con éxito.', 'Correcto', {timeOut: 3000});
  }

  usuarioError(){
    this.toastr.error('Error al modificar los datos del usuario.', 'Error', {timeOut: 3000})
  }
  
  
}
