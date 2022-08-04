import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddHolidayComponent } from './pages/add-holiday/add-holiday.component';
import { AllHolidaysComponent } from './pages/all-holidays/all-holidays.component';
import { UpdateHolidayComponent } from './pages/update-holiday/update-holiday.component';
import { ViewHolidayComponent } from './pages/view-holiday/view-holiday.component';

const routes: Routes = [
  {path: 'add-holiday',                  component:AddHolidayComponent},
  {path: 'all-holidays',                 component:AllHolidaysComponent},
  {path: 'all-holidays/update-holiday/:holidayId',  component:UpdateHolidayComponent},
  {path: 'all-holidays/view-holiday/:holidayId',    component:ViewHolidayComponent},
  // {path: 'view-holiday/update-holiday',component:UpdateHolidayComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HolidayRoutingModule { }
