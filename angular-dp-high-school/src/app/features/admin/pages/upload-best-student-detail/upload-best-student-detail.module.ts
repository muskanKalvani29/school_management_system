import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadBestStudentDetailRoutingModule } from './upload-best-student-detail-routing.module';
import { AllBestStudentsComponent } from './pages/all-best-students/all-best-students.component';
import { UpdateBestStudentComponent } from './pages/update-best-student/update-best-student.component';
import { AddBestStudentComponent } from './pages/add-best-student/add-best-student.component';
import { ViewBestStudentComponent } from './pages/view-best-student/view-best-student.component';
import { FormsModule } from '@angular/forms';
import { FilterBeststudentPipe } from './pipes/filter-beststudent.pipe';
import {  MatDialogModule } from '@angular/material/dialog';

// import {MatButtonModule} from '@angular/material/button';
// import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [AllBestStudentsComponent, ViewBestStudentComponent, FilterBeststudentPipe],
  imports: [
    CommonModule,
    UploadBestStudentDetailRoutingModule,
    FormsModule,
    MatDialogModule
    // MatButtonModule,
    // MatSnackBarModule
  ],
  exports:[
    // MatButtonModule
  ]
  
})
export class UploadBestStudentDetailModule { }
