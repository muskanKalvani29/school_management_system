import { Component, OnInit } from '@angular/core';
import {FeePayment} from 'src/app/core/model/FeePayment';
import {FeesServiceService} from 'src/app/features/admin/pages/fees/service/fees-service.service';
import {StandardDivisionService} from 'src/app/features/admin/services/standard-division.service';
import {Standard} from 'src/app/core/model/Standard';
import {Division} from 'src/app/core/model/Division';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/features/DialogBox/dialog-box/dialog-box.component';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar';
@Component({
  selector: 'app-fee-details',
  templateUrl: './fee-details.component.html',
  styleUrls: ['./fee-details.component.css']
})
export class FeeDetailsComponent implements OnInit {

  paymentId:number
  feepayments : Array<FeePayment> = new Array()
  standards:Standard[];
  divisions:Division[];
  selectedstd:any;
  selecteddiv:any;
  page:number=0
  pages:Array<Number>
  totalPages:Number;
  statusNext:boolean=true
  statusPre:boolean = true
  constructor(private feeService:FeesServiceService,
              private getStdDivService:StandardDivisionService,
              private router:Router,private dialog:MatDialog,private snakBar:MatSnackBar) { }

  ngOnInit(): void 
  {
    console.log("init called");
    // this.getFeesList();
    this.getStandardList(); console.log("page"+this.page)
    this.getDivisionList();
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
    this.getFeesByStdAndDiv();
  }
  pre()
  {
    console.log("page"+this.page)
    if(this.page==0) {this.statusPre=true; }
    else{this.statusPre=false;this.page=this.page.valueOf()-1;
      this.getFeesByStdAndDiv();
    }
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
      this.getFeesByStdAndDiv(); 
    }
  }
  //dropdown
  getStandardList()
  {
    console.log("Stanadard list");
    this.getStdDivService.getStandardList()
    .subscribe(data=>{
      console.log(data);
      this.standards=data;
    },error=>{
      this.handleError(error);
    })
  }
  //dropdown
  getDivisionList()
  {
    console.log("Division list");
    this.getStdDivService.getDivisionList()
    .subscribe(data=>{
      console.log(data);
      this.divisions=data;
    },error=>{
      this.handleError(error);
    })
  } 

  //update
  updateFee(paymentId:number)
  {
    console.log("update");
    this.router.navigate(['admin/fees/fee-details/update-fee-detail',paymentId]);
  }

  //view
  viewFee(paymentId:number)
  {
    console.log("view");
    this.router.navigate(['admin/fees/fee-details/view-fee-detail',paymentId]);
  }

  //delete
  deleteFee(paymentId:number)
  {
    console.log("delete");
    this.dialog.open(DialogBoxComponent).afterClosed().subscribe(data=>{
      console.log(data.delete)
   if(data.delete)
   { 
      console.log("delete");
      this.feeService.deleteFeePayment(paymentId)
      .subscribe(data=>{
        console.log(data);
        this.snakBar.open("successfully Deleted..","Cancle", {       
          duration : 3000,
          horizontalPosition:'center',
          verticalPosition:"bottom"
        });
        this.router.navigate(['/admin/dashboard']);
      },error=>{
        this.handleError(error);
      });
      }
    },error=>{
      this.handleError(error);
    }) 
  }
  //get selected div
  changediv(e)
  {
    console.log(e.target.value);
    this.selecteddiv = e.target["selectedIndex"]; console.log(this.selecteddiv);

  }
  //get selected standard
  changestd(e)
  {
    console.log(e.target.value); 
    this.selectedstd = e.target.value; console.log(this.selectedstd);
    console.log(this.selectedstd[0]);
  }
   //searchfilter
   getFeesByStdAndDiv()
   {
     console.log("hi students by std and div");
      //jo std select na hoy to
     if(this.selectedstd && this.selecteddiv)
     {
       this.feeService.getFeeDetailsByStdByDiv(this.selectedstd,this.selecteddiv,this.page).subscribe(data=>{
         this.feepayments = data['content']; console.log(this.feepayments);
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
     else if(this.selectedstd)
     {
        this.feeService.getFeeDetailsByStandard(this.selectedstd,this.page).subscribe(data=>{
          this.feepayments = data['content']; console.log(this.feepayments) ;
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
     else
     {
       console.log("nothing");
     }
   }
}
