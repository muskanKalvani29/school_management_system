import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/core/model/Student';
import {StudentServiceService} from 'src/app/features/admin/pages/student/service/student-service.service';
import {StandardDivisionService} from 'src/app/features/admin/services/standard-division.service';
import {Standard} from 'src/app/core/model/Standard';
import {Division} from 'src/app/core/model/Division';
import { FileUpload } from 'src/app/core/model/FileUpload';
import { UploadImageService } from 'src/app/features/admin/services/upload-image.service';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  division_id:number;
  student: Student = new Student();
  standard:Standard
  division:Division
  standards:Standard[];
  divisions:Division[];
  genderdata: any[] = ['Male','Female'];
  mediumData: any[] = ['Gujarati','English'];
  streamData: any[] = ['Morning','Noon'];
  bloodgroupData: any[] = ['A+','A-','B+','B-','O+','O-','AB+','AB-'];
  feeStatusData: any[] = ['Paid','Unpaid'];
  //variables image
  title = 'angular-image-uploader';

  imageChangedEvent: any = '';
  selectedFileName: string = "";
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number;
  baseUrl:String;
  imageURL:string;
  constructor(private studentservice: StudentServiceService,
              private getStdDivService:StandardDivisionService,
              private uploadService: UploadImageService,
              private snakBar:MatSnackBar,private router:Router) { }
 

  ngOnInit(): void 
  {
    this.getStandardList();
    this.getDivisionList();
    this.imageURL=null
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
    console.log("Stanadard list");
    this.getStdDivService.getStandardList()
    .subscribe(data=>{
      console.log(data);
      this.standards=data;
    },error=>{
      this.handleError(error);
    })
  }

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

  addStudent(addstudent:any)
  {
    this.student = new Student();
    this.student.standard = new Standard();
    this.student.division = new Division();
    this.student.firstName = addstudent.firstName;
    this.student.middleName = addstudent.middleName;
    this.student.lastName = addstudent.lastName;
    this.student.motherName = addstudent.motherName;
    this.student.fatherName = addstudent.fatherName;
    this.student.rollNo = addstudent.rollNo;
    this.student.grNo = addstudent.grNo;
    this.student.gender = addstudent.gender;
    this.student.standard.standardName = addstudent.standard;
    if(addstudent.division=="rose"){
      this.division_id=1;
    }
    else if(addstudent.division=="lotus"){
      this.division_id=3;
    }
    else {
      this.division_id=2;
    }
    this.student.division.divisionId = this.division_id;
    this.student.medium = addstudent.medium;
    this.student.stream =addstudent.stream;
    let getAddmissionDate:String = addstudent.admissionDate;
    let splitAdmissionDate:String[] = getAddmissionDate.split("-");
    let concatAddDate = splitAdmissionDate[1] + "-" + splitAdmissionDate[2] + "-" + splitAdmissionDate[0];
    this.student.admissionDate = concatAddDate;
    let dob:String = addstudent.dateOfBirth;
    let splitdob:String[] = dob.split("-");
    let concatdob = splitdob[1] + "-" + splitdob[2] + "-" + splitdob[0];
    this.student.dateOfBirth = concatdob;
    this.student.bloodGroup = addstudent.bloodGroup;
    this.student.emailId = addstudent.emailId;
    this.student.feeStatus = addstudent.feeStatus;
    this.student.address1 = addstudent.address1;
    this.student.address2 = addstudent.address2;
    this.student.pincode = addstudent.pincode;
    this.student.previousSchoolName = addstudent.previousSchoolName;
    this.imageURL = localStorage.getItem("imageURL");
    console.log("------------"+this.imageURL+"-----------");
    localStorage.removeItem("imageURL");
    this.student.image = this.imageURL;
    console.log(addstudent);
    this.studentservice.addStudent(this.student).
    subscribe(data=>{console.log(data)
      this.snakBar.open("successfully Added..","Cancle", {       
        duration : 3000,
        horizontalPosition:'center',
        verticalPosition:"bottom"
      });
    },error=>{
      this.handleError(error);
    });
    this.router.navigate(['/admin/students/all-students']);
  }
  //image upload
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
    this.selectedFileName = this.selectedFiles.item(0).name
    console.log(this.selectedFiles.item(0).name);

  }
  
  upload(): void {
    // alert("Radhe Radhe")
    //setting image whether cropped or not
    const file =  this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    

    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload,"/student_image").subscribe( 
      percentage => {
        this.percentage = Math.round(percentage);
        if (this.percentage === 100) {
            console.log("image upoaded successfully");
        }
      },
      error => {
        console.log(error);
      }

    )
  }

}
