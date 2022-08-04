import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RouterModule} from '@angular/router';
import { ParentRoutingModule } from './parent-routing.module';
import { ParentServiceService } from './services/parent-service.service';
import { UserServiceService } from '../../services/user-service.service';
import { AllParentsComponent } from './pages/all-parents/all-parents.component';
import { ViewParentComponent } from './pages/view-parent/view-parent.component';
import { ParentPipe } from './pipes/parent.pipe';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AllParentsComponent,ViewParentComponent, ParentPipe],
  imports: [
    CommonModule,
    ParentRoutingModule,
    RouterModule,
    FormsModule
  ],
  providers:[ParentServiceService,UserServiceService]
})
export class ParentModule { }
