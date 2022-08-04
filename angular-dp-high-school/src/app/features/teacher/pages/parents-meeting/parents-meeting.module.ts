import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentsMeetingRoutingModule } from './parents-meeting-routing.module';
import { AllParentsMeetingComponent } from './pages/all-parents-meeting/all-parents-meeting.component';
import { AddParentsMeetingComponent } from './pages/add-parents-meeting/add-parents-meeting.component';
import { ViewParentMeetingComponent } from './pages/view-parent-meeting/view-parent-meeting.component';
import { UpdateParentMeetingComponent } from './pages/update-parent-meeting/update-parent-meeting.component';
import { FormsModule } from '@angular/forms';
import {  MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [AllParentsMeetingComponent, AddParentsMeetingComponent, ViewParentMeetingComponent, UpdateParentMeetingComponent],
  imports: [
    CommonModule,
    ParentsMeetingRoutingModule,
    FormsModule,
    MatDialogModule
  ]
})
export class ParentsMeetingModule { }
