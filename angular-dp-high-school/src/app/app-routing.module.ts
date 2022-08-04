import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './app-home/pages/login/login.component';
import { MainHomeComponent } from './app-home/pages/main-home/main-home.component';
import { TeacherInformationComponent } from './app-home/pages/teacher-information/teacher-information.component';
import { ErrorCodeDefaultComponent } from './features/errorHandling/error-code-default/error-code-default.component';
import { ErrorCode404Component } from './features/errorHandling/error-code404/error-code404.component';
import { ErrorCode500Component } from './features/errorHandling/error-code500/error-code500.component';

import {AdminLayoutComponent} from './layout/admin-layout/admin-layout.component';
import {AuthLayoutComponent} from './layout/auth-layout/auth-layout.component'
import { HomeComponent } from './layout/home/home.component';
import { ParentLayoutComponent } from './layout/parent-layout/parent-layout.component';
import { TeacherLayoutComponent } from './layout/teacher-layout/teacher-layout.component';


const routes: Routes = [
  // {
  //   path:'',
  //   redirectTo:'parent/home',
  //   pathMatch:'full',
  // },
  // {
  //   path:'',
  //   redirectTo:'teacher',
  //   pathMatch:'full',
  // },
  // {
  //   path:'',
  //   redirectTo:'dashboard',
  //   pathMatch:'full',
  // },
  {
    path:'sms',
    component:HomeComponent,
    children:[
      {
        path:'',
        loadChildren:()=>import("../../src/app/layout/home/home.module")
        .then(m=>m.HomeModule)
      }
    ]
  },
  {path:'',   
  redirectTo:'sms/home',
  pathMatch:'full'},
  // {
  //   path:'login',component:LoginComponent
  // },
  // {
  //   path:'',
  //   redirectTo:'login',
  //   pathMatch:'full'
  // },
  // {
  //     path:'',
  //     redirectTo:'admin/dashboard',
  //     pathMatch:'full',
  // },
  {
    path:'admin',
    component:AdminLayoutComponent,
    children:[
      {
        path:'',
        loadChildren:()=>import("../../src/app/layout/admin-layout/admin-layout.module")
        .then(m=>m.AdminLayoutModule)
      }
    ]
  },
  {
    path:'',
    component:AuthLayoutComponent,
    children:[
      {
        path:'',
        loadChildren:()=>import("../../src/app/layout/auth-layout/auth-layout.module")
        .then(m=>m.AuthLayoutModule)
      }
    ]
  },
  {
    path:'parent',
    component:ParentLayoutComponent,
    children:[
      {
        path:'',
        loadChildren:()=>import("../../src/app/layout/parent-layout/parent-layout.module")
        .then(m=>m.ParentLayoutModule)
      }
    ]
  },
  {
    path:'teacher',
    component:TeacherLayoutComponent,
    children:[
      {
        path:'',
        loadChildren:()=>import("../../src/app/layout/teacher-layout/teacher-layout.module")
        .then(m=>m.TeacherLayoutModule)
      }
    ]
  },
  {
    path:'page-not-found',
    component:ErrorCode404Component
  },
  {
    path:'internal-server-error',
    component:ErrorCode500Component
  },
  {
    path:'error-page',
    component:ErrorCodeDefaultComponent
  },
  {path:'teacher-information',component:TeacherInformationComponent}
  // {
  //   path:'**',
  //   redirectTo:'parent/home',
  //   pathMatch:'full',
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
