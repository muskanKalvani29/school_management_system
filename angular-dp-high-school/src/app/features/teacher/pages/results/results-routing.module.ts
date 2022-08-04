import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddResultComponent } from './pages/add-result/add-result.component';
import { AllStudentsComponent } from './pages/all-students/all-students.component';
import { ResultPdfComponent } from './pages/result-pdf/result-pdf.component';
import { UpdateResultComponent } from './pages/update-result/update-result.component';
import { UploadResultComponent } from './pages/upload-result/upload-result.component';
import { ViewResultComponent } from './pages/view-result/view-result.component';

const routes: Routes = [
  {path:'all-students',component:AllStudentsComponent},
  {path:'all-students/add-result/:grNo',component:AddResultComponent},
  {path:'all-students/view-result/:grNo',component:ViewResultComponent},
  {path:'all-students/view-result/update-result/:resultId',component:UpdateResultComponent},
  {path:'all-students/result-pdf',component:ResultPdfComponent},
  {path:'upload-result',component:UploadResultComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultsRoutingModule { }
