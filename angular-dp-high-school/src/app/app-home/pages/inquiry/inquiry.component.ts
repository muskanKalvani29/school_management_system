import { Component, OnInit } from '@angular/core';
import {Inquiry} from 'src/app/core/model/Inquiry';
import {InquiryServiceService} from 'src/app/features/admin/pages/inquiry/service/inquiry-service.service';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.css']
})
export class InquiryComponent implements OnInit {

  inquiry : Inquiry = new Inquiry();
  constructor(private inquiryService:InquiryServiceService,private snakBar:MatSnackBar,private router:Router,) { }

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

  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
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

  addInquiry(addInquiry:any)
  {
    this. inquiry  = new Inquiry();

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var today1 = mm + '-' + dd + '-' + yyyy;
    console.log(today1);
    this.inquiry.uploadDate = today1;
    this.inquiry.emailId = addInquiry.emailId;   
    this.inquiry.inquiryMessage=addInquiry.InquiryMessage;  

    //call service
    this.inquiryService.addInquiryResponse(this.inquiry)
    .subscribe(data=>{console.log(data)
      this.snakBar.open("Your Inquiry is successfully Uploded..","Cancle", {       
        duration : 3000,
        horizontalPosition:'center',
        verticalPosition:"bottom"
      });
      this.router.navigate(['/sms/home']);
    },error=>{
      this.handleError(error);
    }
    );
  }

}
