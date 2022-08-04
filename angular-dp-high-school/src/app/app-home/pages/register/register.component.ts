import { Component, OnInit } from '@angular/core';
import { TeacherRequest } from 'src/app/core/model/TeacherRequest';
import {CoreService} from 'src/app/app-home/services/core.service';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import { StudentServiceService } from 'src/app/features/admin/pages/student/service/student-service.service';
import { Student } from 'src/app/core/model/Student';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  teacherRequest: TeacherRequest = new TeacherRequest();
  isUsernameExist:boolean;
  isValidGrNo:boolean;
  isRegisterParent:boolean;
  student : Student = new Student();
  show1: boolean=false;
  show2: boolean=false;
  password:String;
  confirmpassword:String;
  constructor(private addUserservice: CoreService,private snakBar:MatSnackBar,private router:Router,
    private getStudentService:StudentServiceService) { }

  ngOnInit(): void 
  {

    this.loadScript("../../../../assets/JS/modernizr-3.6.0.min.js");
    this.loadScript("../../../../assets/JS/jquery-3.5.1.js");
    // this.loadScript("node_modules/bootstrap/dist/js/bootstrap.min.js");
    this.loadScript("../../../../assets/JS/jquery-3.5.1.js");
    this.loadScript("../../../../assets/JS/rsmenu-main.js");
    this.loadScript("../../../../assets/JS/isotope.pkgd.min.js");
    this.loadScript("../../../../assets/JS/wow.min.js");
    this.loadScript("../../../../assets/JS/jquery.counterup.min.js");
    this.loadScript("../../../../assets/JS/jquery.waypoints.min.js");
    this.loadScript("../../../../assets/JS/jquery.magnific-popup.min.js");
    this.loadScript("../../../../assets/JS/plugins.js");
    this.loadScript("../../../../assets/JS/contact.form.js");
    this.loadScript("../../../../assets/JS/main2.js");
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

  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  addteacherRequest(addteacherRequest:any)
  {
    //get user by user name
    this.addUserservice.getUser(addteacherRequest.userName).subscribe(data=>{
      this.isUsernameExist=data;
      // this.isCallService = this.isUsernameExist;
      console.log(data); console.log(this.isUsernameExist); 
      if(this.isUsernameExist)
      {
        this.snakBar.open("User Name Should be Unique..","Cancle", {       
          duration : 3000,
          horizontalPosition:'center',
          verticalPosition:"bottom"
        });
        this.router.navigate(['/sms/home/signUp']);
      }
      else
        {
          this.password = addteacherRequest.password;
          this.confirmpassword = addteacherRequest.password1;
          if(this.password == this.confirmpassword)
          {
            this.teacherRequest = new TeacherRequest();
            this.teacherRequest.name = addteacherRequest.name;
            this.teacherRequest.emailId = addteacherRequest.emailId;
            this.teacherRequest.contactNo1 = addteacherRequest.contactNo1;
            this.teacherRequest.userName = addteacherRequest.userName;
            this.teacherRequest.password = addteacherRequest.password;
          this.addUserservice.addTeacherRequest(this.teacherRequest).
          subscribe(data=>{console.log(data)
            this.snakBar.open("You will get an Email when you are eligible to login into System..","Cancle", {       
              duration : 4000,
              horizontalPosition:'center',
              verticalPosition:"bottom"
            });
          },error=>{
            this.handleError(error);
          });
          this.router.navigate(['/sms/home']);
          }
         else
         {
          this.snakBar.open("Both Password must be same..","Cancle", {       
            duration : 4000,
            horizontalPosition:'center',
            verticalPosition:"bottom"
          });
          this.router.navigate(['/sms/home/signUp']);
         }
        }
        
    },error=>{
      this.handleError(error);
    })
   
  
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

  isGrNo(isGrNo:any)
  {
    console.log(isGrNo["viewModel"]);
    var gr = isGrNo["viewModel"]
    this.getStudentService.getStudent(gr).subscribe(data=>{
      this.isValidGrNo = true;
      console.log(this.isValidGrNo);
      this.addUserservice.getParentAndStudentByGrNo(gr).subscribe(data=>{
        if(data==true)
        {
          this.router.navigate(['/sms/home/signUp/parent',gr]);
        console.log(data);
        }
        else
        {
          this.snakBar.open("Parent of this student is already Registerd in System..","Cancle", {       
            duration : 3000,
            horizontalPosition:'center',
            verticalPosition:"bottom"
          });
          this.router.navigate(['/sms/home']);
        }
      },error=>{
        this.snakBar.open("You have already Registerd in the System..","Cancle", {       
          duration : 4000,
          horizontalPosition:'center',
          verticalPosition:"bottom"
        });
        this.router.navigate(['/sms/home']);
      })
    },error=>{
      this.isValidGrNo = false;
      console.log(this.isValidGrNo);
      this.snakBar.open("Please Enter valid GR No..","Cancle", {       
        duration : 3000,
        horizontalPosition:'center',
        verticalPosition:"bottom"
      });
      this.router.navigate(['/sms/home/signUp']);
    })
  }
}
