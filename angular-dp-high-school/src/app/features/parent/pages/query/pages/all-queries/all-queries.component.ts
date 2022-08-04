import { Component, OnInit } from '@angular/core';
import {Query} from 'src/app/core/model/Query';
import {QueryServiceService} from 'src/app/features/admin/pages/query/service/query-service.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {AuthenticationService} from 'src/app/app-home/services/authentication.service';
import {CoreService} from 'src/app/app-home/services/core.service';
import {User} from 'src/app/core/model/User';
import {Parent} from 'src/app/core/model/Parent'


@Component({
  selector: 'app-all-queries',
  templateUrl: './all-queries.component.html',
  styleUrls: ['./all-queries.component.css']
})
export class AllQueriesComponent implements OnInit {

  queries:Observable<Query[]>;
  parent:Parent;
  userobj:User;
  UserName:String


  constructor(private _auth:AuthenticationService,
    private _core:CoreService,
    private _querySerive:QueryServiceService,
    private router : Router) { }

  ngOnInit(): void {
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
    //get user and parent id
      let user:string[];
      let username:String;
      let userId:number;
      let parentId:number;

      user = localStorage.getItem(this._auth.LOCAL_STORAGE_ATTRIBUTE_USERNAME).split(" ");
      username = atob(user[0]);
      this._core.getUserByUserName(username).subscribe(data=>
      {
          this.userobj = data;
          this.UserName = username;
          userId = this.userobj.userId;
          console.log(this.UserName);
        
          // this._parentService.viewParentByUsername(this.UserName).subscribe(data=>
          //   {
          //     this.parent = data;
          //     parentId=this.parent.parentId;

          this.queries=this._querySerive.getQueryByParentId(userId,0); 
    },error=>{
      this.handleError(error);
    })
  }

  viewQuery(query_id:number)
  {
    console.log("view");
    this.router.navigate(['/parent/query/all-queries/view-query',query_id]);
  }
}

   
  


