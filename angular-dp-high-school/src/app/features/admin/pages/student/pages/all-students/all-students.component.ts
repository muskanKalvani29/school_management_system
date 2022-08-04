import { Component, OnInit } from '@angular/core';
import {Student} from 'src/app/core/model/Student';
import {StudentServiceService} from 'src/app/features/admin/pages/student/service/student-service.service';
import {StandardDivisionService} from 'src/app/features/admin/services/standard-division.service';
import {Standard} from 'src/app/core/model/Standard';
import {Division} from 'src/app/core/model/Division';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import { UploadImageService } from 'src/app/features/admin/services/upload-image.service';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar'
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/features/DialogBox/dialog-box/dialog-box.component';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.css']
})
export class AllStudentsComponent implements OnInit {

  students : Array<Student> = new Array()
  //for dropdown
  standards:Standard[]
  divisions:Division[]
  selectedstd:any;
  studentlength:number;
  selecteddiv:any;
  page:number=0
  pages:Array<Number>
  totalPages:Number;
  statusNext:boolean=true
  statusPre:boolean = true
  studentData: Student;
  // eventId : number
  constructor(private getStudentsService:StudentServiceService,
              private getStdDivService:StandardDivisionService,
              private router : Router,private deleteimageService: UploadImageService,private snakBar:MatSnackBar,
              private dialog:MatDialog) { }

 //load list data
 ngOnInit(): void 
 {
   console.log("oninit");
   console.log("page"+this.page)
   this.getStudentList();
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
 setPage(i,event:any)
 {
   this.page=i;
   console.log("page"+this.page)
   if(this.page==0) {this.statusPre=true; }
   else{this.statusPre=false;}
   if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
   else{this.statusNext=false}
   this.getStudentList();
 }
 pre()
 {
   console.log("page"+this.page)
   if(this.page==0) {this.statusPre=true; }
   else{this.statusPre=false;this.page=this.page.valueOf()-1;
     this.getStudentList();}
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
     this.getStudentList();}
 }
  //get standard
  getStandardList()
  {
    console.log("Stanadard list");
    this.getStdDivService.getStandardList()
    .subscribe(data=>
      {
        console.log(data);
        this.standards=data;
      },error=>{
        this.handleError(error);
      })
  }

  //get divisions list
  getDivisionList()
  {
    console.log("division list");
    this.getStdDivService.getDivisionList().subscribe(data=>{
      console.log(data);
      this.divisions=data
    },error=>{
      this.handleError(error);
    });
  }

  //get student list
  getStudentList()
  {
    console.log("get all student list");
    this.getStudentsService.getstudentList(this.page).subscribe(data=>
      {
        let i:number;
        this.studentlength = data.length;
        this.students = data['content'] ; console.log(this.students)
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

   //delete studeny
   //delete studeny
   deleteStudent(grNo:number)
   {
    console.log("delete");
    this.dialog.open(DialogBoxComponent).afterClosed().subscribe(data=>{
      console.log(data.delete)
   if(data.delete)
   { 
        this.studentData = new Student();
        
        this.getStudentsService.getStudent(grNo)
        .subscribe(data=>{
          console.log(data);
          this.studentData = data;
          console.log(this.studentData.image);
          this.deleteimageService.delete(this.studentData.image);
        },error=>{
          this.handleError(error);
        })

        console.log("delete");
        this.getStudentsService.deleteStudent(grNo)
        .subscribe(data=>{
          console.log(data);
          this.snakBar.open("successfully Deleted..","Cancle", {       
            duration : 3000,
            horizontalPosition:'center',
            verticalPosition:"bottom"
          });
          //navigate to list
          //  this.getStudentList();
          this.router.navigate(['/admin/dashboard']);
        },error=>{
          this.handleError(error);
        });
      }
    },error=>{
      this.handleError(error);
    })
   }

   //update event to navigate
  updateStudent(grNo:number)
  {
    console.log("update");
    this.router.navigate(['admin/students/all-students/update-student',grNo]);
  }

  //view event to navigate
  viewStudent(grNo:number)
  {
    console.log("view");
    this.router.navigate(['admin/students/all-students/view-student',grNo]);
  }
  //get selected div
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
   //searchfilter
   getStudentByStdAndDiv(getStudentByStdAndDiv:any)
   {
     console.log("hi students by std and div");
      //jo std select na hoy to
     if(this.selectedstd && this.selecteddiv)
     {
      this.getStdDivService.getStudentsListByStandardDivision(this.page,this.selectedstd,this.selecteddiv).subscribe(data=>
        {
          this.students = data['content']; console.log(data);
          this.totalPages = data['totalPages'] 
          console.log("total Pages =>"+this.totalPages)
          if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
          else{this.statusNext=false}
          if(this.page==0) {this.statusPre=true; }
          else{this.statusPre=false;}
          this.pages= new Array(data['totalPages'])
          this.router.navigate(['/admin/students/all-students']);
            },error=>{
              this.handleError(error);
            })
           
     }
     else if(this.selectedstd)
     {
      this.getStdDivService.getStudentsListByStandard(this.page,this.selectedstd).subscribe(data=>
        {
          this.students = data['content']; console.log(this.students);
          this.totalPages = data['totalPages'] 
          console.log("total Pages =>"+this.totalPages)
          if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
          else{this.statusNext=false}
          if(this.page==0) {this.statusPre=true; }
          else{this.statusPre=false;}
          this.pages= new Array(data['totalPages'])
              this.router.navigate(['/admin/students/all-students']);
            },error=>{
              this.handleError(error);
            })
     }
     else
     {
      this.router.navigate(['/admin/students/all-students']);
     }
   }
}
