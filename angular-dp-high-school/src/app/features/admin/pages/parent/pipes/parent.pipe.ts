import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parent'
})
export class ParentPipe implements PipeTransform {

  transform(value: any, serachTerm: any): unknown {
    if(value.length === 0)
    {
      return value
    }
      return value.filter(function(search){
        return search.student.grNo
      })
  }

}
