import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule} from '@angular/forms';
import { HolidayRoutingModule } from './holiday-routing.module';
import { HolidayServiceService } from './service/holiday-service.service';
import { AddHolidayComponent } from './pages/add-holiday/add-holiday.component';
import { AllHolidaysComponent } from './pages/all-holidays/all-holidays.component';
import { UpdateHolidayComponent } from './pages/update-holiday/update-holiday.component';
import { ViewHolidayComponent } from './pages/view-holiday/view-holiday.component';
import { HolidayPipe } from './pipes/holiday.pipe';
import {  MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [AddHolidayComponent,AllHolidaysComponent, UpdateHolidayComponent, ViewHolidayComponent, HolidayPipe],
  imports: [
    CommonModule,
    HolidayRoutingModule,
    FormsModule, MatDialogModule
  ],
  providers:[HolidayServiceService]
})
export class HolidayModule { }
