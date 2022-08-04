import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {routes} from './home-routing.module'
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // HomeRoutingModule,
    RouterModule.forChild(routes),
  ]
})
export class HomeModule { }
