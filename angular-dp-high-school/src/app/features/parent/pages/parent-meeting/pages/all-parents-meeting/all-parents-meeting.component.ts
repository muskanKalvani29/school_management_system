import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from 'src/app/app-home/services/authentication.service';
import {CoreService} from 'src/app/app-home/services/core.service';
import {User} from 'src/app/core/model/User';
import {Meeting} from 'src/app/core/model/Meeting';
import {ParentsMeetingServiceService} from 'src/app/features/teacher/pages/parents-meeting/services/parents-meeting-service.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-all-parents-meeting',
  templateUrl: './all-parents-meeting.component.html',
  styleUrls: ['./all-parents-meeting.component.css']
})
export class AllParentsMeetingComponent implements OnInit {

  meetings:Observable<Meeting[]>;
  userobj:User;
  UserName:String
  constructor(private _auth:AuthenticationService,
              private _core:CoreService,
              private _parentMeetingService:ParentsMeetingServiceService,
              private router : Router) { }

  ngOnInit(): void 
  {
    this.getName();
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
  
  getName()
  {
      let user:string[];
      let username:String;
      let userId:number;
      user = localStorage.getItem(this._auth.LOCAL_STORAGE_ATTRIBUTE_USERNAME).split(" ");
      username = atob(user[0]);
      //get user
      this._core.getUserByUserName(username).subscribe(data=>
        {
          this.userobj = data;
          this.UserName = username;
          userId = this.userobj.userId;
          console.log(this.UserName);
          this.meetings=this._parentMeetingService.getAllParentsMeeting(userId,0); 
        },error=>{
          this.handleError(error);
        })
    }

    viewMeeting(meeting_id:number)
    {
      console.log("view");
      this.router.navigate(['/parent/meeting/all-parents-meeting/view-parent-meeting',meeting_id]);
    }
}
