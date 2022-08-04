import { Component, OnInit } from '@angular/core';
import {FeeStructure} from 'src/app/core/model/FeeStructure';
import {FeeStructureService} from 'src/app/features/admin/pages/fee-structure/services/fee-structure.service';
import {StandardDivisionService} from 'src/app/features/admin/services/standard-division.service';
import {Standard} from 'src/app/core/model/Standard';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-all-fee-structure',
  templateUrl: './all-fee-structure.component.html',
  styleUrls: ['./all-fee-structure.component.css']
})
export class AllFeeStructureComponent implements OnInit {

  feeStructure : Array<FeeStructure> = new Array();
  standards:Standard[];
  mediumData: any[] = ['Gujarati','English'];
  selectedstd:any;
  selectedmedium:any;
  page:number=0
  pages:Array<Number>
  totalPages:Number;
  statusNext:boolean=true
  statusPre:boolean = true
  constructor(private getFeeStructureService:FeeStructureService,
              private getStdDivService:StandardDivisionService,
              private router : Router) { }

  ngOnInit(): void 
  {
    console.log("on init");
    this.getFeeStructureList();
    this.getStandardList();
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
    console.log(this.page)
    if(this.page==0) {this.statusPre=true; }
    else{this.statusPre=false;}
    if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
    else{this.statusNext=false}
    this.getFeeStructureList();
  }
  pre()
  {
    console.log(this.page);
    if(this.page==0) {this.statusPre=true; }
    else{this.statusPre=false;this.page=this.page.valueOf()-1;
      this.getFeeStructureList();}
    if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
    else{this.statusNext=false}
  }
  next()
  {
    if(this.page==0) {this.statusPre=true; }
    else{this.statusPre=false;}
     console.log(this.page); 
     if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
    else{this.statusNext=false; this.page=this.page.valueOf()+1;
      this.getFeeStructureList();}
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

  getFeeStructureList()
  {
    console.log("get fee structure list");
     this.getFeeStructureService.getFeeStructureList(this.page).subscribe(data=>
      {
        this.feeStructure = data['content'] ; console.log(this.feeStructure)
        //items per page mate che..
       this.totalPages = data['totalPages'] 
       this.pages= new Array(data['totalPages'])
       console.log("total Pages =>"+this.totalPages)
       if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
       else{this.statusNext=false}
       if(this.page==0) {this.statusPre=true; }
       else{this.statusPre=false;}
      },error=>{
        this.handleError(error);
      })
  }

  updateFeeStructure(feeStuctureId:number)
  {
    console.log("update fee structure");
    this.router.navigate(['admin/dashboard/fee-structure/all-fee-structure/update-fee-structure',feeStuctureId]);
  }
   //get selected standard
   changestd(e)
   {
    //  console.log(e.target.value); 
     this.selectedstd = e.target.value; console.log(this.selectedstd);
    //  console.log(this.selectedstd[0]);
   }
   //get selected medium
   changemed(e)
   {
    //  console.log(e.target.value);
     this.selectedmedium = e.target.value; console.log(this.selectedmedium);
   }

   //filter
   getFeeListByFilter(getFeeListByFilter:any)
   {
     //jo std select na hoy to
     if(!this.selectedstd)
     {
      console.log("filter by meduim");
     this.getFeeStructureService.getFeeStructureByMedium(this.selectedmedium).subscribe(data=>
      {
        this.feeStructure = data; console.log(data);
      },error=>{
        this.handleError(error);
      })
      this.router.navigate(['/admin/dashboard/fee-structure/all-fee-structure']);
     }
     else
     {
       console.log("filter by std and meduim");
       this.getFeeStructureService.getFeeStructureByMediumAndStandard(this.selectedmedium,this.selectedstd).subscribe(data=>
        {
          this.feeStructure = data; console.log(data);
        },error=>{
          this.handleError(error);
        })
       this.router.navigate(['/admin/dashboard/fee-structure/all-fee-structure']);
     }
   }
}
