import { Component, OnInit } from '@angular/core';
import {Inquiry} from 'src/app/core/model/Inquiry';
import {InquiryServiceService} from 'src/app/features/admin/pages/inquiry/service/inquiry-service.service';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-view-inquiry-response',
  templateUrl: './view-inquiry-response.component.html',
  styleUrls: ['./view-inquiry-response.component.css']
})
export class ViewInquiryResponseComponent implements OnInit {

  inquiryId:number
  inquiry:Inquiry
  constructor(private viewInquiryService:InquiryServiceService,
              private router : Router,
              private route : ActivatedRoute) { }

  ngOnInit(): void
  {
    console.log("oninit");
    this.inquiry = new Inquiry();
    this.inquiryId = this.route.snapshot.params['inquiryId'];
    this.viewInquiryService.getInquiry(this.inquiryId)
    .subscribe(data=>{
      console.log(data);
      this.inquiry = data;
    },error=>{
      this.handleError(error);
    });
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
  //go back to list
  goToInquiryList()
  {
    console.log("go to list");
    this.router.navigate(['admin/inquiry/all-inquires']);
  }

}
