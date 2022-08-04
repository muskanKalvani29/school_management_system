import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule} from '@angular/forms';
import { FeesRoutingModule } from './fees-routing.module';
import { FeesServiceService } from './service/fees-service.service';
import { AddFeeComponent } from './pages/add-fee/add-fee.component';
import { UpdateFeeDetailComponent } from './pages/update-fee-detail/update-fee-detail.component';
import { ViewFeeDetailComponent } from './pages/view-fee-detail/view-fee-detail.component';
import { RouterModule } from '@angular/router';
import { AddFeeStructureComponent } from './pages/add-fee-structure/add-fee-structure.component';
import { ChangeFeeStatusComponent } from './pages/change-fee-status/change-fee-status.component';
import { FeeDetailsComponent } from './pages/fee-details/fee-details.component';
import {  MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [AddFeeComponent, FeeDetailsComponent, UpdateFeeDetailComponent, ViewFeeDetailComponent,AddFeeStructureComponent, ChangeFeeStatusComponent],
  imports: [
    CommonModule,
    FeesRoutingModule,
    FormsModule,
    RouterModule,MatDialogModule
  ],
  providers:[FeesServiceService]
})
export class FeesModule { }
