import { Component, OnInit } from '@angular/core';
import {StudentServiceService} from 'src/app/features/admin/pages/student/service/student-service.service';
import {TeacherServiceService} from 'src/app/features/admin/pages/teacher/services/teacher-service.service';
import {ParentServiceService} from 'src/app/features/admin/pages/parent/services/parent-service.service';
import {AdminServiceService} from 'src/app/features/admin/services/admin-service.service';
import {HolidayServiceService} from 'src/app/features/admin/pages/holiday/service/holiday-service.service';
import {EventServiceService} from 'src/app/features/admin/pages/event/service/event-service.service';
import {UserServiceService} from 'src/app/features/admin/services/user-service.service';
import {TeacherRequest} from 'src/app/core/model/TeacherRequest';
import {Holiday} from 'src/app/core/model/Holiday';
import {Event} from 'src/app/core/model/Event';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/model/User';
import { UserType } from 'src/app/core/model/UserType';
import {Router} from '@angular/router';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar'

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css',
              // '../../../../../assets/css/normalize.css',
              // '../../../../../assets/css/main.css',
              // '../../../../../assets/css/bootstrap.min.css',
              // '../../../../../assets/css/all.min.css',
              // '../../../../../assets/fonts/flaticon.css',
              // '../../../../../assets/css/animate.min.css',
              // '../../../../../assets/css/select2.min.css',
              // '../../../../../assets/css/datepicker.min.css',
              // '../../../../../assets/css/jquery.dataTables.min.css',
              // '../../../../../assets/css/dashboardstyle.css',
            ]
})
export class AdminDashboardComponent implements OnInit {

  student:number;
  teacher:number;
  parent:number;
  user:User;
  teacherrequest:Array<TeacherRequest> = new Array()
  teacherRequestId:number;
  teacherRequestData:TeacherRequest;
  holidayData:Observable<Holiday[]>
  eventData:Observable<Event[]>
  page:number=0
  pages:Array<Number>
  totalPages:Number;
  statusNext:boolean=true
  statusPre:boolean = true
  fromEmail:Boolean = false
  constructor(private getStudentService:StudentServiceService,
              private getTeacherService:TeacherServiceService,
              private getParentService:ParentServiceService,
              private getTeacherRequest:AdminServiceService,
              private getHomeHolidayService:HolidayServiceService,
              private getHomeEventService:EventServiceService,
              private getAdminService:AdminServiceService,
              private saveUserService:UserServiceService,
              private snakBar:MatSnackBar, 
              private router:Router) {}

  ngOnInit(): void 
  {
    this.addStyleSheet()
    console.log("on init");
    this.getCountStudent();
    this.getTeacherCount();
    this.getParentCount();
    this.getHolidayForHome();
    this.getEventHome();
    this.getTeacherRequestList();
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
  setPage(i,event:any)
  {
    this.page=i;
    console.log("page"+this.page)
    if(this.page==0) {this.statusPre=true; }
    else{this.statusPre=false;}
    if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
    else{this.statusNext=false}
    this.getTeacherRequestList();
  }
  pre()
  {
    console.log("page"+this.page)
    if(this.page==0) {this.statusPre=true; }
    else{this.statusPre=false;this.page=this.page.valueOf()-1;
      this.getTeacherRequestList();}
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
      this.getTeacherRequestList();}
  }
  getCountStudent()
  {
    console.log("count student");
    this.getStudentService.getStudentListCount()
    .subscribe(data=>
      {
        this.student = data;
        console.log(this.student);
        this.router.navigate(['/admin/dashboard']);
      },error=>{
        this.handleError(error);
      });
      console.log("count-student-end");
  }

  getTeacherCount()
  {
    console.log("get-teacher-count");
    this.getTeacherService.getTeacherListCount()
    .subscribe(data=>
      {
        this.teacher=data;
        this.router.navigate(['/admin/dashboard']);
      },error=>{
        this.handleError(error);
      })
  }

