import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTimetableComponent } from './pages/add-timetable/add-timetable.component';
import { AllTimetablesComponent } from './pages/all-timetables/all-timetables.component';
import { UpdateTimeTableComponent } from './pages/update-time-table/update-time-table.component';
import { ViewTimeTableComponent } from './pages/view-time-table/view-time-table.component';

const routes: Routes = [
  {path: 'add-time-table',                 component:AddTimetableComponent},
  {path: 'all-time-tables',                component:AllTimetablesComponent},
  {path:'all-time-tables/update-time-table/:timetableId',component:UpdateTimeTableComponent},
  {path: 'all-time-tables/view-time-table/:timetableId',component:ViewTimeTableComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimeTableRoutingModule { }
