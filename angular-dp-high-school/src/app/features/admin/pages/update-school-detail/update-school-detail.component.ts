import { Component, OnInit } from '@angular/core';
import {SchoolDetail} from 'src/app/core/model/SchoolDetail';
import {SchooldetailServiceService} from 'src/app/features/admin/services/schooldetail-service.service';
import {Router,ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar'


@Component({
  selector: 'app-update-school-detail',
  templateUrl: './update-school-detail.component.html',
  styleUrls: ['./update-school-detail.component.css']
})
export class UpdateSchoolDetailComponent implements OnInit {

  school:SchoolDetail;
  schoolDetailId:number;

  constructor(private getSchoolDetail:SchooldetailServiceService,
              private router : Router,
              private route: ActivatedRoute,
              private snakBar:MatSnackBar) { }

  ngOnInit(): void 
  {
    console.log("on init");
    this.school = new SchoolDetail();
    this.schoolDetailId = this.route.snapshot.params['schoolDetailId'];
    this.getSchoolDetail.getSchoolDetailList()
    .subscribe(data=>{
      console.log(data);
      this.school=data;
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
  updateSchoolDetail()
  {
    console.log("hi");
    this.getSchoolDetail.updateSchoolDetail(this.schoolDetailId,this.school)
    .subscribe(data=>{
      console.log(data);
      this.snakBar.open("successfully Updated..","Cancle", {       
        duration : 3000,
        horizontalPosition:'center',
        verticalPosition:"bottom"
      });
      this.goToSchoolDetail();
    },error=>{
      this.handleError(error);
    })
  }

  //onsubmit
  onSubmit()
  {
    console.log("onsubmit");
    this.updateSchoolDetail();
  }

  //get query list
  goToSchoolDetail()
  {
    console.log("hi");
    this.router.navigate(['/admin/dashboard']);
  }
}
