import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { ViewProfileComponent } from './pages/view-profile/view-profile.component';

const routes: Routes = [
  {path:'edit-profile',component:EditProfileComponent},
  {path:'view-profile',component:ViewProfileComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
