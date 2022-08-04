import { Component, OnInit } from '@angular/core';
import {Attendance} from 'src/app/core/model/Attendance';
import {AttendanceService} from 'src/app/features/teacher/pages/attendance/services/attendance.service';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar'
import {Router,ActivatedRoute} from '@angular/router';
import { Student } from 'src/app/core/model/Student';
@Component({
  selector: 'app-update-attendance',
  templateUrl: './update-attendance.component.html',
  styleUrls: ['./update-attendance.component.css']
})
export class UpdateAttendanceComponent implements OnInit {

  monthData: any[] = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  yearData: any[] = ['2018','2019','2020','2021']
  attendance:Attendance;
  attendanceId:number;
  grNo:number;
  constructor(private router : Router,
    private route : ActivatedRoute,
    private snakBar:MatSnackBar, private updateAttendance: AttendanceService) { }

  ngOnInit(): void
  {
    this.grNo = this.updateAttendance.getGrNoForAttendance(); console.log(this.grNo);
    this.attendance = new Attendance();
    this.attendanceId = this.route.snapshot.params['attendanceId'];
    this.updateAttendance.getAttendance(this.attendanceId).subscribe(data=>{
      console.log(data); this.attendance = data; console.log(this.attendance);
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
    //on submit
    onSubmit()
    {
      console.log("form update");
      this.updateAttendanceMethod();
    }
    updateAttendanceMethod()
    {
      this.attendance.student = new Student();
      
      this.attendance.student.grNo = this.grNo;
      this.updateAttendance.updateAttendance(this.attendanceId,this.attendance).subscribe(data=>{
        console.log(data); 
        this.snakBar.open("successfully Updated..","Cancle", {       
          duration : 3000,
          horizontalPosition:'center',
          verticalPosition:"bottom"
        });
        console.log(this.grNo);
        this.router.navigate(['/teacher/attendance/all-students/view-attendance',this.grNo]);
      },error=>{
        this.handleError(error);
      })
    }
}
