import { Component, OnInit } from '@angular/core';
import {FeePayment} from 'src/app/core/model/FeePayment';
import { Student } from 'src/app/core/model/Student';
import {FeesServiceService} from 'src/app/features/admin/pages/fees/service/fees-service.service';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar'
import {Router,ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-add-fee',
  templateUrl: './add-fee.component.html',
  styleUrls: ['./add-fee.component.css']
})
export class AddFeeComponent implements OnInit {

  paymentModeData: any[] = ['Online','Offline'];
  feeStatusData: any[] = ['Paid','Unpaid'];
  constructor(private feesService : FeesServiceService,private router:Router,private snakBar:MatSnackBar) { }
  feepayment : FeePayment = new FeePayment();

  ngOnInit(): void 
  {}
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
    console.log("fee");
    this.feepayment = new FeePayment();
    this.feepayment.student = new Student();
    this.feepayment.student.grNo =  addFeePayment.student;
    this.feepayment.paymentMode = addFeePayment.paymentMode;
    this.feepayment.feesAmount = addFeePayment.feesAmount;
    let getFeePaymentDate:String = addFeePayment.paymentDate;
    let splitPaymentDate:String[] = getFeePaymentDate.split("-");
    let concatPaymentDate = splitPaymentDate[1] + "-" + splitPaymentDate[2] + "-" + splitPaymentDate[0];
    this.feepayment.paymentDate = concatPaymentDate;
    this.feepayment.installmentNo = addFeePayment.InstallmentNo;

    //call service
    this.feesService.addFeePayment(this.feepayment)
    .subscribe(data=>{console.log(data)
      this.snakBar.open("successfully Added..","Cancle", {       
        duration : 3000,
        horizontalPosition:'center',
        verticalPosition:"bottom"
      });
      this.router.navigate(['/admin/fees/fee-details']);
    },error=>{
      this.handleError(error);
    });
  }
}
