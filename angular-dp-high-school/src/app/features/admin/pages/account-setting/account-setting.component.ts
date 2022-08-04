import { Component, OnInit } from '@angular/core';
import {Admin} from 'src/app/core/model/Admin';
import {AdminServiceService} from 'src/app/features/admin/services/admin-service.service';
import {AuthenticationService} from 'src/app/app-home/services/authentication.service';
import {UserServiceService} from 'src/app/features/admin/services/user-service.service';
import {CoreService} from 'src/app/app-home/services/core.service';
import {Router,ActivatedRoute} from '@angular/router';
import { User } from 'src/app/core/model/User';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar'

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.css']
})
export class AccountSettingComponent implements OnInit {

  adminId:number;
  admin: Admin
  userId:number
  userobj:User;
  UserName:String
  genderdata: any[] = ['Male','Female'];
  getJdate: String;
  constructor(private getAdminService:AdminServiceService,
              private authService:AuthenticationService,
              private coreService:CoreService,
              private userServce:UserServiceService,
              private router : Router,
              private route : ActivatedRoute,
              private snakBar:MatSnackBar) { }

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
      },error=>{
        this.handleError(error);
      })

      //get data from admin object //get data from user 
      this.getAdminService.getAdmin(username)
      .subscribe(data=>{
        this.admin = data;
        this.getJdate = this.admin.joiningDate;
        this.adminId = this.admin.adminId;
        console.log(data)},error=>{
          this.handleError(error);
        });
  }

  onSubmit()
  {
    console.log("form update");
    this.updateAccount();
  }
  updateAccount()
  {
    if(this.admin.joiningDate != this.getJdate)
    {
      let getMDate:String = this.admin.joiningDate;
    let splitMDate:String[] = getMDate.split("-");
    let concateMDate = splitMDate[1] + "-" + splitMDate[2] + "-" + splitMDate[0];
    this.admin.joiningDate = concateMDate;
    }
    this.getAdminService.updateAdmin(this.UserName,this.admin)
    .subscribe(data=>{
      console.log(data);
      this.admin = new Admin();
      console.log("hi");
      this.snakBar.open("successfully Updated..","Cancle", {       
        duration : 3000,
        horizontalPosition:'center',
        verticalPosition:"bottom"
      });
      this.RefreshPage();
    },error=>{
      this.handleError(error);
    })

    // this.userServce.updateUser(this.userId,this.userobj)
    // .subscribe(data=>{console.log(data)});
    
  }

  RefreshPage()
  {
    console.log("refresh page");
    this.router.navigate(['admin/dashboard'])
  }
}
