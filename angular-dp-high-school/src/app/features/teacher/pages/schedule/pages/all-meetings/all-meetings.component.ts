import { Component, OnInit } from '@angular/core';
import {Meeting} from 'src/app/core/model/Meeting';
import {TeacherMeetingServiceService} from 'src/app/features/admin/pages/teacher-meeting/service/teacher-meeting-service.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';


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
              private router : Router) { }

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


  //view meeting to navigate
  viewMeeting(meetingId:number)
  {
    console.log("view");
    this.router.navigate(['teacher/schedule/all-meetings/view-meeting',meetingId]);
  }

}

