import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'feeStructure'
})
export class FeeStructurePipe implements PipeTransform {

  transform(value: any, serachTerm: any): unknown {
    if(value.length === 0)
    {
      return value
    }
    return value.filter(function(search){
      return search.standard.toLowerCase().indexOf(serachTerm.toLowerCase()) > -1
    })
  }

}
