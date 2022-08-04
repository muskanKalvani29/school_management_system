import { Component, OnInit } from '@angular/core';
import {Meeting} from 'src/app/core/model/Meeting';
import {TeacherMeetingServiceService} from 'src/app/features/admin/pages/teacher-meeting/service/teacher-meeting-service.service';
import {Router} from '@angular/router';
import {ParentsMeetingServiceService} from 'src/app/features/teacher/pages/parents-meeting/services/parents-meeting-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/features/DialogBox/dialog-box/dialog-box.component';
import {MatSnackBar} from '@angular/material/snack-bar'
import { AuthenticationService } from 'src/app/app-home/services/authentication.service';
import { CoreService } from 'src/app/app-home/services/core.service';
import { TeacherOwnServiceService } from 'src/app/features/teacher/services/teacher-own-service.service';
import { User } from 'src/app/core/model/User';
import { Division } from 'src/app/core/model/Division';
import { Standard } from 'src/app/core/model/Standard';
import { Teacher } from 'src/app/core/model/Teacher';
import { StandardDivisionService } from 'src/app/features/admin/services/standard-division.service';


@Component({
  selector: 'app-all-parents-meeting',
  templateUrl: './all-parents-meeting.component.html',
  styleUrls: ['./all-parents-meeting.component.css']
})
export class AllParentsMeetingComponent implements OnInit {

  meetings : Array<Meeting> = new Array()
  nameSearch:String=""
  page:number=0
  pages:Array<Number>
  totalPages:Number;
  statusNext:boolean=true
  statusPre:boolean = true
  selectedstd:any;
  selecteddiv:any;

  userId:number
  userobj:User;
  UserName:String
  standards:Standard[];
  divisions:Division[];
  teacher:Teacher;

  constructor(private getMeetingsService:TeacherMeetingServiceService,
              private parentMeetingService:ParentsMeetingServiceService,
              private router : Router,private dialog:MatDialog,private snakBar:MatSnackBar,
              private authService:AuthenticationService,
              private getTecharService:TeacherOwnServiceService,
              private coreService:CoreService,
              private getStdDivService:StandardDivisionService) { }

  //load list data
  ngOnInit(): void 
  {
    console.log("oninit");
    console.log("page"+this.page)
    this.getStandardList();
    this.getDivisionList();
    // this.getMeetingList();
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

  setPage(i,event:any)
  {
    this.page=i;
    console.log("page"+this.page)
    if(this.page==0) {this.statusPre=true; }
    else{this.statusPre=false;}
    if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
    else{this.statusNext=false}
    this.getMeetingByStdAndDiv();
  }
  pre()
  {
    console.log("page"+this.page)
    if(this.page==0) {this.statusPre=true; }
    else{this.statusPre=false;this.page=this.page.valueOf()-1;
      this.getMeetingList();}
    if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
    else{this.statusNext=false}
  }
  next()
  {
    if(this.page==0) {this.statusPre=true; }
    else{this.statusPre=false;}
    console.log("page"+this.page)
     if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
    else{this.statusNext=false; this.page=this.page.valueOf()+1;
      this.getMeetingList();}
  }
  //get meeting list
  getMeetingList()
  {
    console.log("get all list");
    this.parentMeetingService.getParentMeetingList(this.page).subscribe(data=>{
        this.meetings = data['content'] ; console.log(this.meetings)
         //items per page mate che..
         this.totalPages = data['totalPages'] 
         console.log("total Pages =>"+this.totalPages)
         if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
         else{this.statusNext=false}
         if(this.page==0) {this.statusPre=true; }
         else{this.statusPre=false;}
         this.pages= new Array(data['totalPages'])
    },error=>{
      this.handleError(error);
    })
  }

  //delete meeting
  deleteMeeting(meetingId:number)
  {
    console.log("delete");
    this.dialog.open(DialogBoxComponent).afterClosed().subscribe(data=>{
      console.log(data.delete)
    if(data.delete)
    { 
        console.log("delete");
        this.getMeetingsService.deleteMeeting(meetingId)
        .subscribe(data=>{
          console.log(data);
          this.router.navigate(['/teacher/home']);
          this.snakBar.open("successfully Deleted..","Cancle", {       
            duration : 3000,
            horizontalPosition:'center',
            verticalPosition:"bottom"
          });
          //navigate to list
        },error=>{
          this.handleError(error);
        });
      }
    },error=>{
      this.handleError(error);
    })
  }

  changediv(e)
  {
    console.log(e.target.value);
    this.selecteddiv = e.target["selectedIndex"]; console.log(this.selecteddiv);

  }
  //get selected standard
  changestd(e)
  {
    console.log(e.target.value); 
    this.selectedstd = e.target.value; console.log(this.selectedstd);
    console.log(this.selectedstd[0]);
  }

  getMeetingByStdAndDiv()
   {
     console.log("hi students by std and div");
      //jo std select na hoy to
     if(this.selectedstd && this.selecteddiv)
     {
        this.parentMeetingService.getMeetingListByStandardAndDivision(this.selectedstd,this.selecteddiv,this.page).subscribe(data=>{
          this.meetings = data['content'] ; console.log(this.meetings);
            //items per page mate che..
            this.totalPages = data['totalPages'] 
            console.log("total Pages =>"+this.totalPages)
            if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
            else{this.statusNext=false}
            if(this.page==0) {this.statusPre=true; }
            else{this.statusPre=false;}
            this.pages= new Array(data['totalPages'])
            this.router.navigate(['/teacher/parents-meeting/all']);
        },error=>{
          this.handleError(error);
        })
     }
     else if(this.selectedstd)
     {
        this.parentMeetingService.getMeetingListByStandard(this.selectedstd,this.page).subscribe(data=>{
          this.meetings = data['content'] ; console.log(this.meetings);
            //items per page mate che..
            this.totalPages = data['totalPages'] 
            console.log("total Pages =>"+this.totalPages)
            if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
            else{this.statusNext=false}
            if(this.page==0) {this.statusPre=true; }
            else{this.statusPre=false;}
            this.pages= new Array(data['totalPages'])
            this.router.navigate(['/teacher/parents-meeting/all']);
        },error=>{
          this.handleError(error);
        })
     }
     else
     {
       console.log("nothing");
       this.router.navigate(['/teacher/parents-meeting/all']);
     }
   }

  //update meeting to navigate
  updateMeeting(meetingId:number)
  {
    console.log("update");
    this.router.navigate(['teacher/parents-meeting/all/update',meetingId]);
  }

  //view meeting to navigate
  viewMeeting(meetingId:number)
  {
    console.log("view");
    this.router.navigate(['teacher/parents-meeting/all/view',meetingId]);
  }

}

