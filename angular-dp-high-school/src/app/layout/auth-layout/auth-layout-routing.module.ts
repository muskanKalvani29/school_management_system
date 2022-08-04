import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { LogInComponent } from 'src/app/pages/auth-pages/log-in/log-in.component';
// import { RegisterComponent } from 'src/app/pages/auth-pages/register/register.component';

// const routes: Routes = [
//   {
//     path: 'login' , 
//     // component: LogInComponent
//   },
//   {
//     path: 'register',
//     // component: RegisterComponent
//   }
// ];

@NgModule({
  // imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthLayoutRoutingModule { }
