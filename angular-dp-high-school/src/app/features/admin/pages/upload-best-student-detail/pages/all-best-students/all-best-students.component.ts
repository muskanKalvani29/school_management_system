import { Component, OnInit } from '@angular/core';
import {BestStudent} from 'src/app/core/model/BestStudent';
import {BestStudentServiceService} from 'src/app/features/admin/pages/upload-best-student-detail/services/best-student-service.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import { UploadImageService } from 'src/app/features/admin/services/upload-image.service';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import {DialogBoxComponent} from 'src/app/features/DialogBox/dialog-box/dialog-box.component';

@Component({
  selector: 'app-all-best-students',
  templateUrl: './all-best-students.component.html',
  styleUrls: ['./all-best-students.component.css']
})
export class AllBestStudentsComponent implements OnInit {

  bestStudents: Array<BestStudent> = new Array()
  bestStudentName:any;
  nameSearch:String=""
  page:number=0
  pages:Array<Number>
  totalPages:Number;
  statusNext:boolean=true
  statusPre:boolean = true
  beststudent: BestStudent
  constructor(private getBestStudentService : BestStudentServiceService,
              private router : Router,private deleteimageService: UploadImageService,private snakBar:MatSnackBar,
              private dialog:MatDialog) { }

  ngOnInit(): void 
  {
    console.log("oninit");
    console.log("page"+this.page)
    this.getBestStudent();
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
    this.getBestStudent();
  }
  pre()
  {
    console.log("page"+this.page)
    if(this.page==0) {this.statusPre=true; }
    else{this.statusPre=false;this.page=this.page.valueOf()-1;
      this.getBestStudent();}
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
      this.getBestStudent();}
  }
  getBestStudent()
  {
    console.log("get best student");
    this.getBestStudentService.getBestStudentList(this.page).subscribe(data=>
      {
        this.bestStudents = data['content'] ; console.log(this.bestStudents)
           //items per page mate che..
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
    // console.log(this.getBestStudentService.getBestStudentList().subscribe(data=>{console.log(data);}));
  }

   //update best student to navigate
   updateStudent(bestStudentId:number)
   {
     console.log("update");
     this.router.navigate(['admin/dashboard/best-student/all-best-students/update-best-student',bestStudentId]);
   }
 
   //view  best student to navigate
   viewStudent(bestStudentId:number)
   {
     console.log("view");
     this.router.navigate(['admin/dashboard/best-student/all-best-students/view-best-student',bestStudentId]);
   }
   //delete studeny
   deleteStudent(bestStudentId:number)
   {
     console.log("delete");
     this.dialog.open(DialogBoxComponent).afterClosed().subscribe(data=>{
      console.log(data.delete)
      if(data.delete)
      {
        this.beststudent = new BestStudent();
        // this.bestStudentId = this.route.snapshot.params['bestStudentId'];
        this.getBestStudentService.getBestStudent(bestStudentId)
        .subscribe(data=>{
          console.log(data);
          console.log("delete url : "+data.image);
          this.beststudent = data;
          this.deleteimageService.delete(this.beststudent.image);
        },error=>{
          this.handleError(error);
        })
        console.log("delete");
        this.getBestStudentService.deleteBestStudent(bestStudentId)
        
        .subscribe(data=>{
          console.log(data);
          this.router.navigate(['/admin/dashboard']);
          this.snakBar.open("successfully Deleted..","Cancle", {       
           duration : 3000,
           horizontalPosition:'center',
           verticalPosition:"bottom"
         });
          //navigate to list
         //  this.getBestStudent();
        },error=>{
          this.handleError(error);
        });
      }

   },error=>{
    this.handleError(error);
  })
  }
   //filter service by name
   getBestStudentByName(getBestStudentByName:any)
   {
     console.log("best student by name filter");
     this.bestStudentName = getBestStudentByName.bestStudentName;
     console.log(this.bestStudentName);
   }
}
