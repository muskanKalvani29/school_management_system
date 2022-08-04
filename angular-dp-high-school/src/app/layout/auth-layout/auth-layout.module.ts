import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthLayoutRoutingModule } from './auth-layout-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AuthLayoutRoutingModule,
    SharedModule
  ],
  
})
export class AuthLayoutModule { }
