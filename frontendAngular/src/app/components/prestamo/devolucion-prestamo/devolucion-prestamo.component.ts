import { Component, OnInit } from '@angular/core';
import { PrestamoService } from '../../../Services/prestamo.service';
import { Reserva } from '../../../models/reserva';
import { DialogService } from '../../../shared/dialog.service';
import { HistorialService } from '../../../Services/historial.service';
import { LibroService } from '../../../Services/libro.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-devolucion-prestamo',
  templateUrl: './devolucion-prestamo.component.html',
  styleUrls: ['./devolucion-prestamo.component.css']
})
export class DevolucionPrestamoComponent implements OnInit {
  public solicitud: any;
  public numPrestamos = 0;
  pageActual: number = 1;
  filterSolicitud = '';
  public prestamo: Reserva;
  public savePrestamo;
  public fechaDevolucion: any;
  public status: string;

  constructor(
    private _prestamoService: PrestamoService,
    private dialogService: DialogService,
    private _historialService: HistorialService,
    private _libroService: LibroService,
    private toastr: ToastrService,
    private _router: Router,
  ) { 
    this.fechaDevolucion = new Date('Y-m-d H:i:s');
  }

  ngOnInit() {
    this._prestamoService.getSolicitudes().subscribe(
      result => {
       this.solicitud = result;
       console.log(this.solicitud);
       for (let index = 0; index < this.solicitud.length; index++) {
         if(this.solicitud[index]["tipo"]=="prestamo"){
            this.numPrestamos += 1;
         }
       }
       console.log(<any>result);
     },
     error => {
       console.log(<any>error);
     }
  );
  }

  devolverPrestamo(id, dni, idL, idUsu, titulo, codigo, nombreEst){
      let tipo = "devolucion";
  
      this.dialogService.openConfirmDialog('¿Deseas confirmar el préstamo?').afterClosed().subscribe(res =>{
        if(res){
          this.prestamo = new Reserva(0, 'devolucion', dni, titulo, codigo, idL, idUsu, this.fechaDevolucion,
            nombreEst, '', 0, '', 'no');
  
        this._historialService.registraHistorial(this.prestamo).subscribe(
          response => {
            console.log(response);
            this.status = 'success';
            this.savePrestamo = response.reserva;
            this.showSuccess();
          }, error => {
            this.status = 'failed';
            console.log(<any>error);
            this.showError();
          }
        )
  
        this._prestamoService.deleteReserva(id).subscribe(
          response => {
            console.log(response);
            this._libroService.updateEstadoLibro(idL, "activo").subscribe(
              response => {
                this.showSuccess();
              }, error => {
                this.status = 'failed';
                console.log(<any>error);
                this.showError();
              }
            )
            this.showSuccess();
            this._router.navigateByUrl('/refresh', {skipLocationChange: true}).then(()=>
          this._router.navigate(['/devolucionPrestamo'])); 

          }, error => {
            this.status = 'failed';
            console.log(<any>error);
            this.showError();
          }
        )
    }
  })
  }
  // 
  
  showSuccess(){
    this.toastr.success('La devolución del préstamo se ha realizado correctamente.', 'Correcto', {timeOut: 3000});
  }
  
  showError(){
    this.toastr.error('No se ha podido realizar la devolución del préstamo.', 'Error', {timeOut: 3000})
  }
  
}
