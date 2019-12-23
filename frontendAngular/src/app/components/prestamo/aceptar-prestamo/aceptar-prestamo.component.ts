import { Component, OnInit } from '@angular/core';
import { PrestamoService } from '../../../Services/prestamo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../../shared/dialog.service';
import { LibroService } from '../../../Services/libro.service';
import { Libro } from '../../../models/libro';
import { HistorialService } from '../../../Services/historial.service';
import { Reserva } from '../../../models/reserva';


@Component({
  selector: 'app-aceptar-prestamo',
  templateUrl: './aceptar-prestamo.component.html',
  styleUrls: ['./aceptar-prestamo.component.css'],
  providers: [PrestamoService, LibroService]
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
    
    console.log(this.fechaPrestamo);
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



  confirmSolicitud(id, dni, idL, titulo, codigo, nombreEst, estado){
    console.log(id);
    console.log(idL);
    let tipo = "prestamo";
    estado = "prestado";
    this.dialogService.openConfirmDialog('¿Deseas confirmar el préstamo?').afterClosed().subscribe(res =>{
          if(res){
            
    
    console.log(tipo);
    this.reserva = new Reserva(0, tipo, dni, titulo, codigo, idL, this.fechaPrestamo,
    nombreEst, '', 0, '', 'no');
    console.log(tipo);
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

    this._prestamoService.aceptaPrestamo("prestamo", this.fechaPrestamo).subscribe(
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
  // 

  // getPrestamo(id){
  //   this._prestamoService.getSolicitud(id).subscribe(
  //     response => {
  //       this.reserva = response;
  //     }, error => {
  //       console.log(error);
  //     }
  //   )
  // }

  // getFichaLibro(id){
  //   this._libroService.getLibro(id).subscribe(
  //     response => {
  //       this.libro = response;
  //       console.log(this.libro.titulo);
  //     }, error => {
  //       console.log(<any>error);
  //     }
  //   );
  // }

  // confirmSolicitud(id, dni, codigo, titulo, nombreEst, estado){
  // estado = "prestado";
  //   this.reserva = new Reserva(0, 'prestamo', dni, titulo, codigo, this.fechaPrestamo,
  //   nombreEst, '', 0, '');
   
    
  //   this.dialogService.openConfirmDialog('¿Deseas confirmar el préstamo?').afterClosed().subscribe(res =>{
  //     if(res){
        
    
  //        this._prestamoService.aceptaPrestamo(id, 'tipo', this.fechaPrestamo).subscribe(
  //         response => {
  //           console.log(response);
  //           this._libroService.updateEstadoLibro(codigo,estado).subscribe(
  //             response=>{
                
  //               this.showSuccess();
  //               // this._router.navigateByUrl('/refresh', {skipLocationChange: true}).then(()=>
  //               //   this._router.navigate(['/gestionPrestamos'])); 
              
  //             },
        
  //            error => {
  //              console.log("estoy en error");
  //             //  console.log(this.solicitud.estado);
  //              this.showError();
  //              //this.status = 'failed';
  //              console.log(<any>error);
  //            });
  //           this.saveReserva = response.reserva;
  //         }, error => {
  //           console.log(<any>error);
  //         }
  //       )

  //       this._historialService.registraHistorial(this.reserva).subscribe(
  //         response => {
  //          console.log(response);
  //         }, error => {
  //           console.log(<any>error);
  //         }
  //       )
  //     }
  //   });
  // }

  // calcularFecha(){
  //   let dosSemanas = 1000 * 60 * 60 * 24 * 14;
  //   let suma = this.fechaPrestamo.getTime() + dosSemanas;
  //   this.fechaDevolucion = new Date(suma);
  //   return (Date.parse(this.fechaDevolucion));
  // }

  showSuccess(){
    this.toastr.success('El préstamo se ha realizado correctamente.', 'Correcto', {timeOut: 3000});
  }

  showError(){
    this.toastr.error('No se ha podido realizar el préstamo.', 'Error', {timeOut: 3000})
  }
}
