import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentMeetingRoutingModule } from './parent-meeting-routing.module';
import { AllParentsMeetingComponent } from './pages/all-parents-meeting/all-parents-meeting.component';
import { ViewParentMeetingComponent } from './pages/view-parent-meeting/view-parent-meeting.component';


@NgModule({
  declarations: [AllParentsMeetingComponent, ViewParentMeetingComponent],
  imports: [
    CommonModule,
    ParentMeetingRoutingModule
  ]
})
export class ParentMeetingModule { }
