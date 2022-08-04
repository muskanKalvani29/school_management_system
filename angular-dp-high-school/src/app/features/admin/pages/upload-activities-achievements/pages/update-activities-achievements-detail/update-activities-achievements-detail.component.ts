import { Component, OnInit } from '@angular/core';
import { Image } from 'src/app/core/model/Image';
import {ActivitiesAchievementsService} from 'src/app/features/admin/pages/upload-activities-achievements/services/activities-achievements.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar'
import { ImageCroppedEvent,ImageTransform} from 'ngx-image-cropper';
import { FileUpload } from 'src/app/core/model/FileUpload';
import { UploadImageService } from 'src/app/features/admin/services/upload-image.service';

@Component({
  selector: 'app-update-activities-achievements-detail',
  templateUrl: './update-activities-achievements-detail.component.html',
  styleUrls: ['./update-activities-achievements-detail.component.css']
})
export class UpdateActivitiesAchievementsDetailComponent implements OnInit {

  imageType:String[] = ['Achievement','Activity'];
  imageId : number;
  imageData : Image;
   //variables
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
  constructor(private updateActAchService : ActivitiesAchievementsService,
              private router : Router,
              private route : ActivatedRoute,
              private uploadService: UploadImageService,
              private snakBar:MatSnackBar) { }

  ngOnInit(): void 
  {
    console.log("on init");
    this.imageData = new Image();
    this.imageId = this.route.snapshot.params['imageId'];
    this.updateActAchService.getImage(this.imageId)
    .subscribe(data=>{
      console.log(data);
      this.imageData=data;
      this.url=this.imageData.imagePath;
      console.log("path => "+this.imageData.imagePath);
    },error=>{
      this.handleError(error);
    })
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
  updateImage()
  {
    if(this.isUpload==true){
      this.imageData.imagePath=localStorage.getItem("imageURL");
      localStorage.removeItem("imageURL");
    }
    else{
      this.imageData.imagePath=this.url;
    }
   
    this.updateActAchService.updateImage(this.imageId,this.imageData)
    .subscribe(data=>{
      console.log(data);
      this.imageData = new Image();
      console.log("hi");
      this.snakBar.open("successfully Updated..","Cancle", {       
        duration : 3000,
        horizontalPosition:'center',
        verticalPosition:"bottom"
      });
      this.router.navigate(['admin/dashboard/activities-achivements/all-activities-achivements']);
    },error=>{
      this.handleError(error);
    })
  }
  
  //on submit
  onSubmit()
  {
    console.log("form update");
    this.updateImage();
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

  
    upload(): void {

      this.percentage=0
      this.isUpload=true;
      this.uploadService.delete(this.url);
      console.log(this.url);
      const file = this.image;
      this.selectedFiles = undefined;
      
      this.currentFileUpload = new FileUpload(file);
      this.uploadService.pushFileToStorage(this.currentFileUpload,"/ActivityAchievement_Images").subscribe( 
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
