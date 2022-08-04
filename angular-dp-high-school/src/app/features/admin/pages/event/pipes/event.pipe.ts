import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'event'
})
export class EventPipe implements PipeTransform {

  transform(value: any, serachTerm: any): unknown {
    if(value.length === 0)
    {
      return value
    }
    return value.filter(function(search){
      return search.eventName.toLowerCase().indexOf(serachTerm.toLowerCase()) > -1
    })
  }

}
