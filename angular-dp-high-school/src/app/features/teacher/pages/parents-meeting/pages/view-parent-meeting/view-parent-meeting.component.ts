import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {Meeting} from 'src/app/core/model/Meeting';
import {ParentsMeetingServiceService} from 'src/app/features/teacher/pages/parents-meeting/services/parents-meeting-service.service';

@Component({
  selector: 'app-view-parent-meeting',
  templateUrl: './view-parent-meeting.component.html',
  styleUrls: ['./view-parent-meeting.component.css']
})
export class ViewParentMeetingComponent implements OnInit {

  constructor(private router:Router,
    private route : ActivatedRoute,
    private _parentMeetingService:ParentsMeetingServiceService,
    ) { }

    meetingId: number;
    meeting:Meeting;

    ngOnInit(): void {
    console.log("oninit");
    this.meeting = new Meeting();
    this.meetingId = this.route.snapshot.params['meeting_id'];
    this._parentMeetingService.getParentMeeting(this.meetingId)
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
    console.log("go to");
    this.router.navigate(['/teacher/parents-meeting/all']);
  }
}

