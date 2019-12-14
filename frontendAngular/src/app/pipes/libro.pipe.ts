import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'libro'
})
export class LibroPipe implements PipeTransform {
 
  transform(value: any, arg: any): any {
    if(arg === '' || arg.length < 3) return value;
    const resultLibros = [];
    for(const libro of value){
      if(libro.titulo.toLowerCase().indexOf(arg.toLowerCase()) > -1 || libro.autor.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultLibros.push(libro);
      }
    }
    return resultLibros;
  }

}
