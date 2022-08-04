import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { AddAttendanceComponent } from './pages/add-attendance/add-attendance.component';
import { FormsModule } from '@angular/forms';
import { AllStudentsComponent } from './pages/all-students/all-students.component';
import { UpdateAttendanceComponent } from './pages/update-attendance/update-attendance.component';
import { ViewAttendanceComponent } from './pages/view-attendance/view-attendance.component';
import {  MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [AddAttendanceComponent,AllStudentsComponent,UpdateAttendanceComponent,ViewAttendanceComponent],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    FormsModule,
    MatDialogModule
  ]
})
export class AttendanceModule { }
