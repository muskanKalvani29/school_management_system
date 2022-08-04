import { Component, OnInit } from '@angular/core';
import {BestStudent} from 'src/app/core/model/BestStudent';
import {BestStudentServiceService} from 'src/app/features/admin/pages/upload-best-student-detail/services/best-student-service.service';
import {StandardDivisionService} from 'src/app/features/admin/services/standard-division.service';
import {Standard} from 'src/app/core/model/Standard';
import {Division} from 'src/app/core/model/Division';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCroppedEvent,ImageTransform} from 'ngx-image-cropper';
import { FileUpload } from 'src/app/core/model/FileUpload';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar'
import { UploadImageService } from 'src/app/features/admin/services/upload-image.service';

@Component({
  selector: 'app-update-best-student',
  templateUrl: './update-best-student.component.html',
  styleUrls: ['./update-best-student.component.css']
})
export class UpdateBestStudentComponent implements OnInit {

  bestStudentId : number;
  beststudent : BestStudent;
  //for dropdown
  standard:Standard[];
  division:Division[];
  mediumData: any[] = ['Gujarati','English'];
  imageChangedEvent: any = '';
  croppedImage: any = '';
  scale = 1;
  transform: ImageTransform = {};
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number;
  image: File;
  url : String;
  selectedFileName: string = "";
  imageURL:string;
  isUpload : boolean=false;

  constructor(private updateStudentService : BestStudentServiceService,
              private getStdDivService:StandardDivisionService,
              private router : Router,
              private route : ActivatedRoute,
              private uploadService: UploadImageService,
              private snakBar:MatSnackBar) { }

  ngOnInit(): void 
  {
    this.beststudent = new BestStudent();
    this.bestStudentId = this.route.snapshot.params['bestStudentId'];
    this.updateStudentService.getBestStudent(this.bestStudentId)
    .subscribe(data=>{
      console.log(data);
      this.beststudent=data;
      this.url=this.beststudent.image;
      console.log(this.beststudent.image);
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
       this.division=data
     },error=>{
      this.handleError(error);
    });
   }

   //update student 
  updateStudent()
  {
    if(this.isUpload==true){
      this.beststudent.image=localStorage.getItem("imageURL");
      localStorage.removeItem("imageURL");
    }
    else{
      this.beststudent.image=this.url;
    }
   
    this.updateStudentService.updateBestStudent(this.bestStudentId,this.beststudent)
    .subscribe(data=>{
      console.log(data);
      this.beststudent = new BestStudent();
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
    this.router.navigate(['admin/dashboard/best-student/all-best-students']);
  }
   //image
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
  );
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
}
