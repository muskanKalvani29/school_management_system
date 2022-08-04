import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from 'src/app/app-home/services/authentication.service';
import {CoreService} from 'src/app/app-home/services/core.service';
import {User} from 'src/app/core/model/User';
import {ResultFile} from 'src/app/core/model/ResultFile';
import {ResultService} from 'src/app/features/teacher/pages/results/services/result.service'; 
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-all-results',
  templateUrl: './all-results.component.html',
  styleUrls: ['./all-results.component.css']
})
export class AllResultsComponent implements OnInit {

  resultfiles:Observable<ResultFile[]>;
  userobj:User;
  UserName:String
  constructor(private _auth:AuthenticationService,
              private _core:CoreService,
              private _resultService:ResultService,
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
          this.resultfiles=this._resultService.getResultFilesListParent(userId,0); 

        },error=>{
          this.handleError(error);
        })
    }
    viewResultFile(resultfile_id:number)
    {
      console.log("view");
      this.router.navigate(['/parent/student/home/result/all-results/view-result',resultfile_id]);
    }

}







  
  












  

