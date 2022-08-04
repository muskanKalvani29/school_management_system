import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmissionDetailComponent } from 'src/app/app-home/pages/admission-detail/admission-detail.component';
import { AuthenticatePasswordComponent } from 'src/app/app-home/pages/authenticate-password/authenticate-password.component';
import { ForgotPasswordComponent } from 'src/app/app-home/pages/forgot-password/forgot-password.component';
import { InquiryComponent } from 'src/app/app-home/pages/inquiry/inquiry.component';
import { LoginComponent } from 'src/app/app-home/pages/login/login.component';
import { MainHomeComponent } from 'src/app/app-home/pages/main-home/main-home.component';
import { ParentRegisterComponent } from 'src/app/app-home/pages/parent-register/parent-register.component';
import { PasswordOtpComponent } from 'src/app/app-home/pages/password-otp/password-otp.component';
import { RegisterComponent } from 'src/app/app-home/pages/register/register.component';
import { UpdatePasswordComponent } from 'src/app/app-home/pages/update-password/update-password.component';


export const routes: Routes = [
  {path:'home',component:MainHomeComponent},
  {path:'home/admission-detail',component:AdmissionDetailComponent},
  {path:'home/inquiry',component:InquiryComponent},
  {path:'home/login',component:LoginComponent},
  {path:'home/signUp',component:RegisterComponent},
  {path:'home/signUp/parent/:grNo',component:ParentRegisterComponent},
  {path:'home/login/forgot-password',component:ForgotPasswordComponent},
  {path:'home/login/forgot-password/otp',component:PasswordOtpComponent},
  {path:'home/reset-password/newPassword',component:UpdatePasswordComponent},
  {path:'home/reset-password',component:AuthenticatePasswordComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
