import { Component, OnInit } from '@angular/core';
import {Student} from 'src/app/core/model/Student';
import {StudentServiceService} from 'src/app/features/admin/pages/student/service/student-service.service';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {

  grNo : number
  student : Student
  constructor(private viewStudentService:StudentServiceService,
              private router : Router,
              private route : ActivatedRoute) { }

  ngOnInit(): void 
  {
    console.log("oninit");
    this.student = new Student();
    this.grNo = this.route.snapshot.params['grNo'];
    this.viewStudentService.getStudent(this.grNo)
    .subscribe(data=>{
      console.log(data);
      this.student = data;
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
    this.router.navigate(['admin/students/all-students']);
  }

}
