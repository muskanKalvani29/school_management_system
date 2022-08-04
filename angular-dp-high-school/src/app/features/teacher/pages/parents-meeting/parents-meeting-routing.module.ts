import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddParentsMeetingComponent } from './pages/add-parents-meeting/add-parents-meeting.component';
import { AllParentsMeetingComponent } from './pages/all-parents-meeting/all-parents-meeting.component';
import { UpdateParentMeetingComponent } from './pages/update-parent-meeting/update-parent-meeting.component';
import { ViewParentMeetingComponent } from './pages/view-parent-meeting/view-parent-meeting.component';

const routes: Routes = [
  {path:'all',component:AllParentsMeetingComponent},
  {path:'all/view/:meeting_id',component:ViewParentMeetingComponent},
  {path:'all/update/:meeting_id',component:UpdateParentMeetingComponent},
  {path:'add-parents-meeting',component:AddParentsMeetingComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentsMeetingRoutingModule { }
