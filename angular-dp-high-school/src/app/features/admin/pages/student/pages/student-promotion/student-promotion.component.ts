import { Component, OnInit } from '@angular/core';
import {StandardDivisionService} from 'src/app/features/admin/services/standard-division.service';
import {StudentServiceService} from 'src/app/features/admin/pages/student/service/student-service.service';
import {Standard} from 'src/app/core/model/Standard';
import {Router} from '@angular/router';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar'

@Component({
  selector: 'app-student-promotion',
  templateUrl: './student-promotion.component.html',
  styleUrls: ['./student-promotion.component.css']
})
export class StudentPromotionComponent implements OnInit {

  standards:Standard[];
  standardData:String;
  standardData1:String;
  constructor(private getStdDivService:StandardDivisionService,
              private updateStdService:StudentServiceService,
              private router:Router,
              private snakBar:MatSnackBar) { }

  ngOnInit(): void 
  {
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
  else if(error==200)
  {
    this.snakBar.open("successfully Changed..","Cancle", {       
      duration : 3000,
      horizontalPosition:'center',
      verticalPosition:"bottom"
    });
    this.router.navigate(['/admin/dashboard'])
    console.log(error);
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
  //to get standards
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

  doStudentPromotion(doStudentPromotion:any)
  {
    console.log("student promotion");
    this.standardData = doStudentPromotion.standard;
    this.standardData1 = doStudentPromotion.standard1;
    this.updateStdService.updateStudentStandard(this.standardData,this.standardData1).subscribe(
      data=>{
        console.log(data);
        this.snakBar.open("successfully Promoted..","Cancle", {       
          duration : 3000,
          horizontalPosition:'center',
          verticalPosition:"bottom"
        });
      },error=>{
        this.handleError(error);
      });
  }
}
