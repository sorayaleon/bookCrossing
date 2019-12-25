import { Component, OnInit } from '@angular/core';
import { PrestamoService } from '../../../Services/prestamo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../../shared/dialog.service';
import { LibroService } from '../../../Services/libro.service';
import { Libro } from '../../../models/libro';
import { HistorialService } from '../../../Services/historial.service';
import { Reserva } from '../../../models/reserva';
import * as moment from 'moment';

@Component({
  selector: 'app-aceptar-prestamo',
  templateUrl: './aceptar-prestamo.component.html',
  styleUrls: ['./aceptar-prestamo.component.css'],
  providers: [PrestamoService, LibroService, HistorialService]
})
export class AceptarPrestamoComponent implements OnInit {
  public solicitud: any;
  public numInac = 0;
  pageActual: number = 1;
  filterSolicitud = '';
  public saveReserva;
  public libro: Libro;
  public fechaPrestamo: any;
  public reserva: Reserva;
  public status: string;
  public fechaDevolucion: any;

  constructor(
    private _prestamoService: PrestamoService,
    private _router: Router,
    private _route: ActivatedRoute,
    private toastr: ToastrService,
    private dialogService: DialogService,
    private _libroService: LibroService, 
    private _historialService: HistorialService
  ) { 
    this.fechaPrestamo = new Date('Y-m-d H:i:s');
    this.fechaDevolucion = this.calcularFecha();
    console.log(this.fechaDevolucion);
    this.fechaDevolucion = moment(this.fechaDevolucion).format('YYYY-MM-DDThh:mm:ss');
    console.log(this.fechaDevolucion);
    console.log(typeof(this.fechaPrestamo));
  }

  ngOnInit() {

    this._prestamoService.getSolicitudes().subscribe(
      result => {
       this.solicitud = result;
       console.log(this.solicitud);
       for (let index = 0; index < this.solicitud.length; index++) {
         if(this.solicitud[index]["tipo"]=="solicitud"){
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



  confirmSolicitud(id, dni, idL, idUsu, titulo, codigo, nombreEst, estado){
    console.log(id);
    console.log(idL);
   
    console.log(this.fechaDevolucion);
    let tipo = "prestamo";
    estado = "prestado";
    this.dialogService.openConfirmDialog('¿Deseas confirmar el préstamo?').afterClosed().subscribe(res =>{
          if(res){
            
    
    console.log(tipo);
    this.reserva = new Reserva(0, tipo, dni, titulo, codigo, idL, idUsu, this.fechaPrestamo,
    nombreEst, '', 0, '', 'no');
    console.log(idUsu);
    this._historialService.registraHistorial(this.reserva).subscribe(
      response => {
        console.log(response);
        this.status = 'success';
        this.saveReserva = response.reserva;
        this.showSuccess();
      }, error => {
        this.status = 'failed';
        console.log(<any>error);
        this.showError();
      }
    )

    console.log(tipo);
    console.log(this.fechaDevolucion);
    console.log(id);
    this._prestamoService.aceptaPrestamo(id, "prestamo", this.fechaDevolucion).subscribe(
      response => {
        console.log(response);
        this._libroService.updateEstadoLibro(idL, estado).subscribe(
          response => {
            console.log(estado);
            this.showSuccess();
          }, error => {
            this.status = 'failed';
            console.log(<any>error);
            this.showError();
          }
        )
        this.showSuccess();
        this._router.navigateByUrl('/refresh', {skipLocationChange: true}).then(()=>
        this._router.navigate(['/gestionPrestamos']));
  
      }, error => {
        this.status = 'failed';
        console.log(<any>error);
        this.showError();
      }
    )
  }
}
  
  )}

  calcularFecha(){
    let hoy = new Date();
    let dosSemanas = 1000 * 60 * 60 * 24 * 14;
    let suma = hoy.getTime() + dosSemanas;
    this.fechaDevolucion = new Date(suma);
    // return (Date.parse(this.fechaDevolucion));
    return this.fechaDevolucion;
  }

  showSuccess(){
    this.toastr.success('El préstamo se ha realizado correctamente.', 'Correcto', {timeOut: 3000});
  }

  showError(){
    this.toastr.error('No se ha podido realizar el préstamo.', 'Error', {timeOut: 3000})
  }
}
