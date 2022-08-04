import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentServiceService } from './pages/student/service/student-service.service';
import { AdminServiceService } from './services/admin-service.service';
import { UserServiceService } from './services/user-service.service';
import { UpdateSchoolDetailComponent } from './pages/update-school-detail/update-school-detail.component';
import { FormsModule } from '@angular/forms';
import { CheckPaginationComponent } from './pages/check-pagination/check-pagination.component';
import { SmsComponent } from './pages/sms/sms.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [CheckPaginationComponent],
  imports: [
    CommonModule,
    FormsModule,MatButtonModule,
    MatSnackBarModule,
  
  ],
  exports:[
    MatButtonModule
  ],
  providers:[AdminServiceService,UserServiceService]
})
export class AdminModule { }