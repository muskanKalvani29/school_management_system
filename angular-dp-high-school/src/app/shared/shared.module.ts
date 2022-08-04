import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router'


// import { NavbarComponent } from './navbar/navbar.component';
// import { SidebarComponent } from './sidebar/sidebar.component';
// import { AdminDashboardComponent } from '../features/admin/pages/admin-dashboard/admin-dashboard.component';
// import { AllStudentsComponent } from '../pages/admin-pages/student/all-students/all-students.component';
// import { AddStudentComponent } from '../pages/admin-pages/student/add-student/add-student.component';
// import { StudentPromotionComponent } from '../pages/admin-pages/student/student-promotion/student-promotion.component';
// import { AllTeachersComponent } from '../pages/admin-pages/teacher/all-teachers/all-teachers.component';
// import { AddTeacherComponent } from '../pages/admin-pages/teacher/add-teacher/add-teacher.component';
// import { AllParentsComponent } from '../pages/admin-pages/parent/all-parents/all-parents.component';
// import { ViewStudentComponent } from '../pages/admin-pages/student/view-student/view-student.component';
// import { ViewTeacherComponent } from '../pages/admin-pages/teacher/view-teacher/view-teacher.component';
// import { ViewParentComponent } from '../pages/admin-pages/parent/view-parent/view-parent.component';
// import { AddMeetingComponent } from '../pages/admin-pages/teacher-meeting/add-meeting/add-meeting.component';
// import { AllMeetingsComponent } from '../pages/admin-pages/teacher-meeting/all-meetings/all-meetings.component';
// import { AddHolidayComponent } from '../pages/admin-pages/holiday/add-holiday/add-holiday.component';
// import { AllHolidaysComponent } from '../pages/admin-pages/holiday/all-holidays/all-holidays.component';
// import { AddEventComponent } from '../pages/admin-pages/event/add-event/add-event.component';
// import { AllEventsComponent } from '../pages/admin-pages/event/all-events/all-events.component';
// import { QueryResponseComponent } from '../pages/admin-pages/query/query-response/query-response.component';
// import { AllQueriesComponent } from '../pages/admin-pages/query/all-queries/all-queries.component';
// import { InquiryResponseComponent } from '../pages/admin-pages/inquiry/inquiry-response/inquiry-response.component';
// import { AllInquiresComponent } from '../pages/admin-pages/inquiry/all-inquires/all-inquires.component';
// import { FeeDetailsComponent } from '../pages/admin-pages/fees/fee-details/fee-details.component';
// import { AccountSettingComponent } from '../features/admin/pages/account-setting/account-setting.component';
// import { AddFeeComponent } from '../pages/admin-pages/fees/add-fee/add-fee.component';
// import { AddTimetableComponent } from '../pages/admin-pages/time-table/add-timetable/add-timetable.component';
// import { AllTimetablesComponent } from '../pages/admin-pages/time-table/all-timetables/all-timetables.component';
// import { FooterComponent } from './footer/footer.component';




@NgModule({
  declarations: [/*NavbarComponent, SidebarComponent,/* FooterComponent, AdminDashboardComponent,AllStudentsComponent,AddStudentComponent,
  StudentPromotionComponent,AllTeachersComponent,AddTeacherComponent,AllParentsComponent,
  ViewStudentComponent,ViewTeacherComponent,ViewParentComponent,AddMeetingComponent,AllMeetingsComponent,
  AddHolidayComponent,AllHolidaysComponent,AddEventComponent,AllEventsComponent,QueryResponseComponent,AllQueriesComponent
  ,InquiryResponseComponent,AllInquiresComponent,FeeDetailsComponent,AccountSettingComponent,AddFeeComponent,AddTimetableComponent,AllTimetablesComponent*/],
  
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    // NavbarComponent,
    // SidebarComponent,
    // FooterComponent
  ]
})
export class SharedModule { }
