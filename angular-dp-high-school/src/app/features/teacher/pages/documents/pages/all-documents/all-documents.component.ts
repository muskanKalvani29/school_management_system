import { Component, OnInit } from '@angular/core';
import {StudyMaterial} from 'src/app/core/model/StudyMaterial';
import {StudyMaterialService} from 'src/app/features/teacher/pages/documents/services/study-material.service'; 
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar'
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/features/DialogBox/dialog-box/dialog-box.component';
import { AuthenticationService } from 'src/app/app-home/services/authentication.service';
import { CoreService } from 'src/app/app-home/services/core.service';
import { TeacherOwnServiceService } from 'src/app/features/teacher/services/teacher-own-service.service';
import { User } from 'src/app/core/model/User';
import { Standard } from 'src/app/core/model/Standard';
import { Teacher } from 'src/app/core/model/Teacher';
import { UploadImageService } from 'src/app/features/admin/services/upload-image.service';

@Component({
  selector: 'app-all-documents',
  templateUrl: './all-documents.component.html',
  styleUrls: ['./all-documents.component.css']
})
export class AllDocumentsComponent implements OnInit {
  studyMaterials:Array<StudyMaterial>=new Array();
  userobj:User;
  UserName:String;
  userId:number;
  page:number=0
  pages:Array<Number>
  totalPages:Number;
  statusNext:boolean=true
  statusPre:boolean = true
  selectedstd:any;

  standards:Standard[];
  teacher:Teacher;
  studyMaterialData: StudyMaterial;

  constructor(private router : Router,private dialog:MatDialog,private snakBar:MatSnackBar,
    private authService:AuthenticationService,
    private getTecharService:TeacherOwnServiceService,
    private coreService:CoreService,
    private deleteimageService: UploadImageService,
    private _studyMaterialService:StudyMaterialService,
              ) { }

  ngOnInit(): void 
  { 
    this.getStandardList();
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
    this.getDocumentByStdAndDiv();
  }
  pre()
  {
    console.log("page"+this.page)
    if(this.page==0) {this.statusPre=true; }
    else{this.statusPre=false;this.page=this.page.valueOf()-1;
      this.getDocumentByStdAndDiv();}
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
      this.getDocumentByStdAndDiv();}
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
          this.standards = this.teacher.standard;
         console.log("stnadard list = > "+this.standards);
        },error=>{
          this.handleError(error);
        })
      },error=>{
        this.handleError(error);
      })
  }
  deleteDocument(documentId:number)
    {
      console.log("delete");
      this.dialog.open(DialogBoxComponent).afterClosed().subscribe(data=>{
        console.log(data.delete)
      if(data.delete)
      { 

        this.studyMaterialData = new StudyMaterial();
        
        this._studyMaterialService.getStudyMaterial(documentId)
        .subscribe(data=>{
          console.log(data);
          this.studyMaterialData = data;
          console.log(this.studyMaterialData.studymaterialFile);
          this.deleteimageService.delete(this.studyMaterialData.studymaterialFile);
        },error=>{
          this.handleError(error);
        })

          console.log("delete");
          this._studyMaterialService.deleteStudyMaterial(documentId)
          .subscribe(data=>{
            console.log(data);
            this.router.navigate(['/teacher/home']);
            this.snakBar.open("successfully Deleted..","Cancle", {       
              duration : 3000,
              horizontalPosition:'center',
              verticalPosition:"bottom"
            });
            //navigate to list
          },error=>{
            this.handleError(error);
          });
        }
      },error=>{
        this.handleError(error);
      })
    }


    changestd(e)
    {
      console.log(e.target.value); 
      this.selectedstd = e.target.value; console.log(this.selectedstd);
      console.log(this.selectedstd[0]);
    }

    getDocumentByStdAndDiv()
    {
     if(this.selectedstd)
     {
        this._studyMaterialService.getStudyMaterialByStandard(this.selectedstd,0).subscribe(data=>{
          this.studyMaterials = data['content'] ; console.log(this.studyMaterials);
            //items per page mate che..
            this.totalPages = data['totalPages'] 
            console.log("total Pages =>"+this.totalPages)
            if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
            else{this.statusNext=false}
            if(this.page==0) {this.statusPre=true; }
            else{this.statusPre=false;}
            this.pages= new Array(data['totalPages'])
            this.router.navigate(['/teacher/study-material/all-study-material']);
        },error=>{
          this.handleError(error);
        })
     }
     else
     {
       console.log("nothing");
       this.router.navigate(['/teacher/study-material/all-study-material']);
     }
   }

  //update meeting to navigate
  updateDocument(meetingId:number)
  {
    console.log("update");
    this.router.navigate(['teacher/study-material/all-study-material/update-study-material',meetingId]);
  }

    viewDocument(document_id:number)
    {
      console.log("view");
      this.router.navigate(['/teacher/study-material/all-study-material/view-study-material',document_id]);
    }
    
}











  

