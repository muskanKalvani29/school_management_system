import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activitiesAchievements'
})
export class ActivitiesAchievementsPipe implements PipeTransform {

  transform(value: any, serachTerm: any): unknown {
    if(value.length === 0)
    {
      return value
    }
    return value.filter(function(search){
      return search.imageName.toLowerCase().indexOf(serachTerm.toLowerCase()) > -1
    })
  }
}
