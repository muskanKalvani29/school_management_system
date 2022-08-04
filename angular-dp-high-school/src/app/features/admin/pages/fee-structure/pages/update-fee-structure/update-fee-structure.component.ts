import { Component, OnInit } from '@angular/core';
import {FeeStructure} from 'src/app/core/model/FeeStructure';
import {FeeStructureService} from 'src/app/features/admin/pages/fee-structure/services/fee-structure.service';
import {StandardDivisionService} from 'src/app/features/admin/services/standard-division.service';
import {Standard} from 'src/app/core/model/Standard';
import {Router,ActivatedRoute} from '@angular/router'
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar'

@Component({
  selector: 'app-update-fee-structure',
  templateUrl: './update-fee-structure.component.html',
  styleUrls: ['./update-fee-structure.component.css']
})
export class UpdateFeeStructureComponent implements OnInit {

  feeStuctureId:number;
  feeStructure:FeeStructure;
  standards:Standard[];
  mediumData: any[] = ['Gujarati','English'];
  constructor(private getFeeStructureService:FeeStructureService,
              private getStdDivService:StandardDivisionService,
              private router:Router,
              private route:ActivatedRoute,
              private snakBar:MatSnackBar) { }

  ngOnInit(): void 
  {
    console.log("on init");
    this.feeStructure = new FeeStructure();
    this.feeStuctureId = this.route.snapshot.params['feeStuctureId'];
    this.getFeeStructureService.getFeeStructure(this.feeStuctureId)
    .subscribe(data=>{
      console.log(data);
      this.feeStructure = data;
    },error=>{
      this.handleError(error);
    })
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

  updateFeeStructure()
  {
    this.getFeeStructureService.updateFeeStructure(this.feeStuctureId,this.feeStructure)
    .subscribe(data=>{
      console.log(data);
      this.feeStructure = new FeeStructure();
      console.log("hi");
      this.snakBar.open("successfully Updated..","Cancle", {       
        duration : 3000,
        horizontalPosition:'center',
        verticalPosition:"bottom"
      });
      this.goToFeeStructureList();
    },error=>{
      this.handleError(error);
    })
  }

  //on submit
  onSubmit()
  {
    console.log("onsubmit");
    this.updateFeeStructure();
  }

  goToFeeStructureList()
  {
    console.log("go to fee structure list");
    this.router.navigate(['admin/dashboard/fee-structure/all-fee-structure']);
  }
}
