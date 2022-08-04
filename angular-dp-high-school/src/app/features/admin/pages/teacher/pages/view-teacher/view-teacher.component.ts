import { Component, OnInit } from '@angular/core';
import {Teacher} from 'src/app/core/model/Teacher';
import {TeacherServiceService} from 'src/app/features/admin/pages/teacher/services/teacher-service.service';
import {Router,ActivatedRoute} from '@angular/router';
import { Standard } from 'src/app/core/model/Standard';
import {Subject} from 'src/app/core/model/Subject';

@Component({
  selector: 'app-view-teacher',
  templateUrl: './view-teacher.component.html',
  styleUrls: ['./view-teacher.component.css']
})
export class ViewTeacherComponent implements OnInit {

  teacherId : number
  teacher : Teacher
  standard:Standard[];
  subject:Subject[];
  constructor(private viewTeacherService:TeacherServiceService,
              private router : Router,
              private route : ActivatedRoute) { }

  ngOnInit(): void 
  {
    console.log("oninit");
    this.teacher = new Teacher();
    this.teacherId = this.route.snapshot.params['teacherId'];
    this.viewTeacherService.getTeacher(this.teacherId)
    .subscribe(data=>{
      console.log(data);
      this.teacher = data;
      this.standard = this.teacher.standard;
      this.subject = this.teacher.subject;
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
  //go to teacher
  goToTeacherList()
  {
    console.log("goto");
    this.router.navigate(['admin/teachers/all-teachers']);
  }

}
