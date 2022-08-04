
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllFeeStructureComponent } from './pages/all-fee-structure/all-fee-structure.component';
import { UpdateFeeStructureComponent } from './pages/update-fee-structure/update-fee-structure.component';

const routes: Routes = [
  {path:'all-fee-structure',component:AllFeeStructureComponent},
  {path:'all-fee-structure/update-fee-structure/:feeStuctureId',component:UpdateFeeStructureComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeeStructureRoutingModule { }
