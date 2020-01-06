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
  // 

  // obtenerValoracionLibro(){
    
  //   console.log("estoy en la valoracion")
  //   this._libroService.getValoracion().subscribe(
  //     response => {
  //       this.valoracionLibro = response;
  //       console.log(<any>response);
  //       for (let index = 0; index < this.valoracionLibro.length; index++) {
  
  //         this._libroService.getLibro(this.valoracionLibro[index]["idLibro"]).subscribe(
  //           response => {
  //             this.puntuacionTotal = this.valoracionLibro[index]["puntuacion"];
  //         this.votos = this.valoracionLibro[index]["votos"];
  //         this.estrellas = this.calcularEstrellas(this.puntuacionTotal, this.votos);
  //             this.titulo = response;
  //               this.libros.push([this.titulo, this.estrellas]);
      
  //           }, error => {
  //             console.log(<any>error);
  //           }
            
  //         )
          
  //       }
  //       console.log(this.libros)

  //       // this.libros.sort(function(a,b){//Convierto el string a minúscula por si el usuario introduce algunos apellidos con mayúsculas y otros con minúsculas.
  //       //   if(a[1] > b[1])return -1;
  //       //   if(a[1] < b[1])return 1;
  //       //   return 0;
  //       //   });
  
  //       //   console.log(this.libros)
       
  //     }, error => {
  //       console.log(<any>error);
  //     }
  //   )
  // }
}
