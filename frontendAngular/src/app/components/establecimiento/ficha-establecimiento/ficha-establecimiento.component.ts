import { Component, OnInit } from '@angular/core';
import { Establecimiento } from '../../../models/establecimiento';
import { EstablecimientoService } from '../../../Services/establecimiento.service';
import { Global } from '../../../Services/global.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../../../shared/dialog.service';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../../Services/usuario.service';

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

  constructor(
    private _establecimientoService: EstablecimientoService,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private _router: Router,
    private toastr: ToastrService,
    private _usuarioService: UsuarioService,
    
  ) {
    this.url = Global.url;
    this.tipo = sessionStorage.getItem("tipo");
    this.idUsu = sessionStorage.getItem("id");
    
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

  deleteEstablecimiento(id){
    this.dialogService.openConfirmDialog('¿Deseas borrar el establecimiento?').afterClosed().subscribe(res =>{
      if(res){
    this._establecimientoService.deleteEstablecimiento(id).subscribe(
      response => {
        this.showSuccess();
        if(this.tipo == "responsable"){
          this._usuarioService.updateTipoUsuario(this.idUsu, 'normal');
        }
        this._router.navigate(['/home']);

      }, error => {
        console.log(<any>error);
        this.showError();
      }
    )
  }
});
  }

  showSuccess(){
    this.toastr.success('El establecimiento ha sido eliminado con éxito.', 'Correcto', {timeOut: 3000});
  }

  showError(){
    this.toastr.error('No se ha podido eliminar el establecimiento.', 'Error', {timeOut: 3000})
  }

}
