import { Component, OnInit } from '@angular/core';
import {Meeting} from 'src/app/core/model/Meeting';
import {UserType} from 'src/app/core/model/UserType';
import {TeacherMeetingServiceService} from 'src/app/features/admin/pages/teacher-meeting/service/teacher-meeting-service.service';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar'
import {Router,ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.css']
})
export class AddMeetingComponent implements OnInit {

  constructor(private meetingService:TeacherMeetingServiceService,
    private router:Router,
    private snakBar:MatSnackBar) { }
  meeting: Meeting = new Meeting();
  ngOnInit(): void {
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
  
  addMeeting(addMeeting:any)
  {
    console.log("add meeting");
    this.meeting = new Meeting();
    this.meeting.usertype = new UserType();
    this.meeting.usertype.usertypeId = 3;
    // this.meeting.usertype.userType = "teacher";
    this.meeting.meetingName = addMeeting.meetingName;
    let getMDate:String = addMeeting.meetingDate;
    let splitMDate:String[] = getMDate.split("-");
    let concateMDate = splitMDate[1] + "-" + splitMDate[2] + "-" + splitMDate[0];
    this.meeting.meetingDate = concateMDate;
    this.meeting.meetingStartTime = addMeeting.meetingStartTime;
    // this.meeting.meetingStartTime+=":00";
    this.meeting.meetingEndTime = addMeeting.meetingEndTime;
    // this.meeting.meetingEndTime+=":00";
    this.meeting.meetingDescription = addMeeting.meetingDescription;

    //call service
    this.meetingService.addMeeting(this.meeting)
    .subscribe(data=>{console.log(data)
      this.snakBar.open("successfully Added..","Cancle", {       
        duration : 3000,
        horizontalPosition:'center',
        verticalPosition:"bottom"
      });
      this.router.navigate(['/admin/teachers-meeting/all-meetings']);
    },error=>{
      this.handleError(error);
    });
  }
}
