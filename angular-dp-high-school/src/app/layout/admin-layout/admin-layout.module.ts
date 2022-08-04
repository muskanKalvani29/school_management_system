import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminLayoutRoutes} from './admin-layout.routing'

import { RouterModule } from '@angular/router';
import { AccountSettingComponent } from 'src/app/features/admin/pages/account-setting/account-setting.component';
import { AdminDashboardComponent } from 'src/app/features/admin/pages/admin-dashboard/admin-dashboard.component';
import { ImageCropperModule } from 'ngx-image-cropper';
// import { AllEventsComponent } from 'src/app/features/admin/pages/event/all-events/all-events.component';
// import { FeeDetailsComponent } from 'src/app/features/admin/pages/fees/fee-details/fee-details.component';
// import { AllHolidaysComponent } from 'src/app/features/admin/pages/holiday/all-holidays/all-holidays.component';
// import { AllInquiresComponent } from 'src/app/features/admin/pages/inquiry/all-inquires/all-inquires.component';
// import { AllParentsComponent } from 'src/app/features/admin/pages/parent/all-parents/all-parents.component';
// import { AllQueriesComponent } from 'src/app/features/admin/pages/query/all-queries/all-queries.component';
// import { SmsComponent } from 'src/app/features/admin/pages/sms/sms.component';
// import { AllStudentsComponent } from 'src/app/features/admin/pages/student/all-students/all-students.component';
// import { AllMeetingsComponent } from 'src/app/features/admin/pages/teacher-meeting/all-meetings/all-meetings.component';
// import { AllTeachersComponent } from 'src/app/features/admin/pages/teacher/all-teachers/all-teachers.component';
// import { AllTimetablesComponent } from 'src/app/features/admin/pages/time-table/all-timetables/all-timetables.component';
// import { AddStudentComponent } from 'src/app/features/admin/pages/student/add-student/add-student.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    // AllStudentsComponent,
    // AllTeachersComponent,
    // AllParentsComponent,
    // AllMeetingsComponent,
    // SmsComponent,
    // AllHolidaysComponent,
    // AllEventsComponent,
    // AllQueriesComponent,
    // AllInquiresComponent,
    // FeeDetailsComponent,
    // AccountSettingComponent,
    // AllTimetablesComponent,
    // AddStudentComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
  ]
})
export class AdminLayoutModule { }
