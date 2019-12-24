import { Component, OnInit } from '@angular/core';
import { PrestamoService } from '../../../Services/prestamo.service';


@Component({
  selector: 'app-retraso',
  templateUrl: './retraso.component.html',
  styleUrls: ['./retraso.component.css']
})
export class RetrasoComponent implements OnInit {
  public solicitud: any;
  public numRetrasos = 0;
  public fechaDevolucion;
  pageActual: number = 1;
  filterSolicitud = '';

  constructor(
    private _prestamoService: PrestamoService,
  ) { }

  ngOnInit() {
  //   this._prestamoService.getSolicitudes().subscribe(
  //     result => {
  //      this.solicitud = result;
  //      console.log(this.solicitud);
  //      for (let index = 0; index < this.solicitud.length; index++) {
  //       this.cambiarEstado(this.solicitud.id);
  //        if(this.solicitud[index]["tipo"]=="retrasado"){
  //           this.numRetrasos += 1;
  //        }
  //      }
  //      console.log(<any>result);
  //    },
  //    error => {
  //      console.log(<any>error);
  //    }
  // );
  // this.cambiarEstado(this.solicitud.id);
  }

  // cambiarEstado(id){
  //   this._prestamoService.getSolicitud(id).subscribe(
  //     result => {
  //       let hoy = new Date();
  //      let fechaPrestamo;
  //      this.solicitud = result;
  //     fechaPrestamo = this.solicitud.fecha;
  //      this.fechaDevolucion = this.calcularFecha(fechaPrestamo);
  //      if(this.fechaDevolucion < hoy){
  //        this.solicitud.tipo = "retraso";
  //      }
  //      console.log(this.solicitud.tipo);
  //    },
  //    error => {
  //      console.log(<any>error);
  //    }
  // );
  // }
  

  // calcularFecha(fechaPrestamo){
  //     let dosSemanas = 1000 * 60 * 60 * 24 * 14;
  //     let suma = fechaPrestamo.getTime() + dosSemanas;
  //     this.fechaDevolucion = new Date(suma);
  //     return (Date.parse(this.fechaDevolucion));
  //   }
}
