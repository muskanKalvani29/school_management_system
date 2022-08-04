import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllMeetingsComponent } from './pages/all-meetings/all-meetings.component';
import { ViewMeetingComponent } from './pages/view-meeting/view-meeting.component';

const routes: Routes = [
  {path:'all-meetings',component:AllMeetingsComponent},
  {path:'all-meetings/view-meeting/:meetingId',component:ViewMeetingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
