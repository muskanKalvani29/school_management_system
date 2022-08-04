import { Component, OnInit } from '@angular/core';
import {StandardDivisionService} from 'src/app/features/admin/services/standard-division.service';
import {Standard} from 'src/app/core/model/Standard';
import {Teacher} from 'src/app/core/model/Teacher';
import {TeacherOwnServiceService} from 'src/app/features/teacher/services/teacher-own-service.service'
import {AuthenticationService} from 'src/app/app-home/services/authentication.service';
import {CoreService} from 'src/app/app-home/services/core.service';
import {Router,ActivatedRoute} from '@angular/router';
import { User } from 'src/app/core/model/User';
import {MatSnackBar} from '@angular/material/snack-bar'

@Component({
  selector: 'app-update-standard',
  templateUrl: './update-standard.component.html',
  styleUrls: ['./update-standard.component.css']
})
export class UpdateStandardComponent implements OnInit {
  userId:number
  userobj:User;
  UserName:String;
  teacher:Teacher;
  teacher1:Teacher;
  teacher_Id:number;
  teacherId: number;
  imagePath:String;
  selectedStandards:Array<String>=new Array();
  standards:Standard[];
  // genderdata: any[] = ['male','female'];
  
  constructor(private authService:AuthenticationService,
    private getTecharService:TeacherOwnServiceService,
    private getStdDivService:StandardDivisionService,
    private coreService:CoreService,
    private router : Router,
    private snakBar:MatSnackBar) { }

  ngOnInit(): void {
    this.getName();
    this.getStandardList();
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
  getStandardList()
  {
    console.log("Stanadard list");
    this.getStdDivService.getStandardList()
    .subscribe(data=>{
      console.log(data);
      this.standards=data;
    },error=>{
      this.handleError(error);
    })
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
        console.log(this.userId);
    },error=>{
      this.handleError(error);
    })
  }

  //get selected standard
  changestd(e)
  {
    // console.log(e.target.selectedIndex); 
    console.log( e.target.options[e.target.options.selectedIndex].text);
  }

  addTeacher(addTeacher:any)
  {
    this.selectedStandards=addTeacher.standard;
    console.log(this.selectedStandards);
    
      this.getTecharService.getTeacherByUserName(this.UserName).subscribe(data=>
        {
          this.teacher1 = data;
          this.teacher_Id = this.teacher1.teacherId;
          console.log(this.teacher_Id);
          //call delete std
          this.getTecharService.deleteStandard(this.teacher_Id).subscribe(data=>{
             //call update std teacher service
          this.getTecharService.addStandards(this.selectedStandards,this.teacher_Id).subscribe(data=>{
            console.log(data);
           
            this.snakBar.open("successfully Updated..","Cancle", {       
              duration : 3000,
              horizontalPosition:'center',
              verticalPosition:"bottom"
            });
            // this.router.navigate(['/teacher/home']);
          },error=>{
          this.handleError(error);
        })
          },error=>{
          this.handleError(error);
        })
         
        },error=>{
          this.handleError(error);
        })
      }

}
