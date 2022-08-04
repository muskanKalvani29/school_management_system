import { Component, OnInit } from '@angular/core';
import {Attendance} from 'src/app/core/model/Attendance';
import {AttendanceService} from 'src/app/features/teacher/pages/attendance/services/attendance.service';
import {Router,ActivatedRoute} from '@angular/router';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar'
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/features/DialogBox/dialog-box/dialog-box.component';
@Component({
  selector: 'app-view-attendance',
  templateUrl: './view-attendance.component.html',
  styleUrls: ['./view-attendance.component.css']
})
export class ViewAttendanceComponent implements OnInit {

  grNo:number;
  attendances:Array<Attendance> = new Array();
  page:number=0
  pages:Array<Number>
  totalPages:Number;
  statusNext:boolean=true
  statusPre:boolean = true
  monthData: any[] = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  yearData: any[] = ['2018','2019','2020','2021']
  selectedMonth:any;
  selectedYear:any;
  showPagination:boolean=true;
  constructor(private viewAttendanceService:AttendanceService,
    private router : Router,
    private route : ActivatedRoute,private snakBar:MatSnackBar,private dialog:MatDialog)
     { }

  ngOnInit(): void
  {
    this.attendances = new Array();
    this.grNo =  this.route.snapshot.params['grNo'];
    // this.getAttendDance();
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
    this.selectedMonth = e.target.value; console.log(this.selectedMonth);
  }
  //get selected standard
  changeYear(e)
  {
    console.log(e.target.value); 
    this.selectedYear = e.target.value; console.log(this.selectedYear);
  }
  getAttendDance()
  {
    this.viewAttendanceService.getAttendancesByStudentId(this.grNo,this.page).subscribe(data=>{
      // console.log(data); this.attendances = data; console.log(this.attendances);
      this.attendances = data['content'] ; console.log(this.attendances);
            //items per page mate che..
            this.totalPages = data['totalPages'] 
            console.log("total Pages =>"+this.totalPages)
            if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
            else{this.statusNext=false}
            if(this.page==0) {this.statusPre=true; }
            else{this.statusPre=false;}
            this.pages= new Array(data['totalPages'])
      this.viewAttendanceService.setGrNOForAttendance(this.grNo);
    },error=>{
      this.handleError(error);
    })
  }
  setPage(i,event:any)
  {
    this.page=i;
    console.log("page"+this.page)
    if(this.page==0) {this.statusPre=true; }
    else{this.statusPre=false;}
    if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
    else{this.statusNext=false}
    this.getAttenDanceByMonthAndYear();
    // this.getMeetingByStdAndDiv();
  }
  pre()
  {
    console.log("page"+this.page)
    if(this.page==0) {this.statusPre=true; }
    else{this.statusPre=false;this.page=this.page.valueOf()-1;
      // this.getMeetingList();
      this.getAttenDanceByMonthAndYear();
    }
    if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
    else{this.statusNext=false}
  }
  next()
  {
    if(this.page==0) {this.statusPre=true; }
    else{this.statusPre=false;}
    console.log("page"+this.page)
     if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
    else{this.statusNext=false; this.page=this.page.valueOf()+1;
      // this.getMeetingList();
      this.getAttenDanceByMonthAndYear();
    }
  }

  goToStudentList()
  {
    console.log("go to studentlist");
    this.router.navigate(['/teacher/attendance/all-students']);
  }
  //goto Update
  updateAttendance(attendanceId:number)
  {
    console.log("go to update attendance");
    this.router.navigate(['/teacher/attendance/all-students/view-attendance/update-attendance',attendanceId]);
  }
  //goto Delete
  deleteAttendance(attendanceId:number)
  { 
    console.log("delete Attendance");
    this.dialog.open(DialogBoxComponent).afterClosed().subscribe(data=>{
      console.log(data.delete)
      if(data.delete)
      { 
        this.viewAttendanceService.deleteAttendance(attendanceId).subscribe(data=>{
          console.log(data);
          this.snakBar.open("successfully Deleted..","Cancle", {       
            duration : 3000,
            horizontalPosition:'center',
            verticalPosition:"bottom"
          });
          this.router.navigate(['/teacher/attendance/all-students']);
        },error=>{
          this.handleError(error);
        })   
      }
  },error=>{
    this.handleError(error);
  })
  }

  getAttenDanceByMonthAndYear()
  {
    if(this.selectedMonth && this.selectedYear)
    {
      this.showPagination=false;
      console.log("both");
      this.viewAttendanceService.getAttendanceByMonthAndYear(this.grNo,this.selectedMonth,this.selectedYear).subscribe(data=>{
        console.log(data); this.attendances=data; console.log(this.attendances);
        this.viewAttendanceService.setGrNOForAttendance(this.grNo);
      },error=>{
        this.handleError(error);
      })
    }
    else if(this.selectedMonth)
    {
      console.log("month");
      this.viewAttendanceService.getAttendanceByMonth(this.grNo,this.selectedMonth,this.page).subscribe(data=>{
        this.attendances = data['content'] ; console.log(this.attendances);
        //items per page mate che..
        this.totalPages = data['totalPages'] 
        console.log("total Pages =>"+this.totalPages)
        if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
        else{this.statusNext=false}
        if(this.page==0) {this.statusPre=true; }
        else{this.statusPre=false;}
        this.pages= new Array(data['totalPages'])
        this.viewAttendanceService.setGrNOForAttendance(this.grNo);
      },error=>{
        this.handleError(error);
      })
    }
    else if(this.selectedYear)
    {
      console.log("year");
      this.viewAttendanceService.getAttendanceByYear(this.grNo,this.selectedYear,this.page).subscribe(data=>{
        console.log(data);
        this.attendances = data['content'] ; console.log(this.attendances);
        //items per page mate che..
        this.totalPages = data['totalPages'] 
        console.log("total Pages =>"+this.totalPages)
        if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
        else{this.statusNext=false}
        if(this.page==0) {this.statusPre=true; }
        else{this.statusPre=false;}
        this.pages= new Array(data['totalPages'])
        this.viewAttendanceService.setGrNOForAttendance(this.grNo);
      },error=>{
        this.handleError(error);
      })
    }
    else
    {
      console.log("nothing");
    }
  }
}
