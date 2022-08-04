import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeeRoutingModule } from './fee-routing.module';
import { FeeDetailsComponent } from './pages/fee-details/fee-details.component';
import { PayFeesComponent } from './pages/pay-fees/pay-fees.component';
import { ViewFeeDetailComponent } from './pages/view-fee-detail/view-fee-detail.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [FeeDetailsComponent, PayFeesComponent, ViewFeeDetailComponent],
  imports: [
    CommonModule,
    FeeRoutingModule,
    FormsModule
  ],
  exports:[]
})
export class FeeModule { }
