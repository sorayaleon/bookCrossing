import { Component, OnInit } from '@angular/core';
import { Establecimiento } from '../../../models/establecimiento';
import { EstablecimientoService } from '../../../Services/establecimiento.service';
import { Global } from '../../../Services/global.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../../../shared/dialog.service';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../../Services/usuario.service';
import { LibroService } from '../../../Services/libro.service';
import { Libro } from '../../../models/libro';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-ficha-establecimiento',
  templateUrl: './ficha-establecimiento.component.html',
  styleUrls: ['./ficha-establecimiento.component.css'],
  providers: [EstablecimientoService]
})
export class FichaEstablecimientoComponent implements OnInit {
  public url: string;
  public establecimiento: Establecimiento;
  public tipo;
  public idUsu;
  public libro: Libro;
  public contador;
  public usuario: Usuario;
  public dni;
  public idEst;

  constructor(
    private _establecimientoService: EstablecimientoService,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private _router: Router,
    private toastr: ToastrService,
    private _usuarioService: UsuarioService,
    private _libroService: LibroService,
    
  ) {
    this.url = Global.url;
    this.tipo = sessionStorage.getItem("tipo");
    this.idUsu = sessionStorage.getItem("id");
    this.dni = sessionStorage.getItem("dni");
   }

  ngOnInit() {
    this.route.params.subscribe(params=> {
      let id = params.id;
     this.getFichaEstablecimiento(id);
    })
    
    
    
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

//   deleteEstablecimiento(id, nombre){
//     console.log(nombre)
//     this.dialogService.openConfirmDialog('¿Deseas borrar el establecimiento?').afterClosed().subscribe(res =>{
//       if(res){
//         this._libroService.getLibros().subscribe(
//           response => {
//             this.libro = response;
//             for(let index=0; index<this.libro.length; index++){
//               if(this.libro[index]["establecimiento"]== nombre){
//                 this.contador+=1;
//               }
//             }
//             if(this.contador == 0){
              
//             this._establecimientoService.deleteEstablecimiento(id).subscribe(
//               response => {
//                 this.showSuccess();
//                 if(this.tipo == "responsable"){
//                   this._usuarioService.updateTipoUsuario(this.idUsu, 'normal');
//                 }
//                 this._router.navigate(['/home']);
        
//               }, error => {
//                 console.log(<any>error);
//                 this.showError();
//               }
//             )
//           }
//           },error => {
//               this.error();
//           }
//     )}
// });
//   }

  deleteEstablecimiento(id, nombre){
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
            
                 if(this.tipo !='admin'){
                  this.tipo = "normal";
                }
                console.log(this.tipo);
                this.idUsu = parseInt(this.idUsu);
                console.log(this.idUsu);
                 this._usuarioService.updateTipoUsuario(this.dni, this.tipo).subscribe(
                   response => {
                     console.log(this.tipo);
                     this._establecimientoService.deleteEstablecimiento(id).subscribe(
                      response => {
                    this.showSuccess();
                    this._router.navigate(['/home']);
                  }, error => {
                    console.log(<any>error);
                    this.error();
                  }
                )
                   },
                   error => {
                    console.log(error);
                    this.error();
                   }
                 );
                } else {
                  this.showError();
                }
        }, error => {
          console.log(<any>error)
          this.error();
        }
      )
      console.log(this.contador)

      
  }
});
  }

  showSuccess(){
    this.toastr.success('El establecimiento ha sido eliminado con éxito.', 'Correcto', {timeOut: 3000});
  }

  showError(){
    this.toastr.error('No se ha podido eliminar el establecimiento. Retire los libros antes de proceder a eliminarlo.', 'Error', {timeOut: 3000})
  }

  error(){
    this.toastr.error('Error al eliminar el establecimiento.', 'Error', {timeOut: 3000});
  }

}
