import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'establecimiento'
})
export class EstablecimientoPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg === '' || arg.length < 3) return value;
    const resultEstablecimientos = [];
    for(const establecimiento of value){
      if(establecimiento.cp.indexOf() > -1 || establecimiento.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultEstablecimientos.push(establecimiento);
      }
    }
    return resultEstablecimientos;
  }


}
