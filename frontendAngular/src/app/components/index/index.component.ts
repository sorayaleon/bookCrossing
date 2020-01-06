import { Component, OnInit } from '@angular/core';
import { LibroService } from '../../Services/libro.service';
import { Libro } from '../../models/libro';
import { Valoracion } from '../../models/valoracion';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  public valoracionLibro;
  public numValoracion = 0;
  public puntuacionTotal;
  public votos;
  public estrellas;
  public puntos;
  public array = [];
  public libros;
  public titulo;

  constructor(
    private _libroService: LibroService,
  ) { }

  ngOnInit() {
    // this._libroService.getValoracion().subscribe(
    //   response => {
    //     this.libro = response;
    //     console.log(<any>response);
    //     for (let index = 0; index < this.libro.length; index++) {

    //       this.array.push(this.libro[index]["idLibro"], this.libro[index][""]);
          
    //       // this.obtenerValoracionLibro(this.libro[index["id"]]);
    //       // if(this.valoracionLibro[index]["idLibro"]==id){
    //       //    this.numValoracion += 1;
    //       //    this.puntuacionTotal = this.valoracionLibro[index]["puntuacion"];
    //       //    this.votos = this.valoracionLibro[index]["votos"];
    //       // }
    //     }
    //     // this.estrellas = this.calcularEstrellas(this.puntuacionTotal, this.votos);
    //   }, error => {
    //     console.log(<any>error);
    //   }
    // )

    this.obtenerValoracionLibro();


  }


  obtenerValoracionLibro(){
    this._libroService.obtenerEstrellas().subscribe(
      response => {
          this.libros = response;
      }, error => {
        console.log(<any>error)
      }
    )
  }

}
