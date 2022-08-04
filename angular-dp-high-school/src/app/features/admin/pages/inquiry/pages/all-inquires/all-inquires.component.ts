import { Component, OnInit } from '@angular/core';
import {Inquiry} from 'src/app/core/model/Inquiry';
import {InquiryServiceService} from 'src/app/features/admin/pages/inquiry/service/inquiry-service.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/features/DialogBox/dialog-box/dialog-box.component';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar';

@Component({
  selector: 'app-all-inquires',
  templateUrl: './all-inquires.component.html',
  styleUrls: ['./all-inquires.component.css']
})

export class AllInquiresComponent implements OnInit {

  inquiries : Array<Inquiry> = new Array()
  page:number=0
  pages:Array<Number>
  totalPages:Number;
  statusNext:boolean=true
  statusPre:boolean = true
  constructor(private getInquiryService:InquiryServiceService,
              private router : Router,private dialog:MatDialog,private snakBar:MatSnackBar) { }

  ngOnInit(): void 
  {
    console.log("oninit");console.log("page"+this.page)
    this.getInquiryList();
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
  setPage(i,event:any)
  {
    this.page=i;
    console.log("page"+this.page)
    if(this.page==0) {this.statusPre=true; }
    else{this.statusPre=false;}
    if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
    else{this.statusNext=false}
    this.getInquiryList();
  }
  pre()
  {
    console.log("page"+this.page)
    if(this.page==0) {this.statusPre=true; }
    else{this.statusPre=false;this.page=this.page.valueOf()-1;
      this.getInquiryList();}
    if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
    else{this.statusNext=false}
  }
  next()
  {
    if(this.page==0) {this.statusPre=true; }
    else{this.statusPre=false;}
    console.log("page"+this.page)
     if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
    else{this.statusNext=false; this.page=this.page.valueOf()+1;
      this.getInquiryList();}
  }
  getInquiryList()
  {
    console.log("get all inquiries list");
    this.getInquiryService.getInquiryList(this.page).subscribe(data=>{
      this.inquiries = data['content'] ; console.log(this.inquiries)
          //items per page mate che..
          this.totalPages = data['totalPages'] 
          console.log("total Pages =>"+this.totalPages)
          if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
          else{this.statusNext=false}
          if(this.page==0) {this.statusPre=true; }
          else{this.statusPre=false;}
          this.pages= new Array(data['totalPages'])
    },error=>{
      this.handleError(error);
    })
  }

  //update inquiry
  updateInquiry(inquiryId:number)
  {
    console.log("update");
    this.router.navigate(['admin/inquiry/all-inquires/update-inquiry-response',inquiryId]);
  }

  //view inquiry
  viewInquiry(inquiryId:number)
  {
    console.log("view");
    this.router.navigate(['admin/inquiry/all-inquires/view-inquiry-response',inquiryId]);
  }
  //add inquiry
  addInquiry(inquiryId:number)
  {
    console.log("add");
    this.router.navigate(['admin/inquiry/all-inquires/add-inquiry-response',inquiryId]);
  }

  //delete inquiry
  deleteInquiry(inquiryId:number)
  {
    console.log("delete");
    this.dialog.open(DialogBoxComponent).afterClosed().subscribe(data=>{
      console.log(data.delete)
    if(data.delete)
    { 
        console.log("delete");
        this.getInquiryService.deleteInquiry(inquiryId)
        .subscribe(data=>{
          console.log(data);
          this.snakBar.open("successfully Deleted..","Cancle", {       
            duration : 3000,
            horizontalPosition:'center',
            verticalPosition:"bottom"
          });
          //router link to ga back
          this.router.navigate(['/admin/dashboard']);
        },error=>{
          this.handleError(error);
        })
      }
    },error=>{
      this.handleError(error);
    })
  }
}
