import { Component, OnInit } from '@angular/core';
import {Activity} from 'src/app/core/model/Activity';
import {ActivitiesAchievementsService} from 'src/app/features/teacher/pages/activities-achievements/services/activities-achievements.service';
import {Router,ActivatedRoute} from '@angular/router';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar'
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/features/DialogBox/dialog-box/dialog-box.component';

@Component({
  selector: 'app-view-activity-achievement',
  templateUrl: './view-activity-achievement.component.html',
  styleUrls: ['./view-activity-achievement.component.css']
})
export class ViewActivityAchievementComponent implements OnInit {

  grNo:number;
  actach:Array<Activity> = new Array();
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

  constructor(private viewActiAchiService:ActivitiesAchievementsService,
    private router : Router,
    private route : ActivatedRoute,private snakBar:MatSnackBar,private dialog:MatDialog) { }

  ngOnInit(): void 
  {
    this.actach = new Array();
    this.grNo =  this.route.snapshot.params['grNo'];
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
  //get selected year
  changeYear(e)
  {
    console.log(e.target.value); 
    this.selectedYear = e.target.value; console.log(this.selectedYear);
  }
  setPage(i,event:any)
  {
    this.page=i;
    console.log("page"+this.page)
    if(this.page==0) {this.statusPre=true; }
    else{this.statusPre=false;}
    if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
    else{this.statusNext=false}
    this.getActAchByMonthAndYear();
    // this.getMeetingByStdAndDiv();
  }
  pre()
  {
    console.log("page"+this.page)
    if(this.page==0) {this.statusPre=true; }
    else{this.statusPre=false;this.page=this.page.valueOf()-1;
      // this.getMeetingList();
      this.getActAchByMonthAndYear();
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
      this.getActAchByMonthAndYear();
    }
  }
  
  goToStudentList()
  {
    console.log("go to studentlist");
    this.router.navigate(['/teacher/activities-achievements/all-students']);
  }
  //goto Update
  updateActAch(activityId:number)
  {
    console.log("go to update attendance");
    this.router.navigate(['/teacher/activities-achievements/all-students/view/update',activityId]);
  }
  //goto Delete
  deleteActAch(activityId:number)
  { 
    console.log("delete Attendance");
    this.dialog.open(DialogBoxComponent).afterClosed().subscribe(data=>{
      console.log(data.delete)
      if(data.delete)
      { 
        this.viewActiAchiService.deleteActivity(activityId).subscribe(data=>{
          console.log(data);
          this.snakBar.open("successfully Deleted..","Cancle", {       
            duration : 3000,
            horizontalPosition:'center',
            verticalPosition:"bottom"
          });
          this.router.navigate(['/teacher/activities-achievements/all-students']);
        },error=>{
          this.handleError(error);
        })    
      }
  },error=>{
    this.handleError(error);
  })
  }

  getActAchByMonthAndYear()
  {
    if(this.selectedMonth && this.selectedYear)
    {
      this.showPagination=false;
      console.log("both");
      if(this.selectedMonth=="January"){this.selectedMonth=1}
      else if(this.selectedMonth=="February"){this.selectedMonth=2}
      else if(this.selectedMonth=="March"){this.selectedMonth=3}
      else if(this.selectedMonth=="April"){this.selectedMonth=4}
      else if(this.selectedMonth=="May"){this.selectedMonth=5}
      else if(this.selectedMonth=="June"){this.selectedMonth=6}
      else if(this.selectedMonth=="July"){this.selectedMonth=7}
      else if(this.selectedMonth=="August"){this.selectedMonth=8}
      else if(this.selectedMonth=="September"){this.selectedMonth=9}
      else if(this.selectedMonth=="October"){this.selectedMonth=10}
      else if(this.selectedMonth=="November"){this.selectedMonth=11}
      else{this.selectedMonth=12}
      this.viewActiAchiService.getStudentActivityListByMonthAndYear(this.grNo,this.selectedMonth,this.selectedYear).subscribe(data=>{
        console.log(data); this.actach=data; console.log(this.actach);
        this.viewActiAchiService.setGrNOForAttendance(this.grNo);
      },error=>{
        this.handleError(error);
      })
    }
    else if(this.selectedMonth)
    {
      console.log("month");
      if(this.selectedMonth=="January"){this.selectedMonth=1}
      else if(this.selectedMonth=="February"){this.selectedMonth=2}
      else if(this.selectedMonth=="March"){this.selectedMonth=3}
      else if(this.selectedMonth=="April"){this.selectedMonth=4}
      else if(this.selectedMonth=="May"){this.selectedMonth=5}
      else if(this.selectedMonth=="June"){this.selectedMonth=6}
      else if(this.selectedMonth=="July"){this.selectedMonth=7}
      else if(this.selectedMonth=="August"){this.selectedMonth=8}
      else if(this.selectedMonth=="September"){this.selectedMonth=9}
      else if(this.selectedMonth=="October"){this.selectedMonth=10}
      else if(this.selectedMonth=="November"){this.selectedMonth=11}
      else{this.selectedMonth=12}
      this.viewActiAchiService.getAllStudentActivitiesByMonth(this.grNo,this.selectedMonth,this.page).subscribe(data=>{
        this.actach = data['content'] ; console.log(this.actach);
        //items per page mate che..
        this.totalPages = data['totalPages'] 
        console.log("total Pages =>"+this.totalPages)
        if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
        else{this.statusNext=false}
        if(this.page==0) {this.statusPre=true; }
        else{this.statusPre=false;}
        this.pages= new Array(data['totalPages'])
        this.viewActiAchiService.setGrNOForAttendance(this.grNo);
      },error=>{
        this.handleError(error);
      })
    }
    else if(this.selectedYear)
    {
      console.log("year");
      this.viewActiAchiService.getAllStudentActivitiesByYear(this.grNo,this.selectedYear,this.page).subscribe(data=>{
        console.log(data);
        this.actach = data['content'] ; console.log(this.actach);
        //items per page mate che..
        this.totalPages = data['totalPages'] 
        console.log("total Pages =>"+this.totalPages)
        if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
        else{this.statusNext=false}
        if(this.page==0) {this.statusPre=true; }
        else{this.statusPre=false;}
        this.pages= new Array(data['totalPages'])
        this.viewActiAchiService.setGrNOForAttendance(this.grNo);
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
