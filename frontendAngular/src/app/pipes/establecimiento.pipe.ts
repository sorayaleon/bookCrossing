import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'establecimiento'
})
export class EstablecimientoPipe implements PipeTransform {

  transform(value: any, args: any): any {
    if(args === '' || args.length < 3) return value;
    const resultEstablecimientos = [];
    for(const establecimiento of value){
      if(establecimiento.nombreEst.toLowerCase().indexOf(args.toLowerCase() ) > -1){
        resultEstablecimientos.push(establecimiento);
      }
    }
    return resultEstablecimientos;
  }


}
