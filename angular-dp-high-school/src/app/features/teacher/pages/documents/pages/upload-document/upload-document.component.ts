import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar'
import {Router} from '@angular/router';
import { AuthenticationService } from 'src/app/app-home/services/authentication.service';
import { CoreService } from 'src/app/app-home/services/core.service';
import { TeacherOwnServiceService } from 'src/app/features/teacher/services/teacher-own-service.service';
import { User } from 'src/app/core/model/User';
import { StudyMaterialType } from 'src/app/core/model/StudyMaterialType';
import { Standard } from 'src/app/core/model/Standard';
import { Teacher } from 'src/app/core/model/Teacher';
import { StudyMaterial } from 'src/app/core/model/StudyMaterial';
import {StudyMaterialService} from 'src/app/features/teacher/pages/documents/services/study-material.service'; 
import { FileUpload } from 'src/app/core/model/FileUpload';
import { UploadImageService } from 'src/app/features/admin/services/upload-image.service';


@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.css']
})
export class UploadDocumentComponent implements OnInit {

  constructor(private router:Router,
    private snakBar:MatSnackBar,
    private uploadService: UploadImageService,
    private authService:AuthenticationService,
    private getTecharService:TeacherOwnServiceService,
    private coreService:CoreService,
    private _studyMaterialService:StudyMaterialService,) { }

  studymaterial: StudyMaterial = new StudyMaterial();
  userId:number
  userobj:User;
  UserName:String
  standards:Standard[];
  studyMaterialTypes:StudyMaterialType[];
  teacher:Teacher;
  standard:Standard;
  studyMaterialType:StudyMaterialType;
  studyMaterialType_id:number;

  //file
  imageChangedEvent: any = '';
  selectedFileName: string = "";
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number;
  baseUrl:String;
  imageURL:string;
  
  
  ngOnInit(): void {
    this.getStandardList();
    this.getStudyMaterialTypeList();
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

    let user:string[];
    let username:String;

    user = localStorage.getItem(this.authService.LOCAL_STORAGE_ATTRIBUTE_USERNAME).split(" ");
    username = atob(user[0]);
    //get user
    this.coreService.getUserByUserName(username).subscribe(data=>
      {
        this.userobj = data;
        this.UserName = username;
        this.userId = this.userobj.userId;
        console.log(this.UserName);
        //get teacher
        this.getTecharService.getTeacherByUserName(this.UserName).subscribe(data=>{
          console.log(data);
          this.teacher = data; console.log(this.teacher);
          this.standards = this.teacher.standard; console.log("stnadard list = > "+this.standards);
        },error=>{
          this.handleError(error);
        })
      },error=>{
        this.handleError(error);
      })

    
  }
  //get divisions
  getStudyMaterialTypeList()
  {
    console.log("Division list");
    this._studyMaterialService.getStudyMaterialTypeList()
    .subscribe(data=>{
      console.log(data);
      this.studyMaterialTypes=data;
    },error=>{
      this.handleError(error);
    })
  }

  addDocument(addDocument:any)
  {
    this.studymaterial = new StudyMaterial();
    this.studymaterial.standard = new Standard();
    this.studymaterial.studyMaterialType = new StudyMaterialType();
    this.studymaterial.standard.standardName = addDocument.standard;
    
    if(addDocument.studyMaterialType=="Assignment"){
      this.studyMaterialType_id=1;
    }
    else if(addDocument.studyMaterialType=="Classnotes"){
      this.studyMaterialType_id=3;
    }
    else {
      this.studyMaterialType_id=2;
    }
    this.studymaterial.studyMaterialType.studymaterialTypeId = this.studyMaterialType_id;
    this.imageURL = localStorage.getItem("imageURL");
    console.log(this.imageURL);
    localStorage.removeItem("imageURL");
    this.studymaterial.studymaterialFile = this.imageURL;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var today1 = mm + '-' + dd + '-' + yyyy;
    console.log(today1);
    this.studymaterial.uploadDate = today1;  
    this.studymaterial.description = addDocument.meetingDescription;   

    //call service
    this._studyMaterialService.addStudyMaterial(this.studymaterial)
    .subscribe(data=>{console.log(data)
      this.snakBar.open("successfully Added..","Cancle", {       
        duration : 3000,
        horizontalPosition:'center',
        verticalPosition:"bottom"
      });
      this.router.navigate(['/teacher/study-material/all-study-material']);
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

    upload(): void {
      // alert("Radhe Radhe")
      //setting image whether cropped or not

      const file =  this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      
      this.currentFileUpload = new FileUpload(file);
      this.uploadService.pushFileToStorage(this.currentFileUpload,"/Document_files").subscribe( 
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
