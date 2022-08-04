import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar'
import {ActivatedRoute, Router} from '@angular/router';
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
  selector: 'app-update-document',
  templateUrl: './update-document.component.html',
  styleUrls: ['./update-document.component.css']
})

export class UpdateDocumentComponent implements OnInit {

  constructor(private router:Router,
    private snakBar:MatSnackBar,
    private route : ActivatedRoute,
    private uploadService: UploadImageService,
    private authService:AuthenticationService,
    private getTecharService:TeacherOwnServiceService,
    private coreService:CoreService,
    private _studyMaterialService:StudyMaterialService,) { }

  studymaterialId : number;
  studymaterial: StudyMaterial;
  userId:number
  userobj:User;
  UserName:String
  standards:Standard[];
  studyMaterialTypes:StudyMaterialType[];
  teacher:Teacher;

  //file
  imageChangedEvent: any = '';
  selectedFileName: string = "";
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number;
  baseUrl:String;
  imageURL:string;
  isUpload : boolean=false;
  url : String;
  
  ngOnInit(): void {
    this.getStandardList();
    this.getStudyMaterialTypeList();
    this.studymaterial = new StudyMaterial();
    this.studymaterialId = this.route.snapshot.params['document_id'];
    this._studyMaterialService.getStudyMaterial(this.studymaterialId)
    .subscribe(data=>{
      console.log(data);
      this.studymaterial = data;
      this.url=this.studymaterial.studymaterialFile;
      console.log(this.studymaterial.studymaterialFile);
    },error=>{
      this.handleError(error);
    });
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

  updatedocument()
  {
    if(this.isUpload==true){
      this.studymaterial.studymaterialFile=localStorage.getItem("imageURL");
      localStorage.removeItem("imageURL");
    }
    else{
      this.studymaterial.studymaterialFile=this.url;
    }
  
    console.log(this.studymaterial.studymaterialFile);
    this._studyMaterialService.updateStudyMaterial(this.studymaterialId,this.studymaterial)
    .subscribe(data=>{
      console.log(data);
      this.studymaterial = new StudyMaterial();
      console.log("hi");
      this.snakBar.open("successfully Updated..","Cancle", {       
        duration : 3000,
        horizontalPosition:'center',
        verticalPosition:"bottom"
      });
      this.goToDocumentList();
    },error=>{
      this.handleError(error);
    })
  }

  //onsubmit
  onSubmit()
  {
    console.log("form update");
    this.updatedocument();
  }

  //get back to List
  goToDocumentList()
  {
    console.log("go to");
    this.router.navigate(['teacher/study-material/all-study-material']);
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
    console.log("delete url")
    console.log(this.url);
    const file = this.selectedFiles.item(0);
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

