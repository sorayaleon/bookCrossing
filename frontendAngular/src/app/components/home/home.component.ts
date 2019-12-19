import { Component, OnInit } from '@angular/core';
import { EstablecimientoService } from '../../Services/establecimiento.service';
import { LibroService } from '../../Services/libro.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[EstablecimientoService, LibroService]
})
export class HomeComponent implements OnInit {
  public establecimiento: any;
  public libro: any;
  pageActual: number = 1;
  filterLibro = '';
  filterEstablecimiento = '';
  public numInac = 0;
  public estInac = 0;
  
  constructor(
    private _establecimientoService: EstablecimientoService,
    private _libroService: LibroService,
  ) { }

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
  }

}
