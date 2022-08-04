import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { AllMeetingsComponent } from './pages/all-meetings/all-meetings.component';
import { ViewMeetingComponent } from './pages/view-meeting/view-meeting.component';
import { TeacherMeetingPipe } from './pipes/teacher-meeting.pipe';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [AllMeetingsComponent, ViewMeetingComponent,TeacherMeetingPipe],
  imports: [
    CommonModule,
    ScheduleRoutingModule,FormsModule
  ]
})
export class ScheduleModule { }
