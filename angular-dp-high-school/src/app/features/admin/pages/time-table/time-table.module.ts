import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { TimeTableRoutingModule } from './time-table-routing.module';
import { TimeTableServiceService } from './service/time-table-service.service';
import { ViewTimeTableComponent } from './pages/view-time-table/view-time-table.component';
import { UpdateTimeTableComponent } from './pages/update-time-table/update-time-table.component';
import { AllTimetablesComponent } from './pages/all-timetables/all-timetables.component';
import { AddTimetableComponent } from './pages/add-timetable/add-timetable.component';
import { FormsModule } from '@angular/forms';
import {  MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [UpdateTimeTableComponent,AllTimetablesComponent,AddTimetableComponent],
  imports: [
    CommonModule,
    TimeTableRoutingModule,
    FormsModule,
    MatDialogModule
  ],
  providers:[TimeTableServiceService]
})
export class TimeTableModule { }
