import { Component, OnInit } from '@angular/core';
import {FeePayment} from 'src/app/core/model/FeePayment';
import {FeesServiceService} from 'src/app/features/admin/pages/fees/service/fees-service.service';
import {Router,ActivatedRoute} from '@angular/router'
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar'

@Component({
  selector: 'app-update-fee-detail',
  templateUrl: './update-fee-detail.component.html',
  styleUrls: ['./update-fee-detail.component.css']
})
export class UpdateFeeDetailComponent implements OnInit {

  paymentId: number;
  feepayment: FeePayment;
  paymentModeData: any[] = ['Online','Offline'];
  getPdate: String;
  constructor(private feePaymentService : FeesServiceService,
              private router : Router,
              private route : ActivatedRoute,private snakBar:MatSnackBar) { }
              
  ngOnInit(): void 
  {
    this.feepayment = new FeePayment();
    this.paymentId = this.route.snapshot.params['paymentId'];
    this.feePaymentService.getFeePayment(this.paymentId)
    .subscribe(data=>
      {
        console.log(data);
        this.feepayment = data;
        this.getPdate = this.feepayment.paymentDate;
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
  //update fee payment
  updateFeePayment()
  {
    console.log("hi");
    if(this.feepayment.paymentDate != this.getPdate)
    {
      let getMDate:String = this.feepayment.paymentDate;
      let splitMDate:String[] = getMDate.split("-");
      let concateMDate = splitMDate[1] + "-" + splitMDate[2] + "-" + splitMDate[0];
      this.feepayment.paymentDate = concateMDate;
    }
    this.feePaymentService.updateFeePayment(this.paymentId,this.feepayment)
    .subscribe(data=>{
      console.log(data);
      this.goToPaymentList();
      this.feepayment = new FeePayment();
      console.log("hi");
      this.snakBar.open("successfully Updated..","Cancle", {       
        duration : 3000,
        horizontalPosition:'center',
        verticalPosition:"bottom"
      });
    },error=>{
      this.handleError(error);
    })
  }

  onSubmit()
  {
    console.log("form update");
    this.updateFeePayment();
  }

  //go to all fee payment list
  goToPaymentList()
  {
    console.log("hi");
    this.router.navigate(['/admin/fees/fee-details']);
  }
}
