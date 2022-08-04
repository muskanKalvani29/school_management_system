import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {Parent} from 'src/app/core/model/Parent';
import {ParentOwnServiceService} from 'src/app/features/parent/services/parent-own-service.service';
import {AuthenticationService} from 'src/app/app-home/services/authentication.service';
import {CoreService} from 'src/app/app-home/services/core.service';
import {User} from 'src/app/core/model/User';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit { 
  userId:number
  userobj:User;
  UserName:String;
  
  parent:Parent;
  user:User;

  constructor(private router:Router,
    private route : ActivatedRoute,
    private _parentOwnService:ParentOwnServiceService,
    private _auth:AuthenticationService,
     private _core:CoreService,
             
    ) { }

   

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
  goToHome()
  {
    this.router.navigate(['/parent/home']);
  }
}






    

 


