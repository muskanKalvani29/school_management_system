import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from './pages/add-student/add-student.component';
import { AllStudentsComponent } from './pages/all-students/all-students.component';
import { StudentPromotionComponent } from './pages/student-promotion/student-promotion.component';
import { UpdateStudentComponent } from './pages/update-student/update-student.component';
import { ViewStudentComponent } from './pages/view-student/view-student.component';

const routes: Routes = [
  {path:'all-students',        component:AllStudentsComponent},
  {path: 'add-student',        component:AddStudentComponent},
  {path: 'student-promotion',  component:StudentPromotionComponent},
  {path: 'all-students/view-student/:grNo',       component:ViewStudentComponent},
  {path: 'all-students/update-student/:grNo',     component:UpdateStudentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
