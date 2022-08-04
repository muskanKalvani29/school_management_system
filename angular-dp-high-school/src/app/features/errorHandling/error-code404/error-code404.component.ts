import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/app-home/services/authentication.service';
import { CoreService } from 'src/app/app-home/services/core.service';
import { User } from 'src/app/core/model/User';
import {Router} from '@angular/router';

@Component({
  selector: 'app-error-code404',
  templateUrl: './error-code404.component.html',
  styleUrls: ['./error-code404.component.css']
})
export class ErrorCode404Component implements OnInit {

  userobj:User;
  UserType:String
  constructor(private authService:AuthenticationService,private coreService:CoreService,
    private router:Router) { }

  ngOnInit(): void 
  {
    // this.getUser();
  }

  getUser()
  {
    let user:string[];
      let username:String;
  
      user = localStorage.getItem(this.authService.LOCAL_STORAGE_ATTRIBUTE_USERNAME).split(" ");
      username = atob(user[0]);
      //get user
      this.coreService.getUserByUserName(username).subscribe(data=>
        {
          this.userobj = data;
          this.UserType = this.userobj.userType.userType;
          if(this.UserType=="Teacher")
          {
            this.router.navigate(['/teacher/home']);
          }
          else if(this.UserType=="Parent")
          {
            this.router.navigate(['/parent/home']);
          }
          else if(this.UserType=="Admin"){
            this.router.navigate(['/admin/dashboard']);
          }
          else{
            this.router.navigate(['/sms/home']);
          }
        })
  }
}
