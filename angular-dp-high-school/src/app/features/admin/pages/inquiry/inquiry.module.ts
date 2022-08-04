import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule} from '@angular/forms';
import { InquiryRoutingModule } from './inquiry-routing.module';
import { InquiryServiceService } from './service/inquiry-service.service';
import { AllInquiresComponent } from './pages/all-inquires/all-inquires.component';
import { InquiryResponseComponent } from './pages/inquiry-response/inquiry-response.component';
import { UpdateInquiryResponseComponent } from './pages/update-inquiry-response/update-inquiry-response.component';
import { ViewInquiryResponseComponent } from './pages/view-inquiry-response/view-inquiry-response.component';
import {  MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [AllInquiresComponent,InquiryResponseComponent, UpdateInquiryResponseComponent, ViewInquiryResponseComponent,],
  imports: [
    CommonModule,
    InquiryRoutingModule,
    FormsModule,MatDialogModule
  ],
  providers:[InquiryServiceService]
})
export class InquiryModule { }
