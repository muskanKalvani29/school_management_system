import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { TeacherMeetingRoutingModule } from './teacher-meeting-routing.module';
import { TeacherMeetingServiceService } from './service/teacher-meeting-service.service';
import { AddMeetingComponent } from './pages/add-meeting/add-meeting.component';
import { AllMeetingsComponent } from './pages/all-meetings/all-meetings.component';
import { UpdateMeetingComponent } from './pages/update-meeting/update-meeting.component';
import { ViewMeetingComponent } from './pages/view-meeting/view-meeting.component';
import { TeacherMeetingPipe } from './pipes/teacher-meeting.pipe';
import {  MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [AddMeetingComponent,AllMeetingsComponent, UpdateMeetingComponent, ViewMeetingComponent, TeacherMeetingPipe ],
  imports: [
    CommonModule,
    TeacherMeetingRoutingModule,
    FormsModule,
    MatDialogModule
  ],
  providers:[TeacherMeetingServiceService]
})
export class TeacherMeetingModule { }
