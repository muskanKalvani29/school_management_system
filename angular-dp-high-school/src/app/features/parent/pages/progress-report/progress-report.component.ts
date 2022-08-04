import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from 'src/app/app-home/services/authentication.service';
import {CoreService} from 'src/app/app-home/services/core.service';
import { Activity } from 'src/app/core/model/Activity';
import { Attendance } from 'src/app/core/model/Attendance';
import {User} from 'src/app/core/model/User';
import {StudentServiceService} from 'src/app/features/admin/pages/student/service/student-service.service';


@Component({
  selector: 'app-progress-report',
  templateUrl: './progress-report.component.html',
  styleUrls: ['./progress-report.component.css']
})


export class ProgressReportComponent implements OnInit {

  monthData: any[] = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  yearData: any[] = ['2018','2019','2020','2021'];

  userobj:User;
  UserName:String;
  attendance:Attendance = new Attendance();
  activity_achievements : Array<Activity> = new Array()
  month:String;
  year:String;
  count_length:number;
  Message:String;
  Message2:String;
  userId:number;
  selectedMonth: any;
  selectedMonthNumber:any;
  selectedYear: any;
  isShow:boolean = false;
  isShow1:boolean = false;
  Message1: string;

  constructor(private _auth:AuthenticationService,
    private _core:CoreService,
    private studentService:StudentServiceService,private router:Router
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
  changeMonth(e)
  {
    console.log(e.target.value);
    this.selectedMonth = e.target.value;
  }
  changeYear(e)
  {
    console.log(e.target.value);
    this.selectedYear = e.target.value;
  }
  getProgressReport()
    {
      this.attendance = new Attendance()
        this.studentService.getAttendanceByMonthAndYear(this.userId,this.selectedMonth,this.selectedYear).subscribe(data=>{
          console.log(data)
            this.attendance=data[0];
            console.log(this.attendance.presentDays);
            this.isShow=true;
            console.log(this.attendance)
          },error=>{
            this.handleError(error);
          });

          if(this.selectedMonth=="January"){this.selectedMonthNumber=1}
          else if(this.selectedMonth=="February"){this.selectedMonthNumber=2}
          else if(this.selectedMonth=="March"){this.selectedMonthNumber=3}
          else if(this.selectedMonth=="April"){this.selectedMonthNumber=4}
          else if(this.selectedMonth=="May"){this.selectedMonthNumber=5}
          else if(this.selectedMonth=="June"){this.selectedMonthNumber=6}
          else if(this.selectedMonth=="July"){this.selectedMonthNumber=7}
          else if(this.selectedMonth=="August"){this.selectedMonthNumber=8}
          else if(this.selectedMonth=="September"){this.selectedMonthNumber=9}
          else if(this.selectedMonth=="October"){this.selectedMonthNumber=10}
          else if(this.selectedMonth=="November"){this.selectedMonthNumber=11}
          else{this.selectedMonthNumber=12}
          this.studentService.getActivityByMonthAndYear(this.userId,this.selectedMonthNumber,this.selectedYear).subscribe(data=>{
            this.activity_achievements=data;
            this.isShow1=true;
            this.count_length=data.length;
            console.log(this.activity_achievements)
            console.log(this.count_length)
      if(this.count_length>2){
          this.Message1 = "Hard Working and Sincere"
          this.Message="Best in Extra-Curricular Activity"
          this.Message2="Excellent and Keep going !! "
      }
      else if(this.count_length==0)
      {
        this.Message1 = "Hard Working and Sincere"
          this.Message="Need to participative in Extra-Curricular Activity"
          this.Message2="Keep Oppertunity from next time and Be Participative!!"
      }
      else 
      {
        this.Message1 = "Hard Working and Sincere"
        this.Message="Good in Extra-Curricular Activity"
        this.Message2="Grab this kind of oppertunity and doing good work !!"
      }
          }
          ,error=>{
            // this.handleError(error);
            this.count_length=0;
            this.isShow1 = false;
            console.log(this.count_length)
      if(this.count_length>2){
          this.Message1 = "Hard Working and Sincere"
          this.Message="Best in Extra-Curricular Activity"
          this.Message2="Excellent and Keep going !! "
      }
      else if(this.count_length==0)
      {
        this.Message1 = "Hard Working and Sincere"
          this.Message="Need to participative in Extra-Curricular Activity"
          this.Message2="Keep Oppertunity from next time and Be Participative!!"
      }
      else 
      {
        this.Message1 = "Hard Working and Sincere"
        this.Message="Good in Extra-Curricular Activity"
        this.Message2="Grab this kind of oppertunity and doing good work !!"
      }
          }
          );
     
      
    }
  
    
}
  
