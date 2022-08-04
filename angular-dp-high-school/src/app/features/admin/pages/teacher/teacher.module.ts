import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule} from '@angular/forms';
import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherServiceService } from './services/teacher-service.service';
import { UserServiceService } from '../../services/user-service.service';
import { AddTeacherComponent } from './pages/add-teacher/add-teacher.component';
import { AllTeachersComponent } from './pages/all-teachers/all-teachers.component';
import { ViewTeacherComponent } from './pages/view-teacher/view-teacher.component';
import { UpdateTeacherComponent } from './pages/update-teacher/update-teacher.component';
import { TeacherPipe } from './pipes/teacher.pipe';
import {  MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [AddTeacherComponent,AllTeachersComponent,ViewTeacherComponent, UpdateTeacherComponent, TeacherPipe],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    FormsModule,
    MatDialogModule
  ],
  providers:[TeacherServiceService,UserServiceService]
})
export class TeacherModule { }
