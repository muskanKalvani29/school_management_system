import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent,ImageTransform} from 'ngx-image-cropper';
import { Image } from 'src/app/core/model/Image';
import { FileUpload } from 'src/app/core/model/FileUpload';
import { UploadImageService } from 'src/app/features/admin/services/upload-image.service';
import {ActivitiesAchievementsService} from 'src/app/features/admin/pages/upload-activities-achievements/services/activities-achievements.service';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar'
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-activities-achievements-image',
  templateUrl: './add-activities-achievements-image.component.html',
  styleUrls: ['./add-activities-achievements-image.component.css']
})
export class AddActivitiesAchievementsImageComponent implements OnInit {

  isShow:boolean;
  image:Image = new Image();
  ActivityData: any[] = ['Activity','Achievement'];
  imageChangedEvent: any = '';
  croppedImage: any = '';
  scale = 1;
  transform: ImageTransform = {};
  selectedFileName: string = "";
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number;
  image1: File;
  baseUrl:String;
  imageURL:string;
  constructor(private addActAchService:ActivitiesAchievementsService,
    private uploadService: UploadImageService,
    private snakBar:MatSnackBar,private router:Router) { }

  ngOnInit(): void {
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
  addActAch(addActAch:any)
  {
    console.log("Added!!");
    this.image = new Image();
    this.image.imageName = addActAch.imageName;
    this.image.imageDiscription = addActAch.imageDiscription;
    //ama url nakhvi padse tare je avse e
    this.imageURL = localStorage.getItem("imageURL");
    console.log(this.imageURL);
    localStorage.removeItem("imageURL");
    this.image.imagePath = this.imageURL
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var today1 = mm + '-' + dd + '-' + yyyy;
    console.log(today1);
    this.image.uploadDate = today1; 

    this.addActAchService.addImage(this.image)
    .subscribe(data=>{console.log(data);
        this.snakBar.open("successfully Added..","Cancle", {       
            duration : 3000,
            horizontalPosition:'center',
            verticalPosition:"bottom"
          });
        this.router.navigate(['/admin/dashboard/activities-achivements/all-activities-achivements']);  
    },error=>{
      this.handleError(error);
    });
  }

  title = 'angular-image-uploader';

  

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
      this.image1 = this.dataURLtoFile(this.croppedImage, this.selectedFileName);
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
        // alert("Radhe Radhe")
        //setting image whether cropped or not
        const file = this.image1;
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
