import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {Meeting} from 'src/app/core/model/Meeting';
import {ParentsMeetingServiceService} from 'src/app/features/teacher/pages/parents-meeting/services/parents-meeting-service.service';
import { AuthenticationService } from 'src/app/app-home/services/authentication.service';
import { CoreService } from 'src/app/app-home/services/core.service';
import { TeacherOwnServiceService } from 'src/app/features/teacher/services/teacher-own-service.service';
import { User } from 'src/app/core/model/User';
import { Division } from 'src/app/core/model/Division';
import { Standard } from 'src/app/core/model/Standard';
import { Teacher } from 'src/app/core/model/Teacher';
import { StandardDivisionService } from 'src/app/features/admin/services/standard-division.service';
import {MatSnackBar} from '@angular/material/snack-bar'
import { TeacherMeetingServiceService } from 'src/app/features/admin/pages/teacher-meeting/service/teacher-meeting-service.service';


@Component({
  selector: 'app-update-parent-meeting',
  templateUrl: './update-parent-meeting.component.html',
  styleUrls: ['./update-parent-meeting.component.css']
})
export class UpdateParentMeetingComponent implements OnInit {

  meetingId: number;
  meeting:Meeting;
  userId:number
  userobj:User;
  UserName:String
  standards:Standard[];
  divisions:Division[];
  teacher:Teacher;

  constructor(private meetingService:TeacherMeetingServiceService,private router:Router,
    private route : ActivatedRoute,
    private _parentMeetingService:ParentsMeetingServiceService,
    private snakBar:MatSnackBar,
    private authService:AuthenticationService,
    private getTecharService:TeacherOwnServiceService,
    private coreService:CoreService,
    private getStdDivService:StandardDivisionService) { }

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

  updateMeeting()
  {
    let getMDate:String = this.meeting.meetingDate;
    let splitMDate:String[] = getMDate.split("-");
    let concateMDate = splitMDate[1] + "-" + splitMDate[2] + "-" + splitMDate[0];
    this.meeting.meetingDate = concateMDate;
    this.meetingService.updateMeeting(this.meetingId,this.meeting)
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
  
  //on submit
  onSubmit()
  {
    console.log("form update");
    this.updateMeeting();
  }

  goToMeetingList()
  {
    console.log("go to");
    this.router.navigate(['/teacher/parents-meeting/all']);
  }

}
