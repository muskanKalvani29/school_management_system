import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ViewProfileComponent } from './pages/view-profile/view-profile.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ViewProfileComponent, EditProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule
  ]
})
export class ProfileModule { }
