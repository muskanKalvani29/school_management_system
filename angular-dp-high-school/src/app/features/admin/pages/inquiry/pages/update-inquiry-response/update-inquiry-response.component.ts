import { Component, OnInit } from '@angular/core';
import {Inquiry} from 'src/app/core/model/Inquiry';
import {InquiryServiceService} from 'src/app/features/admin/pages/inquiry/service/inquiry-service.service';
import {Router,ActivatedRoute} from '@angular/router'
import {EmailService} from 'src/app/app-home/services/email.service';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar'

@Component({
  selector: 'app-update-inquiry-response',
  templateUrl: './update-inquiry-response.component.html',
  styleUrls: ['./update-inquiry-response.component.css']
})
export class UpdateInquiryResponseComponent implements OnInit {

  inquiryId : number;
  inquiry : Inquiry;
  constructor(private updateInquiryService : InquiryServiceService,
              private emailService : EmailService,
              private router : Router,
              private route : ActivatedRoute,private snakBar:MatSnackBar) { }

  ngOnInit(): void 
  {
    this.inquiryId = this.route.snapshot.params['inquiryId'];
    this.inquiry = new Inquiry();
    this.updateInquiryService.getInquiry(this.inquiryId)
    .subscribe(data=>{
      console.log(data);
      this.inquiry = data;
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
  //update inquiry
  updateInquiryResponse()
  {
    this.updateInquiryService.updateInquiryResponse(this.inquiryId,this.inquiry)
    .subscribe(data=>{
      console.log(data);
      this.emailService.sendInquiryResponseEmail(this.inquiry).subscribe(data=>{
        console.log(data);
        this.inquiry = new Inquiry();
        console.log("hi");
        this.snakBar.open("successfully Updated..","Cancle", {       
          duration : 3000,
          horizontalPosition:'center',
          verticalPosition:"bottom"
        });
        this.goToInquiryList();
      },error=>{
        this.handleError(error);
      })
    },error=>{
      this.handleError(error);
    })
  }
  //onsubmit
  onSubmit()
  {
    console.log("onsubmit");
    this.updateInquiryResponse();
  }

  //get back to all inquiry list
  goToInquiryList()
  {
    console.log("hi");
    this.router.navigate(['admin/inquiry/all-inquires']);
  }
}
