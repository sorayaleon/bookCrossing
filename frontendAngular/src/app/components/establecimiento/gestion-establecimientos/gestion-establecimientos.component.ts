import { Component, OnInit } from '@angular/core';
import { EstablecimientoService } from '../../../Services/establecimiento.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../../shared/dialog.service';
import { Global } from '../../../Services/global.service';

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
  constructor(
    private _establecimientoService: EstablecimientoService,
    private _router: Router,
    private httpClient: HttpClientModule,
    private toastr: ToastrService,
    private dialogService: DialogService,
    private http: HttpClient,
    
  ) {
    this.title = "Gestión de establecimientos";
    this.dni = sessionStorage.getItem("dni");
   }

  ngOnInit() {
   
    this._establecimientoService.getEstablecimientos().subscribe(
      result => {
       this.establecimiento = result;
       console.log(this.establecimiento.estado);
       console.log(<any>result);
     },
     error => {
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
    this.toastr.error('No se ha podido eliminar el establecimiento.', 'Error', {timeOut: 3000})
  }

}
