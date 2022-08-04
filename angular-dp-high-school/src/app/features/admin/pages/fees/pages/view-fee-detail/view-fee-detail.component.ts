import { Component, OnInit } from '@angular/core';
import {FeePayment} from 'src/app/core/model/FeePayment';
import {FeesServiceService} from 'src/app/features/admin/pages/fees/service/fees-service.service';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-view-fee-detail',
  templateUrl: './view-fee-detail.component.html',
  styleUrls: ['./view-fee-detail.component.css']
})
export class ViewFeeDetailComponent implements OnInit {

  paymentId:number
  feePayment: FeePayment
  constructor(private viewFeesService:FeesServiceService,
              private router : Router,
              private route : ActivatedRoute) { }

  ngOnInit(): void 
  {
    this.feePayment = new FeePayment();
    this.paymentId = this.route.snapshot.params['paymentId'];
    this.viewFeesService.getFeePayment(this.paymentId)
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
    console.log("goto");
    this.router.navigate(['admin/fees/fee-details']);
  }
}
