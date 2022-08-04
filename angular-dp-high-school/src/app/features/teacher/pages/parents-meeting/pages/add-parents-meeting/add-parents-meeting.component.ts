import { Component, OnInit } from '@angular/core';
import {Meeting} from 'src/app/core/model/Meeting';
import {UserType} from 'src/app/core/model/UserType';
import {TeacherMeetingServiceService} from 'src/app/features/admin/pages/teacher-meeting/service/teacher-meeting-service.service';
import {MatSnackBar} from '@angular/material/snack-bar'
import {Router} from '@angular/router';
import { AuthenticationService } from 'src/app/app-home/services/authentication.service';
import { CoreService } from 'src/app/app-home/services/core.service';
import { TeacherOwnServiceService } from 'src/app/features/teacher/services/teacher-own-service.service';
import { User } from 'src/app/core/model/User';
import { Division } from 'src/app/core/model/Division';
import { Standard } from 'src/app/core/model/Standard';
import { Teacher } from 'src/app/core/model/Teacher';
import { StandardDivisionService } from 'src/app/features/admin/services/standard-division.service';


@Component({
  selector: 'app-add-parents-meeting',
  templateUrl: './add-parents-meeting.component.html',
  styleUrls: ['./add-parents-meeting.component.css']
})
export class AddParentsMeetingComponent implements OnInit {

  constructor(private meetingService:TeacherMeetingServiceService,
    private router:Router,
    private snakBar:MatSnackBar,
    private authService:AuthenticationService,
    private getTecharService:TeacherOwnServiceService,
    private coreService:CoreService,
    private getStdDivService:StandardDivisionService) { }

  meeting: Meeting = new Meeting();
  userId:number
  userobj:User;
  UserName:String
  standards:Standard[];
  divisions:Division[];
  teacher:Teacher;
  standard:Standard;
  division:Division;
  division_id:number;
  
  ngOnInit(): void {
    this.getStandardList();
    this.getDivisionList();
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
  getStandardList()
  {

    let user:string[];
    let username:String;

    user = localStorage.getItem(this.authService.LOCAL_STORAGE_ATTRIBUTE_USERNAME).split(" ");
    username = atob(user[0]);
    //get user
    this.coreService.getUserByUserName(username).subscribe(data=>
      {
        this.userobj = data;
        this.UserName = username;
        this.userId = this.userobj.userId;
        console.log(this.UserName);
        //get teacher
        this.getTecharService.getTeacherByUserName(this.UserName).subscribe(data=>{
          console.log(data);
          this.teacher = data; console.log(this.teacher);
          this.standards = this.teacher.standard; console.log("stnadard list = > "+this.standards);
        },error=>{
          this.handleError(error);
        })
      },error=>{
        this.handleError(error);
      })

    
  }
  //get divisions
  getDivisionList()
  {
    console.log("Division list");
    this.getStdDivService.getDivisionList()
    .subscribe(data=>{
      console.log(data);
      this.divisions=data;
    },error=>{
      this.handleError(error);
    })
  }

  addMeeting(addMeeting:any)
  {
    console.log("add meeting");
    this.meeting = new Meeting();
    this.meeting.standard = new Standard();
    this.meeting.division = new Division();
    this.meeting.usertype = new UserType();
    this.meeting.usertype.usertypeId = 2;
    console.log("standard=. "+addMeeting.standard);
    this.meeting.standard.standardName = addMeeting.standard;
    if(addMeeting.division=="rose"){
      this.division_id=1;
    }
    else if(addMeeting.division=="lotus"){
      this.division_id=3;
    }
    else {
      this.division_id=2;
    }
    this.meeting.division.divisionId = this.division_id;

    this.meeting.meetingName = addMeeting.meetingName;
    let getMDate:String = addMeeting.meetingDate;
    let splitMDate:String[] = getMDate.split("-");
    let concateMDate = splitMDate[1] + "-" + splitMDate[2] + "-" + splitMDate[0];
    this.meeting.meetingDate = concateMDate;
    this.meeting.meetingStartTime = addMeeting.meetingStartTime;
    this.meeting.meetingEndTime = addMeeting.meetingEndTime;
    this.meeting.meetingDescription = addMeeting.meetingDescription;

    //call service
    this.meetingService.addMeeting(this.meeting)
    .subscribe(data=>{console.log(data)
      this.snakBar.open("successfully Added..","Cancle", {       
        duration : 3000,
        horizontalPosition:'center',
        verticalPosition:"bottom"
      });
      this.router.navigate(['/teacher/parents-meeting/all']);
    },error=>{
      this.handleError(error);
    });
  }
}

