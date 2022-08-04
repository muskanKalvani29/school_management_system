import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from 'src/app/app-home/services/authentication.service';
import {CoreService} from 'src/app/app-home/services/core.service';
import {TeacherOwnServiceService} from 'src/app/features/teacher/services/teacher-own-service.service';
import {User} from 'src/app/core/model/User';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  userobj:User;
  userTypeForRoute:String;
  getUSer:string[];
  getUserName:String;
  show1: boolean=false;
  constructor(private router:Router,
              private _auth:AuthenticationService,
              private _core:CoreService,
              private snakBar:MatSnackBar,
              private teacherOwnS:TeacherOwnServiceService) { }

  
  username:String;
  password:String;
  errorMessage:String = "Invalid Username or Password";
  SuccessfulMessage:String = "Login Successfully";
  inValidLogin:boolean = false;
  successLogin:boolean = false;
  

  ngOnInit(): void 
  {
   
    if(this._auth.isUserLoggedIn())
    {
      this.getUSer = localStorage.getItem(this._auth.LOCAL_STORAGE_ATTRIBUTE_USERNAME).split(" ");
      this.getUserName = atob(this.getUSer[0]);
      this._core.getUserByUserName(this.getUserName).subscribe(data=>{
        console.log(data);this.userobj=data;
        this.userTypeForRoute = this.userobj.userType.userType;
        console.log("usertype => "+this.userTypeForRoute);
        if(this.userTypeForRoute=="Admin")
      {
        console.log(this.userTypeForRoute);
        this.router.navigate(['/admin/dashboard']);
      }
      else if(this.userTypeForRoute=="Teacher")
      {
        //get teacher by username
        
         this.teacherOwnS.getTeacherByUserName(this.getUserName).subscribe(data=>{
          console.log(this.userTypeForRoute);
          this.router.navigate(['/teacher/home']);  
        },error=>{
          console.log(this.userTypeForRoute);
          this.router.navigate(['/teacher-information']);  
        })
        
      }
      else if(this.userTypeForRoute=="Parent")
      {
        console.log(this.userTypeForRoute);
        this.router.navigate(['/parent/home']);
      }
      else
      {
        console.log(this.userTypeForRoute);
      }
      })    
    }
    else
    {
      this.router.navigate(['sms/home/login']);
    }

    this.loadScript("../../../../assets/JS/modernizr-3.6.0.min.js");
    this.loadScript("../../../../assets/JS/jquery-3.5.1.js");
    // this.loadScript("node_modules/bootstrap/dist/js/bootstrap.min.js");
    this.loadScript("../../../../assets/JS/jquery-3.5.1.js");
    this.loadScript("../../../../assets/JS/rsmenu-main.js");
    this.loadScript("../../../../assets/JS/isotope.pkgd.min.js");
    this.loadScript("../../../../assets/JS/wow.min.js");
    this.loadScript("../../../../assets/JS/jquery.counterup.min.js");
    this.loadScript("../../../../assets/JS/jquery.waypoints.min.js");
    this.loadScript("../../../../assets/JS/jquery.magnific-popup.min.js");
    this.loadScript("../../../../assets/JS/plugins.js");
    this.loadScript("../../../../assets/JS/contact.form.js");
    this.loadScript("../../../../assets/JS/main2.js");
  }

  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
  toggleShow1()
  {
    console.log(this.show1);
   this.show1 = !this.show1;
  }  
  loginAuth(value)
  {
    // console.log(value.username);
    // console.log(value.password);
    //get user 
    console.log("hi login method");
    this._auth.loginAuthentication(value.username,value.password).subscribe(
      (data)=>
      {
        this.inValidLogin = false;
        this.successLogin = true;
        // this.router.navigate(['dashboard'])
        //to check which user it is and redirect according to it..
        if(this.successLogin==true)
        {
          console.log("hi sucess login")
          let user:string[];
          let userId:number;
          let username:String;
          let userType:String;
    
          user = localStorage.getItem(this._auth.LOCAL_STORAGE_ATTRIBUTE_USERNAME).split(" ");
          username = atob(user[0]);
          this._core.getUserByUserName(username).subscribe(data=>
            {
              this.userobj = data;
              userId = this.userobj.userId;
              console.log(userId);
              userType = this.userobj.userType.userType;
              // this.userTypeForRoute = userType;
              console.log(userType);
                if(userType=="Parent")
                {
                  this.snakBar.open("successfully login","Cancle", {
                    
                    duration : 3000,
                    // panelClass:['bg-dark'],
                    horizontalPosition:'center',
                    verticalPosition:"bottom"
              
                  });
                    console.log(userType);
                    this.router.navigate(['parent/home']);
                }
                else if(userType=="Teacher")
                {

                  this.snakBar.open("successfully login","Cancle", {
                    
                    duration : 3000,
                    // panelClass:['bg-dark'],
                    horizontalPosition:'center',
                    verticalPosition:"bottom"
              
                  });
                  this.teacherOwnS.getTeacherByUserName(username).subscribe(data=>{
                    console.log(data);
                  console.log(this.userTypeForRoute);
                  this.router.navigate(['teacher/home']);  
                },error=>{
                  console.log(error);
                  console.log(this.userTypeForRoute);
                  this.router.navigate(['/teacher-information']);  
                })
                }
                else
                {
                  this.snakBar.open("successfully login","Cancle", {
                    
                    duration : 3000,
                    // panelClass:['bg-dark'],
                    horizontalPosition:'center',
                    verticalPosition:"bottom"
              
                  });
                  console.log(userType);
                  this.router.navigate(['admin/dashboard']);
                }
            })
        }
      },
      (error)=>
      {
        console.log(error);
        this.inValidLogin = true;
        this.successLogin = false;
      },
    );

    console.log(value);  
  }
}
