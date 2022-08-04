import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'teacher'
})
export class TeacherPipe implements PipeTransform {

  transform(value: any, serachTerm: any): unknown {
    if(value.length === 0)
    {
      return value
    }
    return value.filter(function(search){
      return search.user.name.toLowerCase().indexOf(serachTerm.toLowerCase()) > -1
    })
  }

}
