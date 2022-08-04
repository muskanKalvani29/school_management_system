import { Component, OnInit } from '@angular/core';
import {Teacher} from 'src/app/core/model/Teacher';
import {TeacherServiceService} from 'src/app/features/admin/pages/teacher/services/teacher-service.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/features/DialogBox/dialog-box/dialog-box.component';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar'

@Component({
  selector: 'app-all-teachers',
  templateUrl: './all-teachers.component.html',
  styleUrls: ['./all-teachers.component.css']
})
export class AllTeachersComponent implements OnInit {

  teachers : Array<Teacher> = new Array()
  nameSearch:String=""
  page:number=0
  pages:Array<Number>
  totalPages:Number;
  statusNext:boolean=true
  statusPre:boolean = true
  constructor(private getTeachersService:TeacherServiceService,
              private router : Router,private dialog:MatDialog,private snakBar:MatSnackBar) { }

  //load list data
  ngOnInit(): void 
  {
    console.log("oninit");
    console.log("page"+this.page)
    this.getTeacherList();
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
    this.getTeacherList();
  }
  pre()
  {
    console.log("page"+this.page)
    if(this.page==0) {this.statusPre=true; }
    else{this.statusPre=false;this.page=this.page.valueOf()-1;
      this.getTeacherList();}
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
      this.getTeacherList();}
  }
  //get event list
  getTeacherList()
  {
    console.log("get all teacher list");
    this.getTeachersService.getTeacherList(this.page).subscribe(data=>{
      this.teachers = data['content']; console.log(this.teachers)
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

  //delete event
  deleteTeacher(teacherId:number)
  {
    console.log("delete");
    this.dialog.open(DialogBoxComponent).afterClosed().subscribe(data=>{
      console.log(data.delete)
   if(data.delete)
   { 
        console.log("delete");
        this.getTeachersService.deleteTeacher(teacherId)
        .subscribe(data=>{
          console.log(data);
          this.snakBar.open("successfully Deleted..","Cancle", {       
            duration : 3000,
            horizontalPosition:'center',
            verticalPosition:"bottom"
          });
          // this.getTeacherList();
          this.router.navigate(['/admin/dashboard']);
          //navigate to list
        },error=>{
          this.handleError(error);
        });
      }
    },error=>{
      this.handleError(error);
    })
  }

  //update event to navigate
  updateTeacher(teacherId:number)
  {
    console.log("update");
    this.router.navigate(['admin/teachers/all-teachers/update-teacher',teacherId]);
  }

  //view event to navigate
  viewTeacher(teacherId:number)
  {
    console.log("view");
    this.router.navigate(['admin/teachers/all-teachers/view-teacher',teacherId]);
  }

}
