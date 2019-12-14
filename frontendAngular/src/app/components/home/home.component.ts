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
  constructor(
    private _establecimientoService: EstablecimientoService,
    private _libroService: LibroService,
  ) { }

  ngOnInit() {
    this._libroService.getLibros().subscribe(
      result => {
       this.libro = result;
       console.log(<any>result);
     },
     error => {
       console.log(<any>error);
     }
  );

    this._establecimientoService.getEstablecimientos().subscribe(
      result => {
       this.establecimiento = result;
       console.log(<any>result);
     },
     error => {
       console.log(<any>error);
     }
  );
  }

}
