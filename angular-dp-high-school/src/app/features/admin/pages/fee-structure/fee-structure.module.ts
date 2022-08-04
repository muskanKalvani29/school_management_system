import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeeStructureRoutingModule } from './fee-structure-routing.module';
import { AllFeeStructureComponent } from './pages/all-fee-structure/all-fee-structure.component';
import { UpdateFeeStructureComponent } from './pages/update-fee-structure/update-fee-structure.component';
import { FormsModule } from '@angular/forms';
import { FeeStructurePipe } from './pipes/fee-structure.pipe';
// import {MatButtonModule} from '@angular/material/button';
// import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [AllFeeStructureComponent, UpdateFeeStructureComponent, FeeStructurePipe],
  imports: [
    CommonModule,
    FeeStructureRoutingModule,
    FormsModule,
    // MatButtonModule,
    // MatSnackBarModule
  ],
  exports:[
    // MatButtonModule
  ]
})
export class FeeStructureModule { }
