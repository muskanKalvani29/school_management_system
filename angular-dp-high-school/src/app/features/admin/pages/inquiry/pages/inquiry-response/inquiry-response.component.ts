import { Component, OnInit } from '@angular/core';
import {Inquiry} from 'src/app/core/model/Inquiry';
import {InquiryServiceService} from 'src/app/features/admin/pages/inquiry/service/inquiry-service.service';
import {Router,ActivatedRoute} from '@angular/router'
import {EmailService} from 'src/app/app-home/services/email.service';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar'
@Component({
  selector: 'app-inquiry-response',
  templateUrl: './inquiry-response.component.html',
  styleUrls: ['./inquiry-response.component.css']
})
export class InquiryResponseComponent implements OnInit {

  inquiryId : number;
  inquiry : Inquiry;
  inquiryForEmail: Inquiry;
  constructor(private inquiryService:InquiryServiceService,
              private emailService:EmailService,
              private route:ActivatedRoute,
              private router:Router,private snakBar:MatSnackBar) { }
 
  ngOnInit(): void 
  {
    this.inquiryId = this.route.snapshot.params['inquiryId'];
    this.inquiry = new Inquiry();
    this.inquiryService.getInquiry(this.inquiryId)
    .subscribe(data=>{
      console.log(data);
      this.inquiry = data;
      this.inquiryForEmail = data;
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
  addInquiryResponse(addInquiryResponse:any)
  {
    this.inquiry = new Inquiry();
    this.inquiry.inquiryMessage = addInquiryResponse.inquiryMessage;
    this.inquiry.inquiryResponse = addInquiryResponse.inquiryResponse;
    this.inquiry.emailId = this.inquiryForEmail.emailId;
    this.inquiryService.updateInquiryResponse(this.inquiryId,this.inquiry).subscribe(data=>{
            console.log(data);
            console.log("inquiry message => ");  console.log(this.inquiry);
            //email service
            this.emailService.sendInquiryResponseEmail(this.inquiry).subscribe(data=>{
              console.log(data);
              this.snakBar.open("successfully Added..","Cancle", {       
                duration : 3000,
                horizontalPosition:'center',
                verticalPosition:"bottom"
              });
              this.router.navigate(['/admin/inquiry/all-inquires']);
            },error=>{
              this.handleError(error);
            })
         },error=>{
          this.handleError(error);
        })
        }
    
}
