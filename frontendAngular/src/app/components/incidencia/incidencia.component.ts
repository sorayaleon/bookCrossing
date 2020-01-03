import { Component, OnInit } from '@angular/core';
import { HistorialService } from '../../Services/historial.service';
import { PrestamoService } from '../../Services/prestamo.service';
import * as moment from 'moment';

@Component({
  selector: 'app-incidencia',
  templateUrl: './incidencia.component.html',
  styleUrls: ['./incidencia.component.css']
})
export class IncidenciaComponent implements OnInit {
  public incidencias: any;
  public numIncidencias = 0;
  public retrasos: any;
  public numRetrasos = 0;
  pageActual: number = 1;
  filterIncidencia = '';
  public fechaHoy: any;
  public filtro: any = {dni: ''};
  public filtroRet: any = {dni:''};

  constructor(
    private _historialService: HistorialService,
    private _prestamoService: PrestamoService,
  ) { 
    this.fechaHoy = new Date();
    this.fechaHoy = moment(this.fechaHoy).format('YYYY-MM-DD');
  }

  ngOnInit() {
    this._historialService.getHistorial().subscribe(
      result=> {
        this.incidencias = result;
        console.log(this.incidencias);
        for (let index = 0; index < this.incidencias.length; index++) {
          if(this.incidencias[index]["incidenciaActiva"]=="si"){
             this.numIncidencias += 1;
          }
        }
        console.log(<any>result);
      }, error => {
        console.log(<any>error);
      }
    )

    this._prestamoService.getSolicitudes().subscribe(
      response => {
        console.log(<any>response);
        this.retrasos = response;
        for (let index = 0; index < this.retrasos.length; index++) {
          if(this.retrasos[index]["tipo"]=="prestamo" && this.retrasos[index]["fecha"]<this.fechaHoy){
             this.numRetrasos += 1;
          }
        }
      }, error => {
        console.log(<any>error);
      }
    )
  }

 
}
