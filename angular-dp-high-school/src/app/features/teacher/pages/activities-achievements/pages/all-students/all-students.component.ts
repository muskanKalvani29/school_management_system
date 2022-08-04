import { Component, OnInit } from '@angular/core';
import {Student} from 'src/app/core/model/Student';
import { DialogBoxComponent } from 'src/app/features/DialogBox/dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { User } from 'src/app/core/model/User';
import {Router} from '@angular/router';
import { Division } from 'src/app/core/model/Division';
import { Standard } from 'src/app/core/model/Standard';
import { StandardDivisionService } from 'src/app/features/admin/services/standard-division.service';
import { AuthenticationService } from 'src/app/app-home/services/authentication.service';
import { CoreService } from 'src/app/app-home/services/core.service';
import { Teacher } from 'src/app/core/model/Teacher';
import { TeacherOwnServiceService } from 'src/app/features/teacher/services/teacher-own-service.service';
import {StudentServiceService} from 'src/app/features/admin/pages/student/service/student-service.service';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.css']
})
export class AllStudentsComponent implements OnInit {
  standards:Standard[];
  divisions:Division[];
  students:Array<Student> = new Array();
  userId:number
  userobj:User;
  UserName:String
  teacher:Teacher;
  selectedstd:any;
  selecteddiv:any;
  page:number=0
  pages:Array<Number>
  totalPages:Number;
  statusNext:boolean=true
  statusPre:boolean = true
  constructor( private router : Router,private dialog:MatDialog,private snakBar:MatSnackBar,
    private getStdDivService:StandardDivisionService,
    private authService:AuthenticationService,private coreService:CoreService,
    private getTecharService:TeacherOwnServiceService,
    private getStudentService:StudentServiceService) { }

    ngOnInit(): void 
    {
      this.getStandardList();
      this.getDivisionList();
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
            this.standards = this.teacher.standard; console.log("stnadard list = > "+this.standards);
          },error=>{
            this.handleError(error);
          })
        },error=>{
          this.handleError(error);
        })
  
      
    }
    //get divisions
    getDivisionList()
    {
      console.log("Division list");
      this.getStdDivService.getDivisionList()
      .subscribe(data=>{
        console.log(data);
        this.divisions=data;
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
      // this.getMeetingByStdAndDiv();
      this.getStudentsByStdAndDiv();
    }
    pre()
    {
      console.log("page"+this.page)
      if(this.page==0) {this.statusPre=true; }
      else{this.statusPre=false;this.page=this.page.valueOf()-1;
        // this.getMeetingList();
      }
      if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
      else{this.statusNext=false}
      this.getStudentsByStdAndDiv();
    }
    next()
    {
      if(this.page==0) {this.statusPre=true; }
      else{this.statusPre=false;}
      console.log("page"+this.page)
       if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
      else{this.statusNext=false; this.page=this.page.valueOf()+1;
        // this.getMeetingList();
        this.getStudentsByStdAndDiv();
      }
    }
    changediv(e)
    {
      console.log(e.target.value);
      this.selecteddiv = e.target["selectedIndex"]; console.log(this.selecteddiv);
    }
    //get selected standard
    changestd(e)
    {
      console.log(e.target.value); 
      this.selectedstd = e.target.value; console.log(this.selectedstd);
      console.log(this.selectedstd[0]);
    }
    //get students by std and div
    getStudentsByStdAndDiv()
    {
      console.log("Hey !!");
      if(this.selectedstd && this.selecteddiv)
       {
        this.getStudentService.getStrudentByStandardAndDivision(this.selectedstd,this.selecteddiv,this.page).subscribe(data=>{
          this.students = data['content'] ; console.log(this.students);
            //items per page mate che..
            this.totalPages = data['totalPages'] 
            console.log("total Pages =>"+this.totalPages)
            if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
            else{this.statusNext=false}
            if(this.page==0) {this.statusPre=true; }
            else{this.statusPre=false;}
            this.pages= new Array(data['totalPages'])
            this.router.navigate(['/teacher/activities-achievements/all-students']);
        },error=>{
          this.handleError(error);
        })
       }
       else if(this.selectedstd)
       {
          this.getStudentService.getStudentByStandardId(this.selectedstd,this.page).subscribe(data=>{
            this.students = data['content'] ; console.log(this.students);
              //items per page mate che..
              this.totalPages = data['totalPages'] 
              console.log("total Pages =>"+this.totalPages)
              if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
              else{this.statusNext=false}
              if(this.page==0) {this.statusPre=true; }
              else{this.statusPre=false;}
              this.pages= new Array(data['totalPages'])
              this.router.navigate(['/teacher/activities-achievements/all-students']);
          },error=>{
            this.handleError(error);
          })
       }
       else
       {
         console.log("nothing");  
         this.router.navigate(['/teacher/attendance/all-students']);
       }
    }
  
 //view ActAch to navigate
   viewActAch(grNo:number)
   {
     console.log("view");
     this.router.navigate(['/teacher/activities-achievements/all-students/view',grNo]);
   }
   //Add ActAch Routing
   addActAch(grNo:number)
   {
     console.log("view");
     this.router.navigate(['/teacher/activities-achievements/all-students/add',grNo]);
   }
}
