import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultsRoutingModule } from './results-routing.module';
import { AllStudentsComponent } from './pages/all-students/all-students.component';
import { AddResultComponent } from './pages/add-result/add-result.component';
import { ResultPdfComponent } from './pages/result-pdf/result-pdf.component';
import { UploadResultComponent } from './pages/upload-result/upload-result.component';
import { UpdateResultComponent } from './pages/update-result/update-result.component';
import { FormsModule } from '@angular/forms';
import { ViewResultComponent } from './pages/view-result/view-result.component';
import {  MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [AllStudentsComponent, AddResultComponent, ResultPdfComponent, UploadResultComponent, UpdateResultComponent,ViewResultComponent],
  imports: [
    CommonModule,
    ResultsRoutingModule,
    FormsModule,MatDialogModule
  ]
})
export class ResultsModule { }
