import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAttendanceComponent } from './pages/add-attendance/add-attendance.component';
import { AllStudentsComponent } from './pages/all-students/all-students.component';
import { UpdateAttendanceComponent } from './pages/update-attendance/update-attendance.component';
import { ViewAttendanceComponent } from './pages/view-attendance/view-attendance.component';

const routes: Routes = [
  {path:'all-students',component:AllStudentsComponent},
  {path:'all-students/add-attendance/:grNo',component:AddAttendanceComponent},
  {path:'all-students/view-attendance/:grNo',component:ViewAttendanceComponent},
  {path:'all-students/view-attendance/update-attendance/:attendanceId',component:UpdateAttendanceComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