  getParentCount()
  {
    console.log("get-parent-count");
    this.getParentService.getParentListCount()
    .subscribe(data=>
      {
        this.parent=data;
        this.router.navigate(['/admin/dashboard']);
      },error=>{
        this.handleError(error);
      })
  }

  getTeacherRequestList()
  {
    console.log("teacher-request");
    this.getTeacherRequest.getTeacherRequestList(this.page).subscribe(data=>{
      this.teacherrequest = data['content'] ; console.log(this.teacherrequest)
      this.totalPages = data['totalPages'] 
       console.log("total Pages =>"+this.totalPages)
       if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
       else{this.statusNext=false}
       if(this.page==0) {this.statusPre=true; }
       else{this.statusPre=false;}
       this.pages= new Array(data['totalPages'])
    },error=>{
      this.handleError(error);
    })
  }
  //holiday for dashboard
  getHolidayForHome()
  {
    console.log("holiday for home");
    this.holidayData = this.getHomeHolidayService.getHolidayByNameForHome();
    console.log(this.holidayData);
  }//event for dashboard
  getEventHome()
  {
    console.log("event for home");
    this.eventData = this.getHomeEventService.getEventByNameForHome();
    console.log(this.eventData);
  }
  addTeacherRequest(requestId:number)
  {
    this.teacherRequestId = requestId;
    console.log(requestId);
    this.user = new User();
    //add
    this.getAdminService.getTeacherRequestById(requestId).subscribe(data=>
      {
        console.log(data);
        this.teacherRequestData=data;
        this.addUser();
      },error=>{
        this.handleError(error);
      })
  }
  addUser()
  {
    console.log("adding user");
    this.user = new User();
    this.user.userType = new UserType();
    this.user.name = this.teacherRequestData.name;
    this.user.emailId = this.teacherRequestData.emailId;
    this.user.contactNo1 = this.teacherRequestData.contactNo1;
    this.user.userName = this.teacherRequestData.userName;
    this.user.userType.usertypeId = 3;
    this.user.password = this.teacherRequestData.password;
    this.saveUserService.addUser(this.user).subscribe(data=>{console.log(data);
      this.snakBar.open("successfully Added..","Cancle", {       
        duration : 3000,
        horizontalPosition:'center',
        verticalPosition:"bottom"
      });
    },error=>{
      this.handleError(error);
    })
      //send mail
      this.getAdminService.AcceptTeacherRequest(this.teacherRequestData.emailId,this.teacherRequestData.name).subscribe(data=>{
        console.log(data);
      },error=>{
        this.handleError(error);
      })
    //from box
    this.fromEmail=true;
    this.deleteTeacherRequset(this.teacherRequestId);
  }

  deleteTeacherRequset(trRequestId:number)
  {
      if(this.fromEmail)
      {
        this.getAdminService.deleteTeacherRequest(trRequestId).subscribe(data=>{console.log(data); this.getTeacherRequestList();},error=>{
          this.handleError(error);
        })
      }
      else
      {
        this.getAdminService.deleteTeacherRequest(trRequestId).subscribe(data=>{console.log(data); this.getTeacherRequestList();},error=>{
          this.handleError(error);
        })
          this.router.navigate(['/admin/dashboard']);
          this.snakBar.open("successfully Deleted..","Cancle", {       
            duration : 3000,
            horizontalPosition:'center',
            verticalPosition:"bottom"
          }); 
      }
        
 }
  addStyleSheet() {
    var headID = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.id = 'widget_styles';
    headID.appendChild(link);
  
    // link.href = '../../../../../assets/css/normalize.css';
    // link.href = '../../../../../assets/css/main.css';
    // link.href = '../../../../../assets/css/bootstrap.min.css';
    // link.href = '../../../../../assets/css/all.min.css';
    // link.href = '../../../../../assets/fonts/flaticon.css';
    // link.href = '../../../../../assets/css/animate.min.css';
    // link.href = '../../../../../assets/css/select2.min.css';
    // link.href = '../../../../../assets/css/datepicker.min.css';
    // link.href = '../../../../../assets/css/jquery.dataTables.min.css';
    // link.href = '../../../../../assets/css/dashboardstyle.css';
  }
  
}
