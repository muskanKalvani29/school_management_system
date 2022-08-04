import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllParentsMeetingComponent } from './pages/all-parents-meeting/all-parents-meeting.component';
import { ViewParentMeetingComponent } from './pages/view-parent-meeting/view-parent-meeting.component';

const routes: Routes = [
  {path:'all-parents-meeting',component:AllParentsMeetingComponent},
  {path:'all-parents-meeting/view-parent-meeting/:meeting_id',component:ViewParentMeetingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentMeetingRoutingModule { }
