import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBestStudentComponent } from './pages/add-best-student/add-best-student.component';
import { AllBestStudentsComponent } from './pages/all-best-students/all-best-students.component';
import { UpdateBestStudentComponent } from './pages/update-best-student/update-best-student.component';
import { ViewBestStudentComponent } from './pages/view-best-student/view-best-student.component';

const routes: Routes = [
  {path:'all-best-students',component:AllBestStudentsComponent},
  {path:'all-best-students/view-best-student/:bestStudentId',component:ViewBestStudentComponent},
  {path:'all-best-students/update-best-student/:bestStudentId',component:UpdateBestStudentComponent},
  {path:'all-best-students/add-best-student',component:AddBestStudentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadBestStudentDetailRoutingModule { }
