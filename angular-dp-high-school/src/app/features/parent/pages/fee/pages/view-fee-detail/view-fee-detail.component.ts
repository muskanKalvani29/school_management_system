import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {FeePayment} from 'src/app/core/model/FeePayment';
import {FeesServiceService} from 'src/app/features/admin/pages/fees/service/fees-service.service';

@Component({
  selector: 'app-view-fee-detail',
  templateUrl: './view-fee-detail.component.html',
  styleUrls: ['./view-fee-detail.component.css']
})
export class ViewFeeDetailComponent implements OnInit {

  constructor(private router:Router,
    private route : ActivatedRoute,
    private _feePaymentService:FeesServiceService,
    ) { }

    paymentId: number;
    feePayment:FeePayment;

    ngOnInit(): void {
    console.log("oninit");
    this.feePayment = new FeePayment();
    this.paymentId = this.route.snapshot.params['paymentId'];
    this._feePaymentService.getFeePayment(this.paymentId)
    .subscribe(data=>{
      console.log(data);
      this.feePayment = data;
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
  goToFeeList()
  {
    console.log("go to");
    this.router.navigate(['parent/fees/fee-details']);
  }
}





  

  
  

