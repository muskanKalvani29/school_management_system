import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'holiday'
})
export class HolidayPipe implements PipeTransform {

  transform(value: any, serachTerm: any): unknown {
    if(value.length === 0)
    {
      return value
    }
    return value.filter(function(search){
      return search.holidayName.toLowerCase().indexOf(serachTerm.toLowerCase()) > -1
    })
  }

}
