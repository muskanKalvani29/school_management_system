import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/app-home/services/authentication.service';
import { CoreService } from 'src/app/app-home/services/core.service';
import { Teacher } from 'src/app/core/model/Teacher';
import { User } from 'src/app/core/model/User';
import { TeacherOwnServiceService } from 'src/app/features/teacher/services/teacher-own-service.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  userId:number
  userobj:User;
  UserName:String;
  teacher:Teacher;
  imagePath:String;

  constructor(private authService:AuthenticationService,
    private getTecharService:TeacherOwnServiceService,
    private coreService:CoreService,private router : Router) { }

  ngOnInit(): void {
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
          if(this.teacher.image=="" || this.teacher.image==null)
          {
            this.imagePath="../../../../assets/img/figure/user.jpg";
          }
          else{
            this.imagePath=this.teacher.image;
            console.log("image=>"+this.imagePath);
          }
      },error=>{
        this.handleError(error);
      })    
    },error=>{
      this.handleError(error);
    })
  }
}
  
