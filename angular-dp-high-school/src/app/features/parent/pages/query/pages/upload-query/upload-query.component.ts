import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/app-home/services/authentication.service';
import { CoreService } from 'src/app/app-home/services/core.service';
import { Parent } from 'src/app/core/model/Parent';
import {User} from 'src/app/core/model/User';
import {Query} from 'src/app/core/model/Query';
import {QueryServiceService} from 'src/app/features/admin/pages/query/service/query-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ParentOwnServiceService } from 'src/app/features/parent/services/parent-own-service.service';

@Component({
  selector: 'app-upload-query',
  templateUrl: './upload-query.component.html',
  styleUrls: ['./upload-query.component.css']
})
export class UploadQueryComponent implements OnInit {

  userId:number
  userobj:User;
  UserName:String;
  ParentId: number;
  parent:Parent;
  user:User;
  query:Query;
  parentobj:Parent;

  constructor(private queryService : QueryServiceService,
    private route : ActivatedRoute,
    private _parentOwnService:ParentOwnServiceService,
    private _auth:AuthenticationService,
     private _core:CoreService,private router:Router) { }

     ngOnInit(): void {
  
      let user:string[];
      let username:String;
  
      user = localStorage.getItem(this._auth.LOCAL_STORAGE_ATTRIBUTE_USERNAME).split(" ");
      username = atob(user[0]);
      //get user
      this._core.getUserByUserName(username).subscribe(data=>
      {
            this.userobj = data;
            this.UserName = username;
            this.userId = this.userobj.userId;
            console.log(this.UserName);
            this.user=data;
          },error=>{
            this.handleError(error);
          })
  
          this.parent = new Parent();
          this.user=new User();
          this._parentOwnService.viewParentByUsername(username)
          .subscribe(data=>{
            console.log(data);
            this.parent = data;
            console.log(parent);
            this.ParentId= this.parent.parentId;
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
  addQuery(addQuery:any)
  {
    this.query = new Query();
    this.query.parent = new Parent();
    console.log("-----"+this.ParentId+"------");
    this.query.parent.parentId = this.ParentId;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var today1 = mm + '-' + dd + '-' + yyyy;
    console.log(today1);
    this.query.uploadDate = today1;
    this.query.queryMessage = addQuery.queryMessage;
    this.queryService.addQueryResponse(this.query).
    subscribe(data=>{console.log(data)},error=>{
      this.handleError(error);
    });
    
  }
}





