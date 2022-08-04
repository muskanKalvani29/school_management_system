import { Time } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar';
import {AuthenticationService} from 'src/app/app-home/services/authentication.service';
import {CoreService} from 'src/app/app-home/services/core.service';
import {EmailService} from 'src/app/app-home/services/email.service'; 
import {Router} from '@angular/router';
import {User} from 'src/app/core/model/User';

@Component({
  selector: 'app-password-otp',
  templateUrl: './password-otp.component.html',
  styleUrls: ['./password-otp.component.css']
})
export class PasswordOtpComponent implements OnInit {

  checkOtp:Boolean=false
  isValid:Boolean = false
  email:String
  userobj:User
  user_Id:number
  timerOn = true;
  timeleft:number = 90
  cnt:number = 0;
  interval:any;
  showTimer:boolean = true;
  userData:User
  resendError:Boolean = false
  constructor(private _auth:AuthenticationService,
    private _core:CoreService,
    private emailservice:EmailService,
    private router:Router,private snakBar:MatSnackBar) { }

  ngOnInit(): void 
  {
    this.email =  this.emailservice.getEmail();
    console.log("email from forgot password=> "+this.email);
    console.log(this.timeleft)
    this.startTimer();
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
  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeleft > 0) {
        this.timeleft--;
      } else {
        this.pauseTimer();
      }
    },1000)
  }
  pauseTimer() {
    clearInterval(this.interval);
    // this.resendOTP();
    this.showTimer = false;
  }


  resendOTP()
  {
    clearInterval(this.interval);
    console.log("in resend otp");
    this.emailservice.SendOtp(this.email).subscribe(data=>{
      console.log(data);
      this.resendError=true;
      this.showTimer = true;
      this.timeleft=90;
      this.startTimer();
      this.snakBar.open("New Otp is sent to your Email..","Cancle", {       
        duration : 3000,
        horizontalPosition:'center',
        verticalPosition:"bottom"
      });
      // this.timeleft = 90;
      // this.startTimer();
    },error=>{
      this.handleError(error);
    })
  }

  verifySentOtp(verifySentOtp:any)
  {
    console.log("verify otp"); console.log(verifySentOtp.otp)
        //get user
        this.emailservice.getUserByEmail(this.email).subscribe(data=>{
          this.userData = data;
          this.user_Id = this.userData.userId; console.log(this.user_Id);
          //verify service
          this.emailservice.VerifyOtp(verifySentOtp.otp,this.user_Id).subscribe(data=>{
            this.isValid = data;
            if(this.isValid)
            {
               //set email
              this.emailservice.setEmail(this.email);
              this.router.navigate(['/sms/home/reset-password/newPassword']);
              clearInterval(this.interval);
            }
            else{
              this.snakBar.open("Enter Valid Otp..","Cancle", {       
                duration : 3000,
                horizontalPosition:'center',
                verticalPosition:"bottom"
              });
            }
          },error=>{
            this.handleError(error);
          })
        },error=>{
          this.handleError(error);
        })
  }
  
}
