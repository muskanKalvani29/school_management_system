import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimeTableRoutingModule } from './time-table-routing.module';
import { AllTimeTablesComponent } from './pages/all-time-tables/all-time-tables.component';
// import { ViewTeacherTimeTableComponent } from './pages/view-teacher-time-table/view-teacher-time-table.component';
// import { ViewTimeTableComponent } from './pages/view-time-table/view-time-table.component';
import { FormsModule } from '@angular/forms';
import {  MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [AllTimeTablesComponent],
  imports: [
    CommonModule,
    TimeTableRoutingModule,
    FormsModule,
    MatDialogModule
  ]
})
export class TimeTableModule { }
