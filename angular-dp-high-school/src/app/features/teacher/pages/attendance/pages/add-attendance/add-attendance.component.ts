import { Component, OnInit } from '@angular/core';
import {Attendance} from 'src/app/core/model/Attendance';
import {AttendanceService} from 'src/app/features/teacher/pages/attendance/services/attendance.service';
import {Router,ActivatedRoute} from '@angular/router';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar'
import { Student } from 'src/app/core/model/Student';
@Component({
  selector: 'app-add-attendance',
  templateUrl: './add-attendance.component.html',
  styleUrls: ['./add-attendance.component.css']
})
export class AddAttendanceComponent implements OnInit {

  attendance:Attendance;
  student:Student;
  getGrNo:number;
  monthData: any[] = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  yearData: any[] = ['2018','2019','2020','2021']
  constructor( private router : Router,private route:ActivatedRoute, private snakBar:MatSnackBar,
          private AddAttendanceService:AttendanceService) { }

  ngOnInit(): void {
    this.getGrNo = this.route.snapshot.params['grNo'];
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
  addAttendance(addAttendance:any)
  {
    console.log(addAttendance.month);
    this.attendance = new Attendance();
    this.attendance.student = new Student();
    this.attendance.student.grNo = this.getGrNo;
    this.attendance.month = addAttendance.month;
    this.attendance.year = addAttendance.year;
    this.attendance.presentDays = addAttendance.presentDays;
    this.attendance.absentDays = addAttendance.absentDays;
    this.attendance.totalDays = addAttendance.totalDays;

    this.AddAttendanceService.addAttendance(this.attendance).subscribe(data=>{
      console.log(data);
      this.snakBar.open("successfully Added..","Cancle", {       
        duration : 3000,
        horizontalPosition:'center',
        verticalPosition:"bottom"
      });
      this.router.navigate(['/teacher/attendance/all-students']);
    },error=>{
      this.handleError(error);
    })
  }
}
