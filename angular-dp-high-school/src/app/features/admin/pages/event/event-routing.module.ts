import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEventComponent } from './pages/add-event/add-event.component';
import { AllEventsComponent } from './pages/all-events/all-events.component';
import { UpdateEventComponent } from './pages/update-event/update-event.component';
import { ViewEventComponent } from './pages/view-event/view-event.component';

const routes: Routes = [
  {path: 'add-event',              component:AddEventComponent},
  {path: 'all-events',             component:AllEventsComponent},
  {path: 'all-events/update-event/:eventId',component:UpdateEventComponent},
  {path: 'all-events/view-event/:eventId',  component: ViewEventComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
