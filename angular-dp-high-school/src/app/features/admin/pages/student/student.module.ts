import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRoutingModule } from './student-routing.module';
import {FormsModule} from '@angular/forms';
import { AddStudentComponent } from './pages/add-student/add-student.component';
import { AllStudentsComponent } from './pages/all-students/all-students.component';
import { ViewStudentComponent } from './pages/view-student/view-student.component';
import { StudentPromotionComponent } from './pages/student-promotion/student-promotion.component';
import { StudentServiceService } from './service/student-service.service';
import { UpdateStudentComponent } from './pages/update-student/update-student.component';
import {  MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [AddStudentComponent,AllStudentsComponent,ViewStudentComponent,StudentPromotionComponent, UpdateStudentComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [StudentServiceService],
})
export class StudentModule { }
