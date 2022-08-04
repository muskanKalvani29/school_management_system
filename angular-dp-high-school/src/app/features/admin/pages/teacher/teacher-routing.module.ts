import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTeacherComponent } from './pages/add-teacher/add-teacher.component';
import { AllTeachersComponent } from './pages/all-teachers/all-teachers.component';
import { UpdateTeacherComponent } from './pages/update-teacher/update-teacher.component';
import { ViewTeacherComponent } from './pages/view-teacher/view-teacher.component';

const routes: Routes = [
  {path: 'all-teachers',   component:AllTeachersComponent},
  {path: 'add-teacher',    component:AddTeacherComponent},
  {path: 'all-teachers/view-teacher/:teacherId',   component:ViewTeacherComponent},
  {path: 'all-teachers/update-teacher', component:UpdateTeacherComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
