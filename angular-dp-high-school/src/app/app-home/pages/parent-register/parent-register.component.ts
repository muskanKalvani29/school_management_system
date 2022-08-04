import { Component, OnInit } from '@angular/core';
import {CoreService} from 'src/app/app-home/services/core.service';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar';
import {Router,ActivatedRoute} from '@angular/router';
import { Parent } from 'src/app/core/model/Parent';
import { User } from 'src/app/core/model/User';
import { UserServiceService } from 'src/app/features/admin/services/user-service.service';
import { UserType } from 'src/app/core/model/UserType';
import { Student } from 'src/app/core/model/Student';
@Component({
  selector: 'app-parent-register',
  templateUrl: './parent-register.component.html',
  styleUrls: ['./parent-register.component.css']
})
export class ParentRegisterComponent implements OnInit {

  parent: Parent = new Parent();
  user1: User = new User();
  grNo:number
  isUsernameExist: boolean;
  user_Id:number;
  userForId:User;
  show1: boolean=false;
  show2: boolean=false;
  password:String;
  confirmpassword:String;
  constructor(private addUserservice: CoreService,private snakBar:MatSnackBar,private router:Router,private route:ActivatedRoute,
    private saveUserService:UserServiceService) { }

  ngOnInit(): void 
  {
    this.grNo = this.route.snapshot.params['grNo'];
    console.log(this.grNo)
  }
  toggleShow1()
   {
     console.log(this.show1);
    this.show1 = !this.show1;
   }  
   toggleShow2()
   {
     console.log(this.show2);
    this.show2 = !this.show2;
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


  addParent(addParent:any,user:any,contactNo1:any,emailId:any,name:any,password:any,password3:any,userName:any,contactNo2:any,occupation:any,qualification:any)
  {
    //chack username
    console.log(user["viewModel"])
    this.addUserservice.getUser(user["viewModel"]).subscribe(data=>{
      this.isUsernameExist=data;
      console.log(data); console.log(this.isUsernameExist); 
      if(this.isUsernameExist)
      {
        this.snakBar.open("User Name Should be Unique..","Cancle", {       
          duration : 3000,
          horizontalPosition:'center',
          verticalPosition:"bottom"
        });
        this.router.navigate(['/sms/home/signUp/parent',this.grNo]);
      }
      else
      {
        this.password = password["viewModel"];
        this.confirmpassword = password3["viewModel"];
        if(this.password == this.confirmpassword)
        {
          this.user1 = new User();
          this.user1.userType = new UserType();
          this.user1.contactNo1 = contactNo1["viewModel"];
          this.user1.emailId = emailId["viewModel"];
          this.user1.name = name["viewModel"];
          this.user1.password = password["viewModel"];
          this.user1.userName = userName["viewModel"];
          this.user1.userType.usertypeId = 2;
          this.saveUserService.addUser(this.user1).subscribe(data=>{
            console.log(data);
            //get parent by id
            this.addUserservice.getUserByUserName(this.user1.userName).subscribe(data=>{
              this.userForId = data;
              this.user_Id = this.userForId.userId;
              console.log(this.user_Id);
                this.parent = new Parent();
                this.parent.student = new Student();
                this.parent.user = new User();
                this.parent.contactNo2 = contactNo2["viewModel"];
                this.parent.occupation = occupation["viewModel"];
                this.parent.qualification = qualification["viewModel"];
                this.parent.student.grNo = this.grNo;
                this.parent.user.userId = this.user_Id;
                this.addUserservice.addParent(this.parent).subscribe(data=>{
                  console.log(this.parent);
                  this.snakBar.open("Successfuly Registerd in the System..","Cancle", {       
                    duration : 3000,
                    horizontalPosition:'center',
                    verticalPosition:"bottom"
                  });
                  this.router.navigate(['/sms/home']);
                },error=>{
                  this.handleError(error);
                })
               
            })
          },error=>{
            this.handleError(error);
          })
     
        }
        else
         {
          this.snakBar.open("Both Password must be same..","Cancle", {       
            duration : 4000,
            horizontalPosition:'center',
            verticalPosition:"bottom"
          });
          this.router.navigate(['/sms/home/signUp/parent',this.grNo]);
         }
        }
    
    },error=>{
      this.handleError(error);
    })}
}
