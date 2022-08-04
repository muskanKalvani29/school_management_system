import { Component, OnInit } from '@angular/core';
import {Teacher} from 'src/app/core/model/Teacher';
import {TeacherServiceService} from 'src/app/features/admin/pages/teacher/services/teacher-service.service';
import {User} from 'src/app/core/model/User';
import {UserServiceService} from 'src/app/features/admin/services/user-service.service';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-update-teacher',
  templateUrl: './update-teacher.component.html',
  styleUrls: ['./update-teacher.component.css']
})
export class UpdateTeacherComponent implements OnInit {

  teacherId : number;
  teacher : Teacher
  userId : number;
  user : User;
  constructor(private updateTeacherService: TeacherServiceService,
              private updateUserService: UserServiceService,
              private router : Router,
              private route : ActivatedRoute) { }

  ngOnInit(): void 
  {
    this.teacher = new Teacher();
    this.teacherId = this.route.snapshot.params['teacherId'];
    this.updateTeacherService.getTeacher(this.teacherId)
    .subscribe(data=>{
      console.log(data);
      this.teacher=data;
    })

    this.user = new User();
    this.userId = this.route.snapshot.params['userId'];
    this.updateUserService.getUser(this.userId)
    .subscribe(data=>{
      console.log(data);
      this.user=data;
    })
  }

  //update teacher
  // updateTeacher()
  // {
  //   this.updateTeacherService.updateTeacher(this.teacherId,this.teacher)
  //   .subscribe(data=>{
  //     console.log(data);
  //     this.teacher = new Teacher();
  //     console.log("hi");
  //     this.goToTeacherList();
  //   })

  //   this.updateUserService.updateUser(this.userId,this.user)
  //   .subscribe(data=>{
  //     console.log(data);
  //     this.user = new User();
  //     console.log("hi");
  //     this.goToTeacherList();
  //   })
  // }
  //on submit
  // onSubmit()
  // {
  //   console.log("form update");
  //   this.updateTeacher();
  // }
  //get back to teacherlist
  // goToTeacherList()
  // {
  //   console.log("hi");
  //   this.router.navigate(['teachers/all-teachers']);
  // }
}
