import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import {ComponentsModule} from './core/components/components.module';
import {RouterModule} from '@angular/router';
// import { LogInComponent } from './pages/auth-pages/log-in/log-in.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { RegisterComponent } from './pages/auth-pages/register/register.component';
import {AdminLayoutComponent} from './layout/admin-layout/admin-layout.component';
import {AuthLayoutComponent} from './layout/auth-layout/auth-layout.component';
// import { MainHomeComponent } from './app-home/pages/main-home/main-home.component';
import { ImageCropperModule } from 'ngx-image-cropper';
// import { LoginComponent } from './app-home/pages/login/login.component';
// import { RegisterComponent } from './app-home/pages/register/register.component';
// import { InquiryComponent } from './app-home/pages/inquiry/inquiry.component';
// import { AdmissionDetailComponent } from './app-home/pages/admission-detail/admission-detail.component';
import { ParentLayoutComponent } from './layout/parent-layout/parent-layout.component';
import { TeacherLayoutComponent } from './layout/teacher-layout/teacher-layout.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ViewTimeTableComponent } from './features/admin/pages/time-table/pages/view-time-table/view-time-table.component';
import { ViewResultComponent } from './features/parent/pages/student/pages/view-result/view-result.component';
import { ViewDocumentComponent } from './features/parent/pages/student/pages/view-document/view-document.component';
import { ViewTimetableComponent } from './features/parent/pages/student/pages/view-timetable/view-timetable.component';
import { ViewUploadedDocumentComponent } from './features/teacher/pages/documents/pages/view-uploaded-document/view-uploaded-document.component';
import { ViewTeacherTimeTableComponent } from './features/teacher/pages/time-table/pages/view-teacher-time-table/view-teacher-time-table.component';
import { AddActivitiesAchievementsImageComponent } from './features/admin/pages/upload-activities-achievements/pages/add-activities-achievements-image/add-activities-achievements-image.component';
import { AddBestStudentComponent } from './features/admin/pages/upload-best-student-detail/pages/add-best-student/add-best-student.component';
import { CheckPaginationComponent } from './features/admin/pages/check-pagination/check-pagination.component';
// import {ViewDocumentComponent1} from './features/teacher/pages/documents/pages/view-document1/view-document.component';
import {HTTP_INTERCEPTORS } from '@angular/common/http';
import { httpinterceptor } from './httpinterceptor';
import { HomeComponent } from './layout/home/home.component';
import { SmsComponent } from './features/admin/pages/sms/sms.component';
import { UpdateSchoolDetailComponent } from './features/admin/pages/update-school-detail/update-school-detail.component';
import { AdminDashboardComponent } from './features/admin/pages/admin-dashboard/admin-dashboard.component';
import { AccountSettingComponent } from './features/admin/pages/account-setting/account-setting.component';
import { ForgotPasswordComponent } from './app-home/pages/forgot-password/forgot-password.component';
import { PasswordOtpComponent } from './app-home/pages/password-otp/password-otp.component';
import { AuthenticatePasswordComponent } from './app-home/pages/authenticate-password/authenticate-password.component';
import { UpdatePasswordComponent } from './app-home/pages/update-password/update-password.component';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppHomeModule } from './app-home/app-home.module';
import { LoginComponent } from './app-home/pages/login/login.component';
import { RegisterComponent } from './app-home/pages/register/register.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
//fierbase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { UpdateActivitiesAchievementsDetailComponent } from './features/admin/pages/upload-activities-achievements/pages/update-activities-achievements-detail/update-activities-achievements-detail.component';
import { UpdateBestStudentComponent } from './features/admin/pages/upload-best-student-detail/pages/update-best-student/update-best-student.component';

import { DialogBoxComponent } from './features/DialogBox/dialog-box/dialog-box.component';
import { SafePipePipe } from './features/Pipes/safe-pipe.pipe';
import { ParentDashboardComponent } from './features/parent/pages/parent-dashboard/parent-dashboard.component';
import { AllResultsComponent } from './features/parent/pages/student/pages/all-results/all-results.component';
import { AllDocumentsComponent } from './features/parent/pages/student/pages/all-documents/all-documents.component';
import { AllTimetablesComponent } from './features/parent/pages/student/pages/all-timetables/all-timetables.component';
import { TeacherDashboardComponent } from './features/teacher/pages/teacher-dashboard/teacher-dashboard.component';
import { ErrorCode404Component } from './features/errorHandling/error-code404/error-code404.component';
import { ErrorCode500Component } from './features/errorHandling/error-code500/error-code500.component';
import { ErrorCodeDefaultComponent } from './features/errorHandling/error-code-default/error-code-default.component';
import { ProgressReportComponent } from './features/parent/pages/progress-report/progress-report.component';

import { TeacherInformationComponent } from './app-home/pages/teacher-information/teacher-information.component';
import { UpdateStandardComponent } from './features/teacher/pages/update-standard/update-standard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    HomeComponent,
    ParentLayoutComponent,
    // MainHomeComponent,
    // LoginComponent,
    // RegisterComponent,
    // InquiryComponent,
    // AdmissionDetailComponent,
    // FeeDetailsComponent
    TeacherLayoutComponent,
    ViewTimeTableComponent,
    ViewResultComponent,
    ViewDocumentComponent,
    ViewTimetableComponent,
    ViewUploadedDocumentComponent,
    ViewTeacherTimeTableComponent,
    AddActivitiesAchievementsImageComponent,
    AddBestStudentComponent,
    CheckPaginationComponent,
    UpdateSchoolDetailComponent,
    AccountSettingComponent,
    SmsComponent,
    ForgotPasswordComponent,
    PasswordOtpComponent,
    AuthenticatePasswordComponent,
    UpdatePasswordComponent,
    //image
    UpdateActivitiesAchievementsDetailComponent,
    UpdateBestStudentComponent,
    SafePipePipe,
    DialogBoxComponent,
    ParentDashboardComponent,
    AllResultsComponent,
    AllDocumentsComponent,
    AllTimetablesComponent,
    TeacherDashboardComponent,
    ErrorCode404Component,
    ErrorCode500Component,
    ErrorCodeDefaultComponent,
    ProgressReportComponent,
    UpdateStandardComponent
    //snackbar
    //add inquiry component of home
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ComponentsModule,
    NgbModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ImageCropperModule,
    PdfViewerModule,
    MatButtonModule,
    BrowserAnimationsModule,
    AppHomeModule,
    //firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: httpinterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
