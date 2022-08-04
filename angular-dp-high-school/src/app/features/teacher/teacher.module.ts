import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherDashboardComponent } from './pages/teacher-dashboard/teacher-dashboard.component';
import { FormsModule } from '@angular/forms';
import { AllTimeTablesComponent } from './pages/time-table/pages/all-time-tables/all-time-tables.component';
import { RouterModule } from '@angular/router';
// import { TeacherOwnServiceComponent } from './services/teacher-own-service/teacher-own-service.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { UpdateStandardComponent } from './pages/update-standard/update-standard.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,MatButtonModule,MatSnackBarModule
  ]
})
export class TeacherModule { }
