import { Component, OnInit } from '@angular/core';
import { EstablecimientoService } from '../../Services/establecimiento.service';
import { LibroService } from '../../Services/libro.service';
import { PrestamoService } from '../../Services/prestamo.service';
import { UsuarioService } from '../../Services/usuario.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[EstablecimientoService, LibroService, PrestamoService]
})
export class HomeComponent implements OnInit {
  public establecimiento: any;
  public libro: any;
  pageActual: number = 1;
  filterLibro = '';
  filterEstablecimiento = '';
  public numInac = 0;
  public estInac = 0;
  public solicitud: any;
  public prestamo: any;
  public fechaHoy: any;
  public fechaDosDias: any;
  
  constructor(
    private _establecimientoService: EstablecimientoService,
    private _libroService: LibroService,
    private _prestamoService: PrestamoService,
    private _usuarioService: UsuarioService
  ) { 
    this.fechaHoy = new Date('Y-m-d H:i:s');
    this.fechaDosDias = this.calcularFecha();
    this.fechaHoy = moment(this.fechaHoy).format('YYYY-MM-DDThh:mm:ss');
  }

  ngOnInit() {
    this._libroService.getLibros().subscribe(
      result => {
       this.libro = result;
       for (let index = 0; index < this.libro.length; index++) {
        if(this.libro[index]["estado"]=="activo" ){
           this.numInac += 1;
        }
      }
       console.log(<any>result);

     },
     error => {
       console.log(<any>error);
     }
  );

    this._establecimientoService.getEstablecimientos().subscribe(
      result => {
       this.establecimiento = result;
       for (let index = 0; index < this.establecimiento.length; index++) {
        if(this.establecimiento[index]["estado"]=="activo" ){
           this.estInac += 1;
        }
      }
       console.log(<any>result);
     },
     error => {
       console.log(<any>error);
     }
  );

  this._prestamoService.getSolicitudes().subscribe(
    response => {
      
      console.log(<any>response);
      this.solicitud = response;
      console.log(this.solicitud);
      for (let index = 0; index < this.solicitud.length; index++) {
        if(this.solicitud[index]["tipo"]=="prestamo"){
          console.log("he entrado");
          console.log(this.solicitud[index]["fecha"]);
          console.log(this.fechaHoy);
          if(this.solicitud[index]["fecha"]<this.fechaHoy){
            console.log("he entrado alguna vez");
            this.controlRetraso(this.solicitud[index]["idUsu"]);
          } 
        }
      }

      for (let index = 0; index < this.solicitud.length; index++) {
        if(this.solicitud[index]["tipo"]=="solicitud"){
          if(this.solicitud[index]["fecha"]<this.fechaDosDias){
            this.controlLibro(this.solicitud[index]["idL"]);
          }
          
        }
      }
    }, error => {
      console.log(<any>error);
    }
  )
}

controlRetraso(id){
  this._usuarioService.updateEstadoUsuario(id, "penalizado").subscribe(
    result => {
      console.log(<any>result);
    }, error => {
      console.log(<any>error);
    }
  )
  }

  controlLibro(id){
    this._libroService.updateEstadoLibro(id, "activo").subscribe(
      result => {
        console.log(<any>result);
      }, error => {
        console.log(<any>error);
      }
    )
  }

  calcularFecha(){
    let hoy = new Date();
    let dosDias = 1000 * 60 * 60 * 24 * 2;
    let suma = hoy.getTime() + dosDias;
    this.fechaDosDias = new Date(suma);
    return this.fechaDosDias;
  }
}
