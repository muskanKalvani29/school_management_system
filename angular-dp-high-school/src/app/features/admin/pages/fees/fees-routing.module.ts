import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFeeComponent } from './pages/add-fee/add-fee.component';
import { ChangeFeeStatusComponent } from './pages/change-fee-status/change-fee-status.component';
import { FeeDetailsComponent } from './pages/fee-details/fee-details.component';
import { UpdateFeeDetailComponent } from './pages/update-fee-detail/update-fee-detail.component';
import { ViewFeeDetailComponent } from './pages/view-fee-detail/view-fee-detail.component';

const routes: Routes = [
  {path: 'upload-fee',        component:AddFeeComponent},
  {path:'fee-details',        component:FeeDetailsComponent},
  {path: 'fee-details/update-fee-detail/:paymentId', component:UpdateFeeDetailComponent},
  {path: 'fee-details/view-fee-detail/:paymentId',   component:ViewFeeDetailComponent},
  {path: 'change-fee-status',component:ChangeFeeStatusComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeesRoutingModule { }
