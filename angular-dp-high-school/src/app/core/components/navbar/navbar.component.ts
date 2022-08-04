import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from 'src/app/app-home/services/authentication.service';
import {CoreService} from 'src/app/app-home/services/core.service';
import {User} from 'src/app/core/model/User';
import {StudentServiceService} from 'src/app/features/admin/pages/student/service/student-service.service';
import {AdminServiceService} from 'src/app/features/admin/services/admin-service.service';
import {TeacherOwnServiceService} from 'src/app/features/teacher/services/teacher-own-service.service';
import {Parent} from 'src/app/core/model/Parent';
import {Teacher} from 'src/app/core/model/Teacher';
import {Admin} from 'src/app/core/model/Admin';
import { Student } from '../../model/Student';
import { Query } from '../../model/Query';
import { QueryServiceService } from 'src/app/features/admin/pages/query/service/query-service.service';
import { InquiryServiceService } from 'src/app/features/admin/pages/inquiry/service/inquiry-service.service';
import { Inquiry } from '../../model/Inquiry';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userobj:User;
  user_name:String;
  user_type:String;
  parentobj:Parent;
  teacherobj:Teacher;
  adminobj:Admin;
  studentobj:Student;
  isparentBellIcon:Boolean = false;
  isteacherBellIcon:Boolean = false;
  isadminBellIcon:Boolean = false;
  parentUserType:Boolean=false;
  teacherUserType:Boolean = false;
  adminUserType:Boolean = false;
  url:String;
  teacher=Teacher;
  showUrl:Boolean = false;
  //admin image,te im,pa im
  queries : Array<Query> = new Array()
  inquires:Array<Inquiry> = new Array();
  query1:Query;
  query2:Query;
  query3:Query;
  inquiry1:Inquiry;
  inquiry2:Inquiry;
  inquiry3:Inquiry;
  constructor(private _auth:AuthenticationService,
              private getAdminService:AdminServiceService,
              private studentService:StudentServiceService,
              private teacherService:TeacherOwnServiceService,
              private getQueriesService:QueryServiceService,
              private getInquiryService:InquiryServiceService,
              private _core:CoreService) { }
              //service obj (3)
  ngOnInit(): void 
  {
    this.addStyleSheet()
    this.getName();
  }

  addStyleSheet() {
    var headID = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.id = 'widget_styles';
    headID.appendChild(link);
  
    link.href = '../../../../assets/css/normalize.css';
    link.href = '../../../../assets/css/main.css';
    link.href = '../../../../assets/css/bootstrap.min.css';
    link.href = '../../../../assets/css/all.min.css';
    link.href = '../../../../assets/fonts/flaticon.css';
    link.href = '../../../../assets/css/animate.min.css';
    link.href = '../../../../assets/css/select2.min.css';
    link.href = '../../../../assets/css/datepicker.min.css';
    link.href = '../../../../assets/css/jquery.dataTables.min.css';
    link.href = '../../../../assets/css/dashboardstyle.css';
  }

  logout()
  {
    this._auth.logOut()
  }

  getName()
  {
    let user:string[];
    let userId:number;
    let username:String;
    let userType:String;
    let name:String;

    user = localStorage.getItem(this._auth.LOCAL_STORAGE_ATTRIBUTE_USERNAME).split(" ");
    username = atob(user[0]);
    this._core.getUserByUserName(username).subscribe(data=>
      {
        this.userobj = data;
        userId = this.userobj.userId;
        console.log(userId);
        userType = this.userobj.userType.userType;
        this.user_type=userType;
        name = this.userobj.name;
        this.user_name=name;
        console.log(userType);
          if(userType=="Parent")
          {
            this.showUrl = false;
              console.log(userType);
              this.parentUserType = true;
              // this.studentService.getStudentByParentId(userId)
              // .subscribe(data=>{
              //   this.studentobj = data;
              //   this.url=this.studentobj.image;
                //this.adminId = this.admin.adminId;
                // console.log(data)});
              // this.router.navigate(['parent/home']);
          }
          else if(userType=="Teacher")
          {
              this.showUrl = true;
              this.teacherUserType = true;
              console.log(userType);
              this.teacherService.getTeacherByUserName(username)
              .subscribe(data=>{
                this.teacherobj = data;
                if(this.teacherobj.image=="" || this.teacherobj.image==null)
                {
                  this.url="../../../../assets/img/figure/user.jpg";
                }
                else{
                  this.url=this.teacherobj.image;
                  // this.router.navigate(['teacher/home']);
                }
                //this.adminId = this.admin.adminId;
                console.log(data)});
          }
          else
          {
            this.showUrl = true;
            this.adminUserType = true;
            console.log(userType);
            //getadmin(username)
            this.getAdminService.getAdmin(username)
            .subscribe(data=>{
              this.adminobj = data;
              this.url=this.adminobj.image;
              //this.adminId = this.admin.adminId;
              console.log(data)});
            // this.router.navigate(['admin/dashboard']);
            // this.getQueriesService.getQueryList(0).subscribe(data=>{
            //   this.queries=data['content'];
            //   console.log("queries==>");
            //   console.log(this.queries);
            //   this.query1=this.queries[0];
            //   this.query2=this.queries[1];
            //   this.query3=this.queries[2];
            // })
            // this.getInquiryService.getInquiryList(0).subscribe(data=>{
            //   console.log(data);
            //   this.inquires = data['content'];
            //   console.log("in inquires");
            //   this.inquiry1 = this.inquires[0];
            //   this.inquiry1 = this.inquires[1];
            //   this.inquiry1 = this.inquires[2];
            // })
          }
      })
  }
}
