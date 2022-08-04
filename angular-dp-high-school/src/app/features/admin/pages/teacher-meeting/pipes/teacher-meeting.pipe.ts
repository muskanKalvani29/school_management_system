import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'teacherMeeting'
})
export class TeacherMeetingPipe implements PipeTransform {

  transform(value: any, serachTerm: any): unknown {
    if(value.length === 0)
    {
      return value
    }
    return value.filter(function(search){
      return search.meetingName.toLowerCase().indexOf(serachTerm.toLowerCase()) > -1
    })
  }

}
