import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllInquiresComponent } from './pages/all-inquires/all-inquires.component';
import { InquiryResponseComponent } from './pages/inquiry-response/inquiry-response.component';
import { UpdateInquiryResponseComponent } from './pages/update-inquiry-response/update-inquiry-response.component';
import { ViewInquiryResponseComponent } from './pages/view-inquiry-response/view-inquiry-response.component';

const routes: Routes = [
  {path: 'all-inquires',                         component:AllInquiresComponent},
  {path: 'all-inquires/add-inquiry-response/:inquiryId',                 component:InquiryResponseComponent},
  {path: 'all-inquires/update-inquiry-response/:inquiryId', component:UpdateInquiryResponseComponent},
  {path: 'all-inquires/view-inquiry-response/:inquiryId',   component:ViewInquiryResponseComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InquiryRoutingModule { }
