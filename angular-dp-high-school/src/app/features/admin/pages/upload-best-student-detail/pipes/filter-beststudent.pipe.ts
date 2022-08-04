import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBeststudent'
})
export class FilterBeststudentPipe implements PipeTransform {

  transform(value: any, serachTerm: any): unknown {
    if(value.length === 0)
    {
      return value
    }
    return value.filter(function(search){
      return search.name.toLowerCase().indexOf(serachTerm.toLowerCase()) > -1
    })
  }

}
