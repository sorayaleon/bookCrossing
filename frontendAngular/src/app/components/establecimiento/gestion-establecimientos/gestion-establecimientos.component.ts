import { Component, OnInit } from '@angular/core';
import { EstablecimientoService } from '../../../Services/establecimiento.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../../shared/dialog.service';
import { Global } from '../../../Services/global.service';
import { UsuarioService } from '../../../Services/usuario.service';
import { Usuario } from '../../../models/usuario';
import { LibroService } from '../../../Services/libro.service';
import { Libro } from '../../../models/libro';
import { AuthService } from '../../../Services/auth.service';
import { TokenService } from '../../../Services/token.service';

@Component({
  selector: 'app-gestion-establecimientos',
  templateUrl: './gestion-establecimientos.component.html',
  styleUrls: ['./gestion-establecimientos.component.css'],
  providers: [EstablecimientoService]
})
export class GestionEstablecimientosComponent implements OnInit {
  public title: string;
  public establecimiento: any;
  pageActual: number = 1;
  filterEstablecimiento = '';
  public dni;
  public usuario: Usuario;
  public tipo;
  public libro: Libro;
  public contador = 0;
  filtro: any = {nombreEst: ''};
  public array = [];
  public numEstActivos = 0;
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
    private auth: AuthService,
    private Token: TokenService,
    
  ) {
    this.title = "Gestión de establecimientos";
    this.dni = sessionStorage.getItem("dni");
   }

  ngOnInit() {
    this.tipoUsu = sessionStorage.getItem("tipo");
    this._establecimientoService.getEstablecimientos().subscribe(
      result => {
       this.establecimiento = result;
       for (let index = 0; index < this.establecimiento.length; index++) {
        if(this.establecimiento[index]["estado"]=="activo"){
           this.numEstActivos += 1;
           this.array.push(this.establecimiento[index]);
        }
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
  
  deleteEstablecimiento(id, dni, nombre){
    this.dialogService.openConfirmDialog('¿Deseas borrar el establecimiento?').afterClosed().subscribe(res =>{
      if(res){
        this.contador = 0;
      this._libroService.getLibros().subscribe(
        response => {
          this.libro = response;
          for(let index = 0; index < this.libro.length; index++){
            if(this.libro[index]["establecimiento"] == nombre){
              this.contador += 1;
            }
          }
          console.log(this.contador)

          if(this.contador == 0){
            this.showSuccess();
            this._usuarioService.getUsuarios().subscribe(
              response => {
                this.usuario = response;
                  for (let index = 0; index < this.usuario.length; index++) {
                    if(this.usuario[index]["dni"]== dni){
                       this.tipo = this.usuario[index]["tipo"];
                    }
                  }
                }, error => {
                  console.log(<any>error);
                }
              )
                 if(this.tipo !='admin'){
                  this.tipo = "normal";
                }
                 this._usuarioService.updateTipoUsuario(dni, this.tipo).subscribe(
                   response => {
                     console.log(this.tipo);
                     this._establecimientoService.deleteEstablecimiento(id).subscribe(
                      response => {
                    this.showSuccess();
                  }, error => {
                    console.log(<any>error);
                    this.showError();
                  }
                )
                   },
                   error => {
                    console.log(error);
                    console.log(this.tipo);
                    console.log(dni);
                   }
                 );
                } else {
                  this.tieneLibro();
                }
        }, error => {
          console.log(<any>error)
        }
      )
      console.log(this.contador)
      
        this._router.navigateByUrl('/refresh', {skipLocationChange: true}).then(()=>
          this._router.navigate(['/gestionEstablecimientos'])); 
       
    
  }
});
  }

  showSuccess(){
    this.toastr.success('El establecimiento ha sido eliminado con éxito.', 'Correcto', {timeOut: 3000});
  }

  showError(){
    this.toastr.error('No se ha podido eliminar el establecimiento.', 'Error', {timeOut: 3000})
  }

  tieneLibro(){
    this.toastr.error('No se puede eliminar el establecimiento porque aún está en posesión de libros.', 'Error', {timeOut: 3000})
  }

}


