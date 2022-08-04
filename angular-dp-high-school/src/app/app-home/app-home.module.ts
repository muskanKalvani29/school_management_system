import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdmissionDetailComponent } from './pages/admission-detail/admission-detail.component';
import { InquiryComponent } from './pages/inquiry/inquiry.component';
import { MainHomeComponent } from './pages/main-home/main-home.component';
import { AuthenticatePasswordComponent } from './pages/authenticate-password/authenticate-password.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { PasswordOtpComponent } from './pages/password-otp/password-otp.component';
import { UpdatePasswordComponent } from './pages/update-password/update-password.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
// import { BrowserModule } from '@angular/platform-browser';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ParentRegisterComponent } from './pages/parent-register/parent-register.component';
import { TeacherInformationComponent } from './pages/teacher-information/teacher-information.component';

@NgModule({
  declarations: [AdmissionDetailComponent, MainHomeComponent,InquiryComponent, ParentRegisterComponent, TeacherInformationComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    // BrowserModule,
    // BrowserAnimationsModule,
    MatSnackBarModule
  ],
  exports:[
    MatButtonModule
  ]
})
export class AppHomeModule { }
