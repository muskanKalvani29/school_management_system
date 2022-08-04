import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FeesServiceService} from 'src/app/features/admin/pages/fees/service/fees-service.service';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar'
@Component({
  selector: 'app-change-fee-status',
  templateUrl: './change-fee-status.component.html',
  styleUrls: ['./change-fee-status.component.css']
})
export class ChangeFeeStatusComponent implements OnInit {

  feeStatus:String;
  status:String="Unpaid";
  constructor(private snakBar:MatSnackBar,private updateFeeService:FeesServiceService,private router : Router) { }


  ngOnInit(): void {}
  handleError(error)
    {
    console.log("status code..");  
    console.log(error);
    if(error==404)
    {
      console.log("hi")
      this.router.navigate(['/page-not-found']);
    }
    else if(error==200)
  {
    this.snakBar.open("successfully Changed..","Cancle", {       
      duration : 3000,
      horizontalPosition:'center',
      verticalPosition:"bottom"
    });
    this.router.navigate(['/admin/dashboard'])
    console.log(error);
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
  updateStatus()
  {
    console.log("hi fee status update");  
    this.updateFeeService.updateFeeStatusAllStudent("Unpaid").subscribe(data=>{
      console.log(data);
      this.snakBar.open("successfully Updated..","Cancle", {       
        duration : 3000,
        horizontalPosition:'center',
        verticalPosition:"bottom"
      });
    },error=>{
      this.handleError(error);
    })
  }
}
