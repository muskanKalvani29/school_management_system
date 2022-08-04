import { Component, OnInit } from '@angular/core';
import {Meeting} from 'src/app/core/model/Meeting';
import {TeacherMeetingServiceService} from 'src/app/features/admin/pages/teacher-meeting/service/teacher-meeting-service.service';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-view-meeting',
  templateUrl: './view-meeting.component.html',
  styleUrls: ['./view-meeting.component.css']
})
export class ViewMeetingComponent implements OnInit {

  meetingId : number
  meeting : Meeting
  constructor(private viewMeetingService:TeacherMeetingServiceService,
              private router : Router,
              private route : ActivatedRoute) { }

  ngOnInit(): void 
  {
    this.meeting = new Meeting();
    this.meetingId = this.route.snapshot.params['meetingId'];
    this.viewMeetingService.getMeeting(this.meetingId)
    .subscribe(data=>{
      console.log(data);
      this.meeting = data;
    },error=>{
      this.handleError(error);
    })
  }
  handleError(error)
  {
  console.log("status code..");  
  console.log(error);
  if(error==404)
  {
    console.log("hi")
    this.router.navigate(['/page-not-found']);
  }
  else if(error==500)
  {
    console.log("hi")
    this.router.navigate(['/internal-server-error']);
  }
  else
  {
    console.log("hi")
    this.router.navigate(['/error-page']);
  }
}
  goToMeetingList()
  {
    console.log("goto");
    this.router.navigate(['/teacher/schedule/all-meetings']);
  }

}
