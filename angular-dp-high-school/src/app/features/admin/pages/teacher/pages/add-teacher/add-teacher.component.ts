import { Component, OnInit } from '@angular/core';

import {Teacher} from 'src/app/core/model/Teacher';
import {TeacherServiceService} from '../../services/teacher-service.service';
import {User} from 'src/app/core/model/User';
import {UserServiceService} from 'src/app/features/admin/services/user-service.service';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {

  constructor(private teacherService:TeacherServiceService,private userService:UserServiceService) { }
  teacher : Teacher = new Teacher();
  user : User = new User();
  ngOnInit(): void {
  }

  addTeacher(addTeacher:any)
  {
    this.user = new User();
    //data for calling user service
    //doubt for type of user column
    this.user.userName = addTeacher.userName;
    this.user.password = addTeacher.password;
    this.user.name = addTeacher.name;
    this.user.contactNo1 = addTeacher.contactNo1;
    this.user.emailId = addTeacher.emailId;

    this.teacher = new Teacher();
    this.teacher.standard = addTeacher.standard;
    this.teacher.subject = addTeacher.subject;
    //add user how?
    this.teacher.gender = addTeacher.gender;
    this.teacher.joiningDate = addTeacher.joiningDate;
    this.teacher.qualification = addTeacher.qualification;
    this.teacher.address1 = addTeacher.address1;
    this.teacher.address2 = addTeacher.address2;
    this.teacher.pincode = addTeacher.pincode;
    this.teacher.image = addTeacher.image;

    //call service of user
    this.userService.addUser(this.user)
    .subscribe(data=>{console.log(data)});
    
    //call service of teacher
    // this.teacherService.addTeacher(this.teacher)
    // .subscribe(data=>{console.log(data)});
  }
}
