import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/app-home/services/authentication.service';
import { CoreService } from 'src/app/app-home/services/core.service';
import {FeePayment} from 'src/app/core/model/FeePayment';
import { Parent } from 'src/app/core/model/Parent';
import { Student } from 'src/app/core/model/Student';
import { User } from 'src/app/core/model/User';
import {FeesServiceService} from 'src/app/features/admin/pages/fees/service/fees-service.service';
import { ParentOwnServiceService } from 'src/app/features/parent/services/parent-own-service.service';

@Component({
  selector: 'app-pay-fees',
  templateUrl: './pay-fees.component.html',
  styleUrls: ['./pay-fees.component.css']
})
export class PayFeesComponent implements OnInit {

  //paymentModeData: any[] = ['Online','Offline'];
  feeStatusData: any[] = ['Paid','Unpaid'];
  feepayment : FeePayment = new FeePayment();
  userId:number;
  userobj:User;
  UserName:String;
  
  parent:Parent;
  user:User;
  gr_no:number;
  showerror:Boolean=false

  constructor(private feesService : FeesServiceService,
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
        this.gr_no=this.parent.student.grNo;
        console.log(this.gr_no);
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
  addFeePayment(addFeePayment:any)
  {
    if(this.gr_no==addFeePayment.student){
      console.log("fee");
        this.feepayment = new FeePayment();
        this.feepayment.student = new Student();
        this.feepayment.student.grNo =  addFeePayment.student;
        this.feepayment.paymentMode = "Online";
        this.feepayment.feesAmount = addFeePayment.feesAmount;
        
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var today1 = mm + '-' + dd + '-' + yyyy;
        console.log(today1);
        
        this.feepayment.paymentDate = today1;
        this.feepayment.installmentNo = addFeePayment.InstallmentNo;

        window.location.href = "http://localhost:8080/sms/redirect-paytm?amount="+this.feepayment.feesAmount 
      
        this.feesService.addOnlineFeePayment(this.feepayment)
        .subscribe(data=>{console.log(data)},error=>{
          this.handleError(error);
        });
      }
      else{
          this.showerror=true;
      }
  }
  
}
