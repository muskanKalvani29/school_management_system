import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule} from '@angular/forms';
import { EventRoutingModule } from './event-routing.module';
import { EventServiceService } from './service/event-service.service';
import { AddEventComponent } from './pages/add-event/add-event.component';
import { AllEventsComponent } from './pages/all-events/all-events.component';
import { UpdateEventComponent } from './pages/update-event/update-event.component';
import { ViewEventComponent } from './pages/view-event/view-event.component';
import { EventPipe } from './pipes/event.pipe';
import {  MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [AddEventComponent,AllEventsComponent, UpdateEventComponent, ViewEventComponent, EventPipe],
  imports: [
    CommonModule,
    EventRoutingModule,
    FormsModule,
    MatDialogModule
  ],
  providers:[EventServiceService]
})
export class EventModule { }
