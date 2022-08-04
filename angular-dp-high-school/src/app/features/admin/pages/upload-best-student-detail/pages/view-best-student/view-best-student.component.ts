import { Component, OnInit } from '@angular/core';
import {BestStudent} from 'src/app/core/model/BestStudent';
import {BestStudentServiceService} from 'src/app/features/admin/pages/upload-best-student-detail/services/best-student-service.service';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-view-best-student',
  templateUrl: './view-best-student.component.html',
  styleUrls: ['./view-best-student.component.css']
})
export class ViewBestStudentComponent implements OnInit {

  bestStudentId:number;
  beststudent: BestStudent
  constructor(private viewStudentService:BestStudentServiceService,
              private router : Router,
              private route : ActivatedRoute) { }

  ngOnInit(): void 
  {
    console.log("oninit");
    this.beststudent = new BestStudent();
    this.bestStudentId = this.route.snapshot.params['bestStudentId'];
    this.viewStudentService.getBestStudent(this.bestStudentId)
    .subscribe(data=>{
      console.log(data);
      this.beststudent = data;
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
  goToStudentList()
  {
    console.log("goto");
    this.router.navigate(['admin/dashboard/best-student/all-best-students']);
  }
}
