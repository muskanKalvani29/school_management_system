import {NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentDashboardComponent } from './pages/parent-dashboard/parent-dashboard.component';
import { ProgressReportComponent } from './pages/progress-report/progress-report.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
// import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [ 
    ParentDashboardComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    // ChartsModule
  ]
})
export class ParentModule { }
