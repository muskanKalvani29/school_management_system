import { Component, OnInit } from '@angular/core';
import {EmailService} from 'src/app/app-home/services/email.service'; 
import {Router} from '@angular/router';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar'
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  getEmail:String
  showEmailAlert:Boolean=false
  constructor(private router:Router,
              private emailService:EmailService,private snakBar:MatSnackBar,) { }

  ngOnInit(): void {
  }
  
  goToOtp(goToOtp:any)
  {
    // this.router.navigate(['otp']);
    console.log("email=>"+goToOtp.email)
    this.getEmail = goToOtp.email;
    this.emailService.setEmail(this.getEmail);
    console.log(this.getEmail)
    this.emailService.SendOtp(this.getEmail).subscribe(data=>{
      this.showEmailAlert = true;
      console.log(data);
      this.router.navigate(['/sms/home/login/forgot-password/otp']);
    },error=>{
      this.snakBar.open("Enter Registerd Email Id..","Cancle", {
                    
        duration : 3000,
        // panelClass:['bg-dark'],
        horizontalPosition:'center',
        verticalPosition:"bottom"
  
      });
    })
  }

  // handleError(error)
  // {
  // console.log("status code..");  
  // console.log(error);
  // if(error==404)
  // {
  //   console.log("hi")
  //   this.router.navigate(['/page-not-found']);
  // }
  // else if(error==500)
  // {
  //   console.log("hi")
  //   this.router.navigate(['/internal-server-error']);
  // }
  // else
  // {
  //   console.log("hi")
  //   this.router.navigate(['/error-page']);
  // }
}

