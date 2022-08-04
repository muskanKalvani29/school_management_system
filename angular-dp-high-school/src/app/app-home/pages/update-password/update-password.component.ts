import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from 'src/app/app-home/services/authentication.service';
import {CoreService} from 'src/app/app-home/services/core.service';
import {EmailService} from 'src/app/app-home/services/email.service'; 
import {Router} from '@angular/router';
import {User} from 'src/app/core/model/User';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  show1: boolean=false;
  show2: boolean=false;
  userobj:User;
  user_Id:number;
  new_password:String;
  confirm_Password:String;
  showError:Boolean = false
  showSuccess:Boolean = false
  getUserEmail:String
  userData:User
  constructor(private _auth:AuthenticationService,
    private _core:CoreService,
    private emailservice:EmailService,
    private router:Router) { }

  ngOnInit(): void 
  {
    this.getUserEmail = this.emailservice.getEmail(); console.log("Email => "+this.getUserEmail);
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
   toggleShow2()
   {
     console.log(this.show2);
    this.show2 = !this.show2;
   }    

   doUpdatePassword(doUpdatePassword:any)
   {
     console.log("do update password");
     if(this._auth.isUserLoggedIn())
     {
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
         this.new_password = doUpdatePassword.password;
         this.confirm_Password = doUpdatePassword.password1;
         console.log(this.new_password); console.log(this.confirm_Password);
         if(this.new_password == this.confirm_Password)
         {
           this.emailservice.UpdateUserPassword(this.confirm_Password,this.user_Id).subscribe(data=>{
             console.log(data);
             this.showError = false;
             this.showSuccess = true;
             //he/she has to login again
             this._auth.logOut()
             this.router.navigate(['/sms/home/login']);
           },error=>{
            this.handleError(error);
          })
         }
         else
         {
           this.showError = true;
         }
       },error=>{
        this.handleError(error);
      })
     }
     else
     {
       this.emailservice.getUserByEmail(this.getUserEmail).subscribe(data=>{
         this.userData = data; console.log(data);
         this.user_Id = this.userData.userId;
         this.new_password = doUpdatePassword.password;
         this.confirm_Password = doUpdatePassword.password1;
         console.log(this.new_password); console.log(this.confirm_Password);
         if(this.new_password == this.confirm_Password)
         {
           this.emailservice.UpdateUserPassword(this.confirm_Password,this.user_Id).subscribe(data=>{
             console.log(data);
             this.showError = false;
             this.showSuccess = true;
             //he/she has to login again
             this._auth.logOut()
             this.router.navigate(['/sms/home/login']);
           },error=>{
            this.handleError(error);
          })
         }
         else
         {
           this.showError = true;
         }
       },error=>{
        this.handleError(error);
      })
     }
     
   }
}
