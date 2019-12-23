import { Component, OnInit } from '@angular/core';
import { HistorialService } from '../../Services/historial.service';

@Component({
  selector: 'app-incidencia',
  templateUrl: './incidencia.component.html',
  styleUrls: ['./incidencia.component.css']
})
export class IncidenciaComponent implements OnInit {
  public incidencias: any;
  public numIncidencias = 0;
  pageActual: number = 1;
  filterIncidencia = '';

  constructor(
    private _historialService: HistorialService,
  ) { }

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
  }

 
}
