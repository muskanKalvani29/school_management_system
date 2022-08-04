import { Component, OnInit } from '@angular/core';
import {Meeting} from 'src/app/core/model/Meeting';
import {TeacherMeetingServiceService} from 'src/app/features/admin/pages/teacher-meeting/service/teacher-meeting-service.service';
import {Router,ActivatedRoute} from '@angular/router';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar'
@Component({
  selector: 'app-update-meeting',
  templateUrl: './update-meeting.component.html',
  styleUrls: ['./update-meeting.component.css']
})
export class UpdateMeetingComponent implements OnInit {

  meeting : Meeting;
  meetingId : number;
  getMdate: String;
  constructor(private updateTeacherMeetingService: TeacherMeetingServiceService,
              private router : Router,
              private route : ActivatedRoute,
              private snakBar:MatSnackBar) { }

  ngOnInit(): void 
  {
    this.meeting = new Meeting();
    this.meetingId = this.route.snapshot.params['meetingId'];
    this.updateTeacherMeetingService.getMeeting(this.meetingId)
    .subscribe(data=>{
      console.log(data);
      this.meeting=data;
      this.getMdate = this.meeting.meetingDate;
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
  //update meeting
  updateTeacherMeeting()
  {
    // this.meeting.meetingStartTime+=":00";
    // this.meeting.meetingEndTime+=":00";
    if(this.meeting.meetingDate != this.getMdate)
    {
      let getMDate:String = this.meeting.meetingDate;
      let splitMDate:String[] = getMDate.split("-");
      let concateMDate = splitMDate[1] + "-" + splitMDate[2] + "-" + splitMDate[0];
      this.meeting.meetingDate = concateMDate;
    }
   
    this.updateTeacherMeetingService.updateMeeting(this.meetingId,this.meeting)
    .subscribe(data=>{
      console.log(data);
      this.meeting = new Meeting();
      console.log("hi");
      this.snakBar.open("successfully Updated..","Cancle", {       
        duration : 3000,
        horizontalPosition:'center',
        verticalPosition:"bottom"
      });
      this.goToMeetingList();
    },error=>{
      this.handleError(error);
    })
  }

  //onsubmit
  onSubmit()
  {
    console.log("form update");
    this.updateTeacherMeeting();
  }

  //go back to meeting list
  goToMeetingList()
  {
    console.log("hi");
    this.router.navigate(['admin/teachers-meeting/all-meetings']);
  }
}
