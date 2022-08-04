import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent,ImageTransform} from 'ngx-image-cropper';
import {StandardDivisionService} from 'src/app/features/admin/services/standard-division.service';
import {BestStudentServiceService} from 'src/app/features/admin/pages/upload-best-student-detail/services/best-student-service.service';
import {Standard} from 'src/app/core/model/Standard';
import {Division} from 'src/app/core/model/Division';
import {BestStudent} from 'src/app/core/model/BestStudent';
import { FileUpload } from 'src/app/core/model/FileUpload';
import { UploadImageService } from 'src/app/features/admin/services/upload-image.service';
import {Router,ActivatedRoute} from '@angular/router'
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar'

@Component({
  selector: 'app-add-best-student',
  templateUrl: './add-best-student.component.html',
  styleUrls: ['./add-best-student.component.css']
})
export class AddBestStudentComponent implements OnInit {

  beststudent:BestStudent = new BestStudent();
  standards:Standard[];
  divisions:Division[];
  mediumData: any[] = ['Gujarati','English'];
  title = 'angular-image-uploader';

  imageChangedEvent: any = '';
  croppedImage: any = '';
  scale = 1;
  transform: ImageTransform = {};
  selectedFileName: string = "";
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number;
  image: File;
  baseUrl:String;
  imageURL:string;
  constructor(private getStdDivService:StandardDivisionService,
              private addBestStuService:BestStudentServiceService,
              private router:Router,
              private snakBar:MatSnackBar,private uploadService: UploadImageService) { }

  ngOnInit(): void 
  {
    this.imageURL=null
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

  addBestStudent(addBestStudent:any)
  {
    this.beststudent = new BestStudent();
    this.beststudent.name = addBestStudent.name;
    this.beststudent.standardName = addBestStudent.standardName;
    this.beststudent.divisionName = addBestStudent.divisionName;
    this.beststudent.medium = addBestStudent.medium;
    //ama url nakhvi padse tare je avse e
    this.imageURL = localStorage.getItem("imageURL");
    //console.log(this.imageURL);
    localStorage.removeItem("imageURL");
    this.beststudent.image = this.imageURL;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var today1 = mm + '-' + dd + '-' + yyyy;
    console.log(today1);
    this.beststudent.uploadDate = today1; 

    this.addBestStuService.addBestStudent(this.beststudent)
    .subscribe(data=>{console.log(data)
    this.snakBar.open("successfully Added..","Cancle", {       
      duration : 3000,
      horizontalPosition:'center',
      verticalPosition:"bottom"
    });
    this.router.navigate(['/admin/dashboard/best-student/all-best-students']);
    
  },error=>{
    this.handleError(error);
  });
  }

  

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  selectFile(event): void {
    this.selectedFiles = event.target.files;
    this.selectedFileName = this.selectedFiles.item(0).name
    console.log(this.selectedFiles.item(0).name);

  }
  imageCropped(event: ImageCroppedEvent) {
    let user: Array<string>
    let imageName: string
       
    this.croppedImage = event.base64;
    console.log("cropped image : "+this.croppedImage);
    let randomString = this.randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    this.selectedFileName += randomString
    console.log("SELECT FILE NAME :"+this.selectedFileName);
    this.image = this.dataURLtoFile(this.croppedImage, this.selectedFileName);
    console.log(this.image);
  }
  randomString(length, chars) 
  {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  imageLoaded() {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }

  zoomOut() {
    this.scale -= .1;
    this.transform = {
        ...this.transform,
        scale: this.scale
    };
  }
  zoomIn() {
    this.scale += .1;
    this.transform = {
        ...this.transform,
        scale: this.scale
    };
  }

  upload(): void {
    // alert("Radhe Radhe")
    //setting image whether cropped or not
    const file = this.image;
    this.selectedFiles = undefined;
    

    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload,"/bestStudent").subscribe( 
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
