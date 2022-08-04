import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeeDetailsComponent } from './pages/fee-details/fee-details.component';
import { PayFeesComponent } from './pages/pay-fees/pay-fees.component';
import { ViewFeeDetailComponent } from './pages/view-fee-detail/view-fee-detail.component';

const routes: Routes = [
  {path:'fee-details',component:FeeDetailsComponent},
  {path:'fee-details/view-fee-detail/:paymentId',component:ViewFeeDetailComponent},
  {path:'pay-fees',component:PayFeesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeeRoutingModule { }
