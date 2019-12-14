import { Component, OnInit } from '@angular/core';
import { EstablecimientoService } from '../../../Services/establecimiento.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../../shared/dialog.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css'],
  providers: [EstablecimientoService]
})
export class SolicitudComponent implements OnInit {
  public establecimiento: any;
  public numInac = 0;
  pageActual: number = 1;
  filterEstablecimiento = '';

  constructor(
    private _establecimientoService: EstablecimientoService,
    private _router: Router,
    private toastr: ToastrService,
    private dialogService: DialogService

  ) { }

  ngOnInit() {
    this._establecimientoService.getEstablecimientos().subscribe(
      result => {
       this.establecimiento = result;
       console.log(this.establecimiento);
       for (let index = 0; index < this.establecimiento.length; index++) {
         if(this.establecimiento[index]["estado"]=="inactivo"){
            this.numInac += 1;
         }
       }
       console.log(<any>result);
     },
     error => {
       console.log(<any>error);
     }
  );
  }

  confirmEstablecimiento(id, estado){
    console.log(estado);
    estado = "activo";
    this.dialogService.openConfirmDialog('¿Deseas confirmar el establecimiento?').afterClosed().subscribe(res =>{
      if(res){
        this._establecimientoService.updateEstado(id, estado).subscribe(
          response=>{
            console.log(estado);
            this.verificacionSuccess();
            this._router.navigateByUrl('/refresh', {skipLocationChange: true}).then(()=>
              this._router.navigate(['/gestionSolicitudes'])); 
            console.log(estado);
            
            // this._router.navigate(['/gestionSolicitudes']);
          },
    
         error => {
           console.log("estoy en error");
           console.log(this.establecimiento.estado);
           this.verificacionError();
           //this.status = 'failed';
           console.log(<any>error);
         });
      }
    });
  }

  deleteEstablecimiento(id){
    this.dialogService.openConfirmDialog('¿Deseas borrar el libro?').afterClosed().subscribe(res =>{
      if(res){
    this._establecimientoService.deleteEstablecimiento(id).subscribe(
      response => {
        this.showSuccess();
        this._router.navigateByUrl('/refresh', {skipLocationChange: true}).then(()=>
          this._router.navigate(['/gestionEstablecimientos'])); 
       
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
    this.toastr.error('El establecimiento no se ha eliminado.', 'Error', {timeOut: 3000})
  }

  verificacionSuccess(){
    this.toastr.success('El establecimiento ha sido verificado con éxito.', 'Correcto', {timeOut: 3000});
  }

  verificacionError(){
    this.toastr.error('El establecimiento no se ha verificado.', 'Error', {timeOut: 3000})
  }

}
