import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from 'src/app/app-home/services/authentication.service';
import {CoreService} from 'src/app/app-home/services/core.service';
import {EmailService} from 'src/app/app-home/services/email.service'; 
import {Router} from '@angular/router';
import {User} from 'src/app/core/model/User';
@Component({
  selector: 'app-authenticate-password',
  templateUrl: './authenticate-password.component.html',
  styleUrls: ['./authenticate-password.component.css']
})
export class AuthenticatePasswordComponent implements OnInit {

  show1: boolean=false;
  checkoldpwd:String
  userobj:User;
  user_Id:number;
  checkpass:Boolean 
  showerror:Boolean = false
  constructor(private _auth:AuthenticationService,
    private _core:CoreService,
    private emailservice:EmailService,
    private router:Router) { }

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
  toggleShow1()
   {
     console.log(this.show1);
    this.show1 = !this.show1;
   } 

   checkOldPassword(checkOldPassword:any)
   {
     console.log("check");
     this.checkoldpwd = checkOldPassword.password;
     let user:string[];
     let userId:number;
     let username:String;
     user = localStorage.getItem(this._auth.LOCAL_STORAGE_ATTRIBUTE_USERNAME).split(" ");
     username = atob(user[0]);
     this._core.getUserByUserName(username).subscribe(data=>
      {
        this.userobj = data;
        userId = this.userobj.userId;
        this.user_Id = userId;
        console.log(this.user_Id);
        //call email password check service
         this.emailservice.ResetPassword(this.checkoldpwd,this.user_Id).subscribe(data=>{
           console.log(data);
           this.checkpass = data;
           console.log("boolean => "+this.checkpass);
           if(this.checkpass)
           {
              this.router.navigate(['/sms/home/reset-password/newPassword']);
           }
           else{
              this.showerror = true;
           }
         },error=>{
          this.handleError(error);
        })
      },error=>{
        this.handleError(error);
      })
     
  }

}
