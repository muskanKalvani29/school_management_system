import { Component, OnInit } from '@angular/core';
import {Admin} from 'src/app/core/model/Admin';
import {Parent} from 'src/app/core/model/Parent';
import {ParentOwnServiceService} from 'src/app/features/parent/services/parent-own-service.service';
import {AdminServiceService} from 'src/app/features/admin/services/admin-service.service';
import {AuthenticationService} from 'src/app/app-home/services/authentication.service';
import {UserServiceService} from 'src/app/features/admin/services/user-service.service';
import {CoreService} from 'src/app/app-home/services/core.service';
import {Router,ActivatedRoute} from '@angular/router';
import { User } from 'src/app/core/model/User';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  adminId:number;
  admin: Admin
  userId:number
  userobj:User;
  UserName:String
  ParentId: number;
  parent:Parent;
  user:User;
    
  constructor(private getAdminService:AdminServiceService,
              private authService:AuthenticationService,
              private coreService:CoreService,
              private userServce:UserServiceService,
              private _parentOwnService:ParentOwnServiceService,
              private router : Router,
              private route : ActivatedRoute) { }
  ngOnInit(): void 
  {
    console.log("on init");
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

    user = localStorage.getItem(this.authService.LOCAL_STORAGE_ATTRIBUTE_USERNAME).split(" ");
    username = atob(user[0]);
    //get user
    this.coreService.getUserByUserName(username).subscribe(data=>
      {
        this.userobj = data;
        this.UserName = username;
        this.userId = this.userobj.userId;
        console.log(this.UserName);
        this.user=data;
      },error=>{
        this.handleError(error);
      })

      //get data from admin object //get data from user 
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
    onSubmit()
  {
    console.log("form update");
    this.updateAccount();
  }
  updateAccount()
  {
    this._parentOwnService.updateParentByUserName(this.UserName,this.parent)
    .subscribe(data=>{
      console.log(data);
      this.parent = new Parent();
      console.log("hi");
    },error=>{
      this.handleError(error);
    })

    // this.userServce.updateUser(this.userId,this.userobj)
    // .subscribe(data=>{console.log(data)});
    this.RefreshPage();
  }

  RefreshPage()
  {
    console.log("refresh page");
    this.router.navigate(['/parent/profile/edit-profile'])
  }
}

           
  
              





  

 

