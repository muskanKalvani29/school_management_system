import { Component, OnInit } from '@angular/core';
import {Student} from 'src/app/core/model/Student';
import {StudentServiceService} from 'src/app/features/admin/pages/student/service/student-service.service';
import {StandardDivisionService} from 'src/app/features/admin/services/standard-division.service';
import {Standard} from 'src/app/core/model/Standard';
import {Division} from 'src/app/core/model/Division';
import { FileUpload } from 'src/app/core/model/FileUpload';
import { UploadImageService } from 'src/app/features/admin/services/upload-image.service';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar'

// import {Observable} from 'rxjs';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})

export class UpdateStudentComponent implements OnInit {

  grNo : number;
  student : Student;
  //for dropdown
  standard:Standard[]
  divisions:Division[]
  genderdata: any[] = ['Male','Female'];
  mediumData: any[] = ['Gujarati','English'];
  streamData: any[] = ['Morning','Noon'];
  bloodgroupData: any[] = ['A','B','A+','A-','B','B+','B-','O+','O-','AB+','AB-'];
  feeStatusData: any[] = ['Paid','Unpaid'];
  //image variables
  imageChangedEvent: any = '';
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number;
  image: File;
  url : String;
  selectedFileName: string = "";
  imageURL:string;
  isUpload : boolean=false;
  getDOBdate: String;
  getAdate: string;

  constructor(private updateStudentService : StudentServiceService,
              private getStdDivService:StandardDivisionService,
              private router : Router,
              private route : ActivatedRoute,
              private snakBar:MatSnackBar, private uploadService: UploadImageService) { }

  ngOnInit(): void
  {
    this.student = new Student();
    this.student.division = new Division();
    this.grNo = this.route.snapshot.params['grNo'];
    this.updateStudentService.getStudent(this.grNo)
    .subscribe(data=>{
      console.log(data);
      this.student=data;
      this.getDOBdate = this.student.dateOfBirth;
      this.getAdate = this.student.admissionDate;
      this.url=this.student.image;
      console.log(this.student.image);
    },error=>{
      this.handleError(error);
    })
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
  //get standard
  getStandardList()
  {
    console.log("Stanadard list");
    this.getStdDivService.getStandardList()
    .subscribe(data=>
      {
        console.log(data);
        this.standard=data;
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
  //update student 
  updateStudent()
  {
    if(this.isUpload==true){
      this.student.image=localStorage.getItem("imageURL");
      localStorage.removeItem("imageURL");
    }
    else{
      this.student.image = this.url;
    }
    if(this.student.division.divisionName=="sunflower"){this.student.division.divisionId = 2;}
    else if(this.student.division.divisionName=="rose"){this.student.division.divisionId=1;}
    else{this.student.division.divisionId=3}
    console.log(this.student);
    if(this.student.dateOfBirth != this.getDOBdate)
    {
      let getMDate:String = this.student.dateOfBirth;
      let splitMDate:String[] = getMDate.split("-");
      let concateMDate = splitMDate[1] + "-" + splitMDate[2] + "-" + splitMDate[0];
      this.student.dateOfBirth = concateMDate;
    }
    if(this.student.admissionDate != this.getAdate)
    {
      let getMDate1:String = this.student.admissionDate;
      let splitMDate1:String[] = getMDate1.split("-");
      let concateMDate1 = splitMDate1[1] + "-" + splitMDate1[2] + "-" + splitMDate1[0];
      this.student.admissionDate = concateMDate1;
    }
    this.updateStudentService.updateStudent(this.grNo,this.student)
    .subscribe(data=>{
      console.log(data);
      this.student = new Student();
      console.log("hi");
      this.snakBar.open("successfully Updated..","Cancle", {       
        duration : 3000,
        horizontalPosition:'center',
        verticalPosition:"bottom"
      });
      this.goToStudentList();
    },error=>{
      this.handleError(error);
    })
  }
  
  //on submit
  onSubmit()
  {
    console.log("form update");
    this.updateStudent();
  }

  //go back to student list
  goToStudentList()
  {
    console.log("hi");
    this.router.navigate(['/admin/students/all-students']);
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  
  
  selectFile(event): void {
    this.selectedFiles = event.target.files;
    this.selectedFileName = this.selectedFiles.item(0).name
    console.log(this.selectedFiles.item(0).name);
  
  }
  
  upload(): void {
  
    this.percentage=0
    this.isUpload=true;
    this.uploadService.delete(this.url);
    console.log(this.url);
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    
    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload,"/student_image").subscribe( 
      percentage => {
        this.percentage = Math.round(percentage);
        if (this.percentage === 100) {
            console.log("image upoaded successfully");
          // this.createPost.imageURL = localStorage.getItem("imageURL")
          // console.log(this.createPost.imageURL);
  
        }
      },
      error => {
        console.log(error);
      }
  
    )
  }
}
