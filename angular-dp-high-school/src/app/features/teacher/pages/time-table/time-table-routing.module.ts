import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTimeTablesComponent } from './pages/all-time-tables/all-time-tables.component';
import { ViewTeacherTimeTableComponent } from './pages/view-teacher-time-table/view-teacher-time-table.component';


const routes: Routes = [
  {path:'all-time-tables',component:AllTimeTablesComponent},
  {path:'all-time-tables/view-time-table/:timetableId',component:ViewTeacherTimeTableComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimeTableRoutingModule { }
