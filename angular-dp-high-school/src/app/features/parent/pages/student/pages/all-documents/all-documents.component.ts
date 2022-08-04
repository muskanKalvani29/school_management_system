import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from 'src/app/app-home/services/authentication.service';
import {CoreService} from 'src/app/app-home/services/core.service';
import {User} from 'src/app/core/model/User';
import {StudyMaterial} from 'src/app/core/model/StudyMaterial';
import {StudyMaterialService} from 'src/app/features/teacher/pages/documents/services/study-material.service'; 
import {Router} from '@angular/router';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-all-documents',
  templateUrl: './all-documents.component.html',
  styleUrls: ['./all-documents.component.css']
})
export class AllDocumentsComponent implements OnInit {

  
  studyMaterials:Observable<StudyMaterial[]>;
  userobj:User;
  UserName:String
  constructor(private _auth:AuthenticationService,
              private _core:CoreService,
              private _studyMaterialService:StudyMaterialService,
              private router : Router) { }

  ngOnInit(): void 
  {
    this.getName();
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
  
  getName()
  {
      let user:string[];
      let username:String;
      let userId:number;
      user = localStorage.getItem(this._auth.LOCAL_STORAGE_ATTRIBUTE_USERNAME).split(" ");
      username = atob(user[0]);
      //get user
      this._core.getUserByUserName(username).subscribe(data=>
        {
          this.userobj = data;
          this.UserName = username;
          userId = this.userobj.userId;
          console.log(this.UserName);
          this.studyMaterials=this._studyMaterialService.getStudyMaterialByParent(userId,0); 

        },error=>{
          this.handleError(error);
        })
    }
    viewDocument(document_id:number)
    {
      console.log("view");
      this.router.navigate(['/parent/student/home/document/all-documents/view-document',document_id]);
    }
    
}











  
