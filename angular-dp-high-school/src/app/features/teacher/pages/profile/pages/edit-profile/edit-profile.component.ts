
import { Component, OnInit } from '@angular/core';
import { FileUpload } from 'src/app/core/model/FileUpload';
import { UploadImageService } from 'src/app/features/admin/services/upload-image.service';
import {Teacher} from 'src/app/core/model/Teacher';
import {TeacherOwnServiceService} from 'src/app/features/teacher/services/teacher-own-service.service';
import {AuthenticationService} from 'src/app/app-home/services/authentication.service';
import {CoreService} from 'src/app/app-home/services/core.service';
import {Router,ActivatedRoute} from '@angular/router';
import { User } from 'src/app/core/model/User';
import {MatSnackBar} from '@angular/material/snack-bar'
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  userId:number
  userobj:User;
  UserName:String;
  teacher:Teacher;
  teacherId: number;
  imagePath:String;
  genderdata: any[] = ['Male','Female'];
  //image
  imageChangedEvent: any = '';
  selectedFileName: string = "";
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number;
  baseUrl:String;
  imageURL:string;
  isUpload : boolean=false;
  url : String;
  getJdate: String;

  constructor(private authService:AuthenticationService,
    private getTecharService:TeacherOwnServiceService,
    private coreService:CoreService,private uploadService: UploadImageService,
    private router : Router,
    private snakBar:MatSnackBar) { }

  ngOnInit(): void {
    this.getName();

  }
  handleError(error)
    {
    console.log("status code..");  
    console.log(error);
    // if(error==404)
    // {
    //   console.log("hi")
    //   this.router.navigate(['/page-not-found']);
    // }
    // else if(error==500)
    // {
    //   console.log("hi")
    //   this.router.navigate(['/internal-server-error']);
    // }
    // else
    // {
    //   console.log("hi")
    //   this.router.navigate(['/error-page']);
    // }
  }
  getName()
  {
    let user:string[];
    let username:String;

    user = localStorage.getItem(this.authService.LOCAL_STORAGE_ATTRIBUTE_USERNAME).split(" ");
    username = atob(user[0]);
    //get user
    this.coreService.getUserByUserName(username).subscribe(data=>
      {
        this.userobj = data;
        // this.UserName = username;
        this.UserName = this.userobj.userName;
        this.userId = this.userobj.userId;
        console.log(this.UserName);
        //get teacher
        this.teacher = new Teacher();
        this.getTecharService.getTeacherByUserName(this.UserName).subscribe(data=>{
          console.log(data);
          this.teacher = data; console.log(this.teacher);
          this.getJdate = this.teacher.joiningDate;
          if(this.teacher.image==null || this.teacher.image=="")
          {
            this.imagePath="../../../../assets/img/figure/user.jpg";
            this.url=this.teacher.image;
            console.log("in get => "+this.url);
          }
          else{
            this.imagePath=this.teacher.image;
            this.url=this.teacher.image;
            console.log("image=>"+this.imagePath);
          }
      },error=>{
        this.handleError(error);
      })    
    },error=>{
      this.handleError(error);
    })
  }

  onSubmit()
  {
    console.log("form update");
    this.updateAccount();
  }

  updateAccount()
  {
    if(this.isUpload==true){
      this.teacher.image=localStorage.getItem("imageURL");
      console.log("image url => "+this.teacher.image);
      console.log(this.teacher);
      localStorage.removeItem("imageURL");
    }
    else{
      this.teacher.image = this.url;
    }
    console.log("teacher outside if");
    console.log(this.teacher);
    if(this.teacher.joiningDate != this.getJdate)
    {
      let getMDate:String = this.teacher.joiningDate;
      let splitMDate:String[] = getMDate.split("-");
      let concateMDate = splitMDate[1] + "-" + splitMDate[2] + "-" + splitMDate[0];
      this.teacher.joiningDate = concateMDate;
    }
    this.getTecharService.updateTeacher(this.UserName,this.teacher)
    .subscribe(data=>{
      //update username
      // this.usernameForLocalStorage = this.UserName;
      // localStorage.removeItem(this.LOCAL_STORAGE_ATTRIBUTE_USERNAME);
      // localStorage.setItem(this.LOCAL_STORAGE_ATTRIBUTE_USERNAME,btoa(this.UserName)+" "+btoa())
      console.log(data);
      // this.teacher = new Teacher();
      console.log("hi");
      this.router.navigate(['/teacher/home']);
      // this.router.navigate(['/teacher/home']);
      this.snakBar.open("successfully Updated..","Cancle", {       
        duration : 3000,
        horizontalPosition:'center',
        verticalPosition:"bottom"
      });
      // this.router.navigate(['admin/dashboard/activities-achivements/all-activities-achivements']);
    },error=>{
      this.handleError(error);
    })

   
  }

  RefreshPage()
  {
    console.log("refresh page");
    this.router.navigate(['/teacher/profile/edit-profile'])
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
    console.log("in upload method"+this.url)
    if(this.url!=null){
      console.log("deleted");
      this.uploadService.delete(this.url);
      console.log(this.url);
    }
      
    
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    
    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload,"/teacher").subscribe( 
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
