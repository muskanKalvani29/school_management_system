import { Component, OnInit } from '@angular/core';
import {Meeting} from 'src/app/core/model/Meeting';
import {TeacherMeetingServiceService} from 'src/app/features/admin/pages/teacher-meeting/service/teacher-meeting-service.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/features/DialogBox/dialog-box/dialog-box.component';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar'
@Component({
  selector: 'app-all-meetings',
  templateUrl: './all-meetings.component.html',
  styleUrls: ['./all-meetings.component.css']
})
export class AllMeetingsComponent implements OnInit {

  meetings : Array<Meeting> = new Array()
  nameSearch:String=""
  page:number=0
  pages:Array<Number>
  totalPages:Number;
  statusNext:boolean=true
  statusPre:boolean = true
  constructor(private getMeetingsService:TeacherMeetingServiceService,
              private router : Router,private dialog:MatDialog,private snakBar:MatSnackBar) { }

  //load list data
  ngOnInit(): void 
  {
    console.log("oninit");
    console.log("page"+this.page)
    this.getMeetingList();
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
  setPage(i,event:any)
  {
    this.page=i;
    console.log("page"+this.page)
    if(this.page==0) {this.statusPre=true; }
    else{this.statusPre=false;}
    if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
    else{this.statusNext=false}
    this.getMeetingList();
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
    this.getMeetingsService.getMeetingList(this.page).subscribe(data=>{
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
  deleteEvent(meetingId:number)
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
          this.router.navigate(['/admint/dashboard']);
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

  //update meeting to navigate
  updateMeeting(meetingId:number)
  {
    console.log("update");
    this.router.navigate(['admin/teachers-meeting/all-meetings/update-meeting',meetingId]);
  }

  //view meeting to navigate
  viewMeeting(meetingId:number)
  {
    console.log("view");
    this.router.navigate(['admin/teachers-meeting/all-meetings/view-meeting',meetingId]);
  }

}
