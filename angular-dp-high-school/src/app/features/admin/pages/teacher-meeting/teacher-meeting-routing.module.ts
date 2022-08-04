import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMeetingComponent } from './pages/add-meeting/add-meeting.component';
import { AllMeetingsComponent } from './pages/all-meetings/all-meetings.component';
import { UpdateMeetingComponent } from './pages/update-meeting/update-meeting.component';
import { ViewMeetingComponent } from './pages/view-meeting/view-meeting.component';

const routes: Routes = [
  {path: 'all-meetings',                component:AllMeetingsComponent},
  {path: 'add-meeting',                 component:AddMeetingComponent},
  {path: 'all-meetings/update-meeting/:meetingId', component:UpdateMeetingComponent},
  {path: 'all-meetings/view-meeting/:meetingId',   component:ViewMeetingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherMeetingRoutingModule { }
