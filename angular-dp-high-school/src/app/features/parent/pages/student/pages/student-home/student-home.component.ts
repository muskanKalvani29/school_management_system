import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {Student} from 'src/app/core/model/Student';
import {StudentServiceService} from 'src/app/features/admin/pages/student/service/student-service.service';
import {AuthenticationService} from 'src/app/app-home/services/authentication.service';
import {CoreService} from 'src/app/app-home/services/core.service';
import {User} from 'src/app/core/model/User';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit {

  userId:number
  userobj:User;
  UserName:String;
  studentId: number;
  student:Student;

  constructor(private router:Router,
    private route : ActivatedRoute,
    private _studentService:StudentServiceService,
    private _auth:AuthenticationService,
     private _core:CoreService,
             
    ) { }

   

  ngOnInit(): void {

    let user:string[];
    let username:String;

    user = localStorage.getItem(this._auth.LOCAL_STORAGE_ATTRIBUTE_USERNAME).split(" ");
    username = atob(user[0]);
    //get user
    this._core.getUserByUserName(username).subscribe(data=>
      {
        this.userobj = data;
        this.UserName = username;
        this.userId = this.userobj.userId;
        console.log(this.UserName);


        this.student = new Student();
        this._studentService.getStudentByParentId(this.userId)
        .subscribe(data=>{
        console.log(data);
        this.student = data;
        console.log(this.student);
      },error=>{
        this.handleError(error);
      })
     },error=>{
      this.handleError(error);
    }) 
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
}








    

 



